import ServUsos from './usos.utils';
const functions = {
  EnviaPedido_msg: (idventa, entrega, arr_cartprods) => {
    const pedido = `_¡Hola! Te hago el siguiente pedido:_ %0A
           %0A*Pedido:* PTX-A-${idventa}
           %0A*Nombre:* ${entrega.nombre}
           %0A*Telefono:* ${entrega.telefono}
           %0A
           ${EnviaPedido_entrega(entrega)}
           %0A
           %0A*Pedido:*
           %0A${arr_cartprods
             .map(
               (d) =>
                 `${d.cantidadForm} x ${d.modelo}: $ ${(
                   d.cantidadForm * d.precioventa
                 ).toLocaleString('de')} %0A`
             )
             .flat()
             .join('')}
           %0A*TOTAL: $${arr_cartprods
             .reduce((a, b) => a + b.cantidadForm * b.precioventa, 0)
             .toLocaleString('de')}*
           %0A
           %0A*Sera abonado con:* ${entrega.tipopago}
           %0A*Comentario extra:* ${entrega.comentario}
           %0A
           %0A_Espero tu respuesta para confirmar mi pedido_
           `;
    return pedido;
  }
};
const EnviaPedido_entrega = (entrega) => {
  if (entrega.tipoentrega === 'Envio a domicilio') {
    return `%0A*Direccion:* ${entrega.direccion}`;
  }
  return `%0A*${entrega.tipoentrega}*`;
};
const senderFRONT = {
  enviaPedido: (number, entrega, arr_cartprods, idventa) => {
    const pedido = functions.EnviaPedido_msg(idventa, entrega, arr_cartprods);
    ServUsos.SendWhatsapp(number, pedido);
  },
  msgOrderPendingConfirm: (hora, entrega) => {
    const msg = `¡¡Tu pedido está confirmado!! 🤩 Va a estar listo a las ${hora}hs. ${
      entrega === 'Envio a domicilio'
        ? 'A partir de ese momento depende de la demora del cadete 🛵😊'
        : ''
    }`;
    return msg;
  },
  msgPedidoConfirm: (comentario = '') => {
    return `¡¡Tu pedido está en camino!! 🛵
    ${comentario}`;
  }
};

export default senderFRONT;
