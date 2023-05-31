import React, { Component } from 'react';
export class SelectorIndexCaja extends Component {
  state = {
    indicesMuestra: [],
    arrVentas: [],
    arrEgresos: [],
    dataCaja: null,
    indexSelect: 0
  };

  static getDerivedStateFromProps(props, state) {
    const countVentas =
      props.dataCaja.idcaja > 0
        ? props.dataCaja.arrventas.length
        : props.arr_use.length;
    let countEgresos = props.arrEgresos.length;
    if (props.dataCaja) {
      if (props.dataCaja.arrEgresos) {
        countEgresos = props.dataCaja.arrEgresos.length;
      }
    }
    const indicesMuestra = [
      {
        titulo: 'ingresos',
        descrip: 'Ingresos por caja',
        buttonTitle: 'Nueva Orden',
        count: countVentas,
        id: 0
      },
      {
        titulo: 'egresos',
        descrip: 'Egresos por caja.',
        buttonTitle: 'Nuevo Producto',
        count: countEgresos,
        id: 1
      }
    ];
    if (props.arrVentas !== state.arrVentas) {
      return {
        indicesMuestra,
        arrVentas: props.arrVentas,
        dataCaja: props.dataCaja,
        indexSelect: props.indexSelect
      };
    }
    return {
      indicesMuestra,
      arrVentas: props.arrVentas,
      dataCaja: props.dataCaja,
      indexSelect: props.indexSelect
    };
  }

  async selector(indice) {
    this.setState({ indexSelect: indice.id });
    const filter =
      this.state.dataCaja.idcaja > 0
        ? `&idc=${this.state.dataCaja.idcaja}`
        : '';
    return this.props.router.push(
      `/admin?s=${this.props.text_use}&sc=${indice.titulo}${filter}`
    );
  }

  render() {
    return (
      <div
        className={`flex md:w-1/2 w-full md:justify-start justify-between px-4 mb-4 gap-4`}
      >
        {this.state.indicesMuestra.map((indice, index) => (
          <div
            className={`md:w-1/2 w-full ${
              index !== this.state.indicesMuestra.length - 1
            } && 'w-full'h-full`}
            key={index}
            title={indice.descrip}
          >
            <div
              className={`${
                this.state.indexSelect === indice.id
                  ? 'border-2 bg-secondary'
                  : 'bg-white'
              } border-2 transition-all border-secondary h-full flex items-center px-[1rem] py-1 shadow-sm rounded-[1rem] cursor-pointer`}
              onClick={() => this.selector(indice)}
              role="button"
              aria-hidden
            >
              {indice.titulo && (
                <div className="mx-2 flex items-center justify-between w-full gap-[1rem]  ">
                  <div
                    className={`uppercase font-semibold tracking-tighter text-[15px] ${
                      this.state.indexSelect === indice.id
                        ? 'text-white'
                        : 'text-secondary'
                    }`}
                  >
                    {indice.titulo}
                  </div>
                  {this.props.loading ? (
                    <i className="bx bx-refresh bx-spin text-xl"></i>
                  ) : (
                    <h4
                      className={`text-[15px] font-bold ${
                        this.state.indexSelect === indice.id
                          ? 'text-white '
                          : 'text-secondary'
                      } `}
                    >
                      {indice.count}
                    </h4>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default SelectorIndexCaja;
