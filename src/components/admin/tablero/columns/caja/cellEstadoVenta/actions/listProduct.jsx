import { useEffect, useState, createRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import APIConsultas from '../../../../../../../services/consultas';
import TicketOrder from '../../../../../ventas/ticketOrder';
const ListProduct = ({ datosVenta, props }) => {
  const componentRef = createRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });
  const [arrProductos, setArrProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const apiFetch = () => {
      APIConsultas.ventas.GET_PRODS_XID(datosVenta.idventa).then((res) => {
        setArrProductos(res);
        setLoading(false);
      });
    };
    if (datosVenta) return apiFetch();
  }, [datosVenta]);

  return (
    <>
      {!loading ? (
        <>
          <div>
            <button
              onClick={handlePrint}
              className="absolute right-[11%] top-[5.2%] text-sm uppercase bg-secondary text-white px-3 py-1 rounded"
            >
              Imprimir
            </button>
            {/* component to be printed */}
            <div className="hidden">
              <TicketOrder
                datosVenta={datosVenta}
                appName={props.appName}
                addres={props.addres}
                arrProductos={arrProductos}
                ref={componentRef}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between lg:min-w-[350px]">
            <ul className="flex flex-col gap-2 rounded mb-4 items-center max-h-[300px] overflow-auto">
              {arrProductos?.map((prod, index) => (
                <li
                  key={index}
                  className="flex gap-4 items-center pr-2 bg-white py-1 px-1 lg:w-[20rem] w-[22rem] border-b-[1px]"
                >
                  <div className="w-full">
                    <div className="flex justify-between items-center">
                      <span className="uppercase font-bold text-sm">
                        <b>{prod.modelo}</b>
                        <p>({prod.presentacion})</p>
                      </span>
                      <span className=" justify-end flex font-bold text-[14px]">
                        <b>{prod.cantidad} x</b>
                        <b className="pl-1">
                          $ {(+prod.precioventa).toLocaleString('de')}
                        </b>
                      </span>
                    </div>
                    <div className="flex w-full justify-between items-center">
                      {prod.comentario && (
                        <div className="overflow-y-auto leading-3 ">
                          {/* <p className="text-[12px]">Comentarios:</p> */}
                          <span className="text-xs text-red-400 overflow-hidden sm:max-w-[15rem] relative">
                            {prod.comentario}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="w-full justify-between flex px-2">
              Total pedido:
              <b className="text-green-500">
                ${' '}
                {arrProductos
                  .reduce((a, b) => a + b.precioventa * b.cantidad, 0)
                  .toLocaleString('de')}
              </b>
            </p>
          </div>
        </>
      ) : (
        <div>
          <div className="text-center">
            <i className="bx bx-refresh bx-spin text-6xl"></i>
            <p>Cargando datos</p>
          </div>
        </div>
      )}
    </>
  );
};
export default ListProduct;
