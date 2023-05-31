import { Component } from 'react';

class CellEstadoVenta extends Component {
  colorsCells = {
    'Pendiente de confirmacion': 'bg-yellow-300',
    Anulado: 'bg-red-500',
    'Preparando pedido': 'bg-azul-500',
    'Pedido enviado/retirado': 'bg-green-500',
    'Listo para enviar/retirar': 'bg-naranja-500'
  };

  setColorEstadoVenta(row) {
    if (row.estado === 'Anulado') {
      return this.colorsCells[row.estado];
    }
    return this.colorsCells[row.vista_admin];
  }

  render() {
    return (
      <button
        className={`h-full w-full group relative 
        ${this.setColorEstadoVenta(this.props.data)}`}
        id="btnAction"
      >
        <div
          className={`group-hover:flex hidden fixed -mt-[12px] ml-[113px] rounded 
          ${this.setColorEstadoVenta(
            this.props.data
          )} py-1 px-4 capitalize text-xs font-bold !text-black`}
        >
          <div
            className={`${this.setColorEstadoVenta(
              this.props.data
            )} w-3 h-3 absolute top-[6px] -left-[6px] rotate-[45deg]`}
          ></div>
          <p className="text-black">{this.props.data.vista_admin}</p>
        </div>
      </button>
    );
  }
}

export default CellEstadoVenta;
