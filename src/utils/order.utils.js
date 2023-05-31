import APIConsultas from '../services/consultas';
import ServUsos from './usos.utils';
import senderFRONT from './senderwpp.utils';

const ctrlNumber = (number) => {
  // si no tiene caracteristicas se las agrega
  const corte = number.split('549').length === 1;
  if (corte) number = `549${number}`;
  return number;
};
const utilsOrderStatus = {
  orderStatusChange: (venta, data, estado, idestado) => {
    let fecha = '';
    let msg = '';
    const objSeguimiento = {
      idventa: venta.idventa,
      name: estado,
      value: ServUsos.newDateMysql(),
      idestado: idestado
    };
    APIConsultas.ventas
      .UPDATE_SEGUIMIENTO(objSeguimiento, true)
      .then((data) => {});
    if (idestado === 4) {
      // msg = senderFRONT.msgPedidoConfirm(data);
      fecha = `${ServUsos.newDateMysql()}`;
    } else {
      msg = senderFRONT.msgOrderPendingConfirm(
        data.split(' ')[1],
        venta.entrega
      );
      fecha = data;
    }
    const ventaUpd = {
      idventa: venta.idventa,
      campo: 'timestamp',
      valor: fecha
    };
    APIConsultas.ventas.UPDATE_XCAMPO(ventaUpd, true);
    const tel = ctrlNumber(venta.tel_muestra);
    APIConsultas.usuario.SendWppBot(tel, msg, true);
  }
};

export default utilsOrderStatus;
