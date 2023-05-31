import React, { useEffect, useState } from 'react';

const ListInfo = ({ datosVenta, close }) => {
  const [arrInfo, setArrInfo] = useState(datosVenta);
  useEffect(() => {
    setArrInfo(datosVenta);
  }, [datosVenta]);

  return (
    <>
      {arrInfo ? (
        <div className="lg:w-[40%] min-w-[200px] lg:flex lg:flex-col gap-2 lg:border-r-4 border-t-4 lg:border-t-0 lg:pr-3 lg:pt-0 pt-3 grid grid-cols-2">
          <p className="flex flex-col text-[12px]  text-primary-500">
            Retira:
            <span className="font-bold text-[16px] text-black ">
              {arrInfo.retira_nombre}
            </span>
          </p>
          <p className="flex flex-col text-[12px] text-primary-500">
            Direccion:
            <span className="font-bold text-[16px]  text-black">
              {arrInfo.destino_ciudad}
            </span>
          </p>
          <p className="flex flex-col text-[12px] text-primary-500">
            Telefono:
            <span className="font-bold text-[16px]  text-black">
              {arrInfo.tel_form}
            </span>
          </p>
          <p className="flex flex-col text-[12px] text-primary-500 ">
            Harario pedido:
            <span className="font-bold text-[16px] text-black">
              {arrInfo.fecha_tablero}
            </span>
          </p>
          <p className="flex flex-col text-[12px] text-primary-500">
            Entrega:
            <span className="font-bold text-[16px] text-black">
              {arrInfo.entrega}
            </span>
          </p>
          <p className="flex flex-col text-[12px] text-primary-500">
            Estado:
            <span className="font-bold text-[16px] text-black">
              {arrInfo.estado}
            </span>
          </p>
          <p className="flex flex-col text-[12px] text-primary-500">
            Tipo de pago:
            <span className="font-bold text-[16px] text-black">
              {arrInfo.tipo_pago}
            </span>
          </p>
          <p className="flex flex-col text-[12px] text-primary-500">
            Comentario:
            <span className="font-bold text-[16px] text-black max-w-full break-all">
              {arrInfo.comentario}
            </span>
          </p>
        </div>
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

export default ListInfo;
