import { useEffect, useState } from 'react';

const ModalList = (props) => {
  // Lista modal
  // *** variables ***
  // nomlist: Nombre de muestra en el head de la lista
  // data: array de datos
  // keyuse: key del objeto del array que se lee en el listado del html
  // open: bandera para abrir el modal
  // multiple: bandera de multi seleccion de items, en el caso de seleccionar
  // arr_select: props con un array de objetos ya seleccionados
  // mas de un item, devuelve un array de objetos.

  // *** funciones ***
  // setdata: funcion que retorna los datos para setear
  // close: funcion que retorna el cierre del modal
  const [arrSelect, setArrSelect] = useState(
    props.arr_select?.length > 0 ? props.arr_select : []
  );

  useEffect(() => {
    setArrSelect(props.arr_select?.length > 0 ? props.arr_select : []);
  }, [props.arr_select]);

  const setData = (ev, item) => {
    ev.preventDefault();
    if (!props.multiple) {
      props.setdata(item);
      return props.close(ev);
    }
    // multiple select
    if (arrSelect.includes(item)) {
      let arr = [...arrSelect];
      arr = arr.filter((fil) => fil[props.keyuse] !== item[props.keyuse]);
      return setArrSelect(arr);
    }
    setArrSelect([...arrSelect, item]);
  };

  const closemodal = (ev) => {
    ev.preventDefault();
    if (!props.multiple) return props.close(ev);
    props.setdata(arrSelect);
    return props.close(ev);
  };
  return (
    <>
      <section
        className={`${
          props.open ? 'translate-y-0 ease-out' : 'translate-y-full ease-in'
        }  w-full fixed left-0 min-h-screen top-0 overflow-hidden transition-all z-[100] flex  items-center justify-center`}
      >
        <div
          className="h-screen w-full absolute top-0 left-0 bg-[#0000008f]"
          onClick={(ev) => closemodal(ev)}
          aria-hidden
        ></div>
        <article className="w-full h-full m-8 z-[101] max-w-xs rounded">
          <button
            title="Cerrar modal"
            className="relative mb-4 shadow-sm bg-red-600 px-3 py-1 text-white rounded"
            onClick={(ev) => closemodal(ev)}
          >
            X
          </button>
          <div className="bg-white w-full rounded">
            <div className="p-2 border-b-2 border-secondary-500 flex justify-between items-center">
              <h1 className="text-secondary-500 uppercase text-xl">
                Listado de {props.nomlist}
              </h1>
              <button
                className="rounded text-secondary-500 shadow py-1 px-2 flex justify-center items-center"
                title={`Editar ${props.nomlist}`}
              >
                <span className="material-icons-outlined">draw</span>
              </button>
            </div>
            <ul className="flex flex-col">
              {props.data.map((item, index) => (
                <li
                  key={index}
                  className={`cursor-pointer flex items-center border-b border-gray-100  px-2 py-3 justify-between hover:bg-gray-100 transition-all
                  ${
                    arrSelect.find((e) => e.idmedida === item.idmedida) &&
                    'bg-secondary-300 hover:bg-secondary-400'
                  }`}
                  onClick={(ev) => setData(ev, item, index)}
                  aria-hidden
                >
                  <span>{item[props.keyuse]}</span>
                  <div className="flex">
                    <button title="Seleccionar item">
                      <span
                        className={`material-icons-outlined text-green-900`}
                      >
                        touch_app
                      </span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>
    </>
  );
};
export default ModalList;
