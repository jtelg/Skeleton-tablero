import { useState } from 'react';
import ServUsos from '../../../../../../../../utils/usos.utils';
import APIConsultas from '../../../../../../../../services/consultas';
import utilsOrderStatus from '../../../../../../../../utils/order.utils';

const Anular = (props) => {
  const [data, setData] = useState(``);

  const onChange = (e) => {
    e.preventDefault();
    setData(e.target.value);
  };
  const confirmar = (e) => {
    e.preventDefault();
    let dateNowUse = ServUsos.newDateMysql().replace(' ', 'T');
    dateNowUse = dateNowUse.substring(0, dateNowUse.length - 3);
    try {
      utilsOrderStatus.orderStatusChange(
        props.datosVenta,
        `${new Date().toISOString().split('T')[0]} ${dateNowUse}`,
        'confirmado_time',
        5
      );
      const estadoUpd = {
        idventa: props.datosVenta.idventa,
        campo: 'estado',
        valor: 'Anulado'
      };
      const fechaUpd = {
        idventa: props.datosVenta.idventa,
        campo: 'fec_anulado',
        valor: dateNowUse
      };
      const porqueUpd = {
        idventa: props.datosVenta.idventa,
        campo: 'anulado_porque',
        valor: data
      };
      APIConsultas.ventas.UPDATE_XCAMPO(estadoUpd, true);
      APIConsultas.ventas.UPDATE_XCAMPO(fechaUpd, true);
      APIConsultas.ventas.UPDATE_XCAMPO(porqueUpd, true);
      props.close();
    } catch (error) {
      console.error(`UPDATE_SEGUIMIENTO ${error}`);
    }
  };
  return (
    <>
      <form action="" className="w-full">
        <div className="grid grid-cols-1 mr-3 w-full">
          <label
            className="uppercase text-sm text-black font-bold text-light md:text-sm "
            htmlFor="anular"
          >
            Motivo por el cual anula el pedido.
          </label>
          <textarea
            className="px-3 h-36 rounded-lg border-2 border-primary-300 mt-1 focus:border-primary-600"
            onChange={onChange}
            value={data}
            placeholder="   "
            type="text"
            id="anular"
            name="anular"
            required={true}
          />
        </div>
        <button
          type="submit"
          className={`enviar mt-4 bg-green-500 w-full justify-center`}
          onClick={(ev) => confirmar(ev)}
        >
          Confirmar
        </button>
      </form>
    </>
  );
};

export default Anular;
