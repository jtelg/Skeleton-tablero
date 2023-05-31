import React from 'react';

class TicketOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: this.props.arrProductos,
      order: this.props.datosVenta
    };
  }

  static getDerivedStateFromProps(state) {
    return { productos: state.arrProductos, order: state.datosVenta };
  }

  totalOrder() {
    return this.state.productos.reduce(
      (a, b) => a + b.precioventa * b.cantidad,
      0
    );
  }

  render() {
    return (
      <div className="flex max-w-[250px]">
        <section className="flex flex-col justify-center gap-4 mt-2 w-full">
          <div className="w-full text-center">
            <p className="text-lg">Ticket de compra</p>
            <p className="text-xs">
              {new Date().toLocaleDateString()} :{' '}
              {new Date().toLocaleTimeString()}
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <ul>
              <li className="flex items-center gap-4">
                <span className="text-xs whitespace-pre min-w-[62px] font-bold">
                  Cliente:
                </span>
                <p className="font-bold whitespace-pre">
                  {this.state.order.retira_nombre}
                </p>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-xs whitespace-pre min-w-[62px] font-bold">
                  Ingreso:
                </span>
                <p className="font-bold whitespace-pre">
                  {this.state.order.fecha_alta}
                </p>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-xs whitespace-pre min-w-[62px] font-bold">
                  Retiro:
                </span>
                <p className="font-bold whitespace-pre">
                  {this.state.order.fecha_tablero}
                </p>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-xs whitespace-pre min-w-[62px] font-bold">
                  Direccion:
                </span>
                <p className="font-bold">{this.state.order.destino_ciudad}</p>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-xs whitespace-pre min-w-[62px] font-bold">
                  Telefono:
                </span>
                <span className="font-bold">
                  {this.state.order.tel_wpp !== ''
                    ? this.state.order.tel_wpp
                    : this.state.order.tel_form}
                </span>
              </li>
            </ul>
            <div className="flex flex-col gap-3">
              <ul>
                {this.state.productos.map((prod, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <p className="font-bold w-1/4">{prod.cantidad}x</p>
                    <p className="font-bold w-full">
                      {prod.modelo} ({prod.presentacion})
                    </p>
                    <p className="text-sm font-bold w-1/4">
                      ${+prod.precioventa.toLocaleString('de')}
                    </p>
                  </li>
                ))}
              </ul>
              <div>
                <p className="flex justify-between items-center">
                  <span className="text-xs whitespace-pre min-w-[62px] font-bold">
                    TOTAL:
                  </span>
                  <span className="font-bold">$ {this.totalOrder()}</span>
                </p>
              </div>
              <p className="font-bold text-center max-w-full break-all">
                {this.state.order.comentario}
              </p>
            </div>
            <p className="text-center w-full text-sm">
              ¡GRACIAS POR SU COMPRA!
              <br />
              {this.props.addres}
              <br />
              {this.props.appName}
              <br />
            </p>
          </div>
        </section>
      </div>
    );
  }
}
export default TicketOrder;
