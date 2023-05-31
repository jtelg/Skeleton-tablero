import { useState } from 'react';
import utilsOrderStatus from '../../../../../../../../utils/order.utils';

const Comment = (props) => {
  const [data, setData] = useState(``);

  const onChange = (e) => {
    e.preventDefault();
    setData(e.target.value);
  };
  const confirmar = (e) => {
    e.preventDefault();
    try {
      utilsOrderStatus.orderStatusChange(
        props.datosVenta,
        data,
        'envreti_time',
        4
      );
      props.close();
    } catch (error) {
      console.error(`UPDATE_SEGUIMIENTO ${error}`);
    }
  };
  return (
    <>
      <form action="" className="w-full">
        <div className="grid grid-cols-1 mr-3 w-full">
          <textarea
            className="px-3 py-1 h-36 rounded-lg border-2 border-primary-300 mt-1 focus:border-primary-600"
            onChange={onChange}
            value={data}
            placeholder="Enviale un mensaje extra de notificacion al cliente"
            type="datetime-local"
            id="hsenvio"
            name="hsenvio"
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

export default Comment;
