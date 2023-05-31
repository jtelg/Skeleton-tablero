import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../../pages/session';
import { ARR_NAV, SESSION_SET } from '../../redux/actions';
import APIConsultas from '../../services/consultas';
import localStorage from '../../utils/localstorage.utils';

const arr_nav = [
  { id: 1, nombre: 'Inicio', href: '/' },
  { id: 2, nombre: 'Catálogo', href: '/shop' }
];

const Session = (props) => {
  const dispatch = useDispatch();
  const sessionState = useSelector((s) => s.session);
  const sessionLocal = localStorage.getFromStorage('session');
  useEffect(() => {
    const APIdata = async () => {
      if (sessionLocal && !sessionState) dispatch(SESSION_SET(sessionLocal));
      APIConsultas.usuario.GlobalInfoUser(dispatch, true);
      if (sessionState?.role === 'Admin') {
        await APIConsultas.usuario.GlobalInfoAdmin(dispatch, true);
        if (!arr_nav.find((e) => e.nombre === 'Tablero')) {
          arr_nav.push({ id: 3, nombre: 'Tablero', href: '/admin' });
        }
      }
      const arr = { data: arr_nav, index: '' };
      dispatch(ARR_NAV(arr));
    };
    APIdata();
  }, [dispatch, sessionLocal, sessionState]);

  return (
    <>
      {props.comp.auth?.role === 'Admin' && sessionState?.role !== 'Admin' ? (
        <Login></Login>
      ) : (
        <div>{props.children}</div>
      )}
    </>
  );
};

export default Session;
