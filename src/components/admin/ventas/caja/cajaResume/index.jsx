import React, { Component } from 'react';
import ModalView from '../../../../utils/modalView';
import GridProductos from './gridProductos';
import ListTotal from './listTotal';
class CajaResume extends Component {
  state = {
    dataCaja: {},
    arrProdsTotales: [],
    modal: false
  };

  render() {
    return (
      <>
        <div className="w-full flex justify-end">
          <button
            className="enviar bg-primary-500 text-white whitespace-pre justify-center !px-[22.5px]"
            onClick={() => this.setState({ modal: true })}
          >
            <span className="material-icons-outlined">fact_check</span>
            Resumen de caja
          </button>
        </div>

        <ModalView
          open={this.state.modal}
          titulo="Resumen de caja"
          close={() => this.setState({ modal: false })}
        >
          <div className="w-screen max-w-4xl">
            <GridProductos dataCaja={this.props.dataCaja} />
            <ListTotal dataCaja={this.props.dataCaja} />
          </div>
        </ModalView>
      </>
    );
  }
}

export default CajaResume;
