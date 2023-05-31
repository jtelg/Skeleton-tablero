import { useEffect, useState } from 'react';
import ModalView from '../../../../../../utils/modalView';
import OrderPending from './ventaStatus/pending';
import Comment from './ventaStatus/confirm';
import Anular from './ventaStatus/cancel';
import ListInfo from './listInfo';
import ListProduct from './listProduct';

const dataOrder = {
  estadoOrder: {
    'Pendiente de confirmacion': 'pending',
    'Preparando pedido': 'preparing',
    'Listo para enviar/retirar': '',
    'Pedido enviado/retirado': ''
  },
  ViewProds: 'listProds',
  anular: 'anulado'
};

const OrderModals = ({ data, props }) => {
  const [viewOrderDetails, setViewOrderDetails] = useState({
    pending: false,
    preparing: false,
    listProds: false,
    anulado: false
  });
  const [pedidoSelect, setPedidoSelect] = useState(null);
  const [viewSelect, setViewSelect] = useState('');
  useEffect(() => {
    if (data) openOrder(data);
  }, [data]);

  const openOrder = (dataRow) => {
    const { row, field } = dataRow;
    let viewSel = '';
    if (field === 'estadoOrder') {
      viewSel = dataOrder[field][row.vista_admin];
    } else {
      viewSel = dataOrder[field];
    }
    setViewOrderDetails({
      ...viewOrderDetails,
      [viewSel]: true
    });
    setViewSelect(viewSel);
    setPedidoSelect(dataRow.row);
  };
  const closeOrder = () => {
    setViewOrderDetails({
      ...viewOrderDetails,
      [viewSelect]: false
    });
    setViewSelect('');
    setPedidoSelect(null);
  };
  return (
    <>
      <ModalView
        open={viewOrderDetails.pending}
        titulo="Confirmar pedido"
        close={() => closeOrder()}
      >
        <OrderPending
          datosVenta={pedidoSelect}
          appName={props.appName}
          addres={props.addres}
          close={() => closeOrder()}
        />
      </ModalView>
      <ModalView
        open={viewOrderDetails.preparing}
        titulo="¡Pedido Listo!"
        close={() => closeOrder()}
      >
        <Comment datosVenta={pedidoSelect} close={() => closeOrder()} />
      </ModalView>
      <ModalView
        open={viewOrderDetails.listProds}
        titulo="Productos del pedido"
        close={() => closeOrder()}
      >
        <div className="flex gap-4 lg:flex-row flex-col-reverse">
          <ListInfo datosVenta={pedidoSelect} close={() => closeOrder()} />
          <ListProduct
            datosVenta={pedidoSelect}
            close={() => closeOrder()}
            props={props}
          />
        </div>
      </ModalView>
      <ModalView
        open={viewOrderDetails.anulado}
        titulo="Anular pedido"
        close={() => closeOrder()}
      >
        <Anular datosVenta={pedidoSelect} close={() => closeOrder()} />
      </ModalView>
    </>
  );
};
export default OrderModals;
