import { createRef, useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import APIConsultas from '../../../../../../../../services/consultas';
import utilsOrderStatus from '../../../../../../../../utils/order.utils';
import ServUsos from '../../../../../../../../utils/usos.utils';
import TicketOrder from '../../../../../../ventas/ticketOrder';

const OrderPending = (props) => {
  const [dateNow, setDateNow] = useState(``);
  const componentRef = createRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });
  const [arrProductos, setArrProductos] = useState([]);
  const [datosVenta, setDatosVenta] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const apiFetch = () => {
      setDatosVenta(props.datosVenta);
      APIConsultas.ventas
        .GET_PRODS_XID(props.datosVenta.idventa)
        .then((res) => {
          setArrProductos(res);
          setLoading(false);
        });
    };
    if (props.datosVenta) return apiFetch();
  }, [props.datosVenta]);

  useEffect(() => {
    let dateNowUse = ServUsos.newDateMysql().split(' ')[1];
    dateNowUse = dateNowUse.substring(0, dateNowUse.length - 3);
    // const dateNowUse = new Date();
    setDateNow(dateNowUse);
  }, []);
  const onChange = (e) => {
    e.preventDefault();
    setDateNow(e.target.value);
    setDatosVenta({ ...datosVenta, fecha_tablero: `${e.target.value}:00` });
  };
  const confirmar = (e) => {
    e.preventDefault();
    try {
      utilsOrderStatus.orderStatusChange(
        props.datosVenta,
        `${new Date().toISOString().split('T')[0]} ${dateNow}`,
        'confirmado_time',
        2
      );
      setDatosVenta({ ...datosVenta, fecha_tablero: `${dateNow}:00` });
      handlePrint();
      props.close();
      window.location.reload(false);
    } catch (error) {
      console.error(`UPDATE_SEGUIMIENTO ${error}`);
    }
  };
  return (
    <>
      <form action="" className="w-full max-w-sm">
        <div className="grid grid-cols-1 mr-3 w-full">
          <label
            className="text-sm text-gray-500 font-bold text-light"
            htmlFor="comentario"
          >
            Horario en el que estará listo el pedido
          </label>
          <input
            className="px-3 h-10 rounded-lg border-2 border-primary-300 mt-1 focus:border-primary-600 text-right"
            onChange={onChange}
            value={dateNow}
            type="time"
            id="hsenvio"
            name="hsenvio"
          />
        </div>
        <button
          type="submit"
          className={`enviar mt-4 bg-green-500 w-full justify-center`}
          onClick={(ev) => confirmar(ev)}
        >
          {loading ? (
            <i className="bx bx-refresh bx-spin text-6xl"></i>
          ) : (
            <p>Confirmar</p>
          )}
        </button>
      </form>
      <div className="hidden">
        <TicketOrder
          datosVenta={datosVenta}
          appName={props.appName}
          addres={props.addres}
          arrProductos={arrProductos}
          ref={componentRef}
        />
      </div>
    </>
  );
};

export default OrderPending;
