// como se obtiene la fecha de hoy con javascript ?

import React, { Component } from 'react';
import ModalView from '../../../utils/modalView';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import APIConsultas from '../../../../services/consultas';
import Swal from 'sweetalert2';
import { RELOAD_CAJA } from '../../../../redux/actions';
class CajaClose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      comentario: ''
    };
  }

  ctrlPending() {
    // orden pendiente
    const orderPendings = this.props.arrVentas.filter((v) => v.idestado === 1);
    // preperando orden
    const orderPreparing = this.props.arrVentas.filter((v) => v.idestado === 2);

    if (orderPendings.length > 0) {
      toast.error(`Posee orden/es pendientes de respuesta`);
    }
    if (orderPreparing.length > 0) {
      toast.error(`Posee ordenes sin entregar`);
    }

    if (orderPendings.length === 0 && orderPreparing.length === 0) {
      return this.setState({ modal: true });
    }
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  async confirmar() {
    Swal.fire({
      icon: 'success',
      title: '¡Cerrando caja!',
      showConfirmButton: false
    });
    try {
      const ventasNoVisibles = await APIConsultas.ventas.GET_ALL(0, 1);
      const form = {
        comentario: this.state.comentario,
        iduser: this.props.session.iduser,
        arrVentas: [...this.props.arrVentas, ...ventasNoVisibles],
        arrEgresos: this.props.arrEgresos
      };
      const re = await APIConsultas.caja.ADD(form);
      if (re) toast.success(`Caja cerrada con exito!`);
      this.props.dispatch(RELOAD_CAJA(true));
    } catch (error) {
      toast.error('Error al cerrar la caja');
    }
    Swal.close();
    this.setState({ modal: false });
    window.location.reload(false);
  }

  render() {
    return (
      <div>
        <div className="w-full flex justify-end">
          <button
            className="enviar bg-green-500 text-white whitespace-pre justify-center !px-[22.5px]"
            onClick={() => this.ctrlPending()}
          >
            <span className="material-icons-outlined">done</span>
            Cerrar caja
          </button>
        </div>
        <ModalView
          open={this.state.modal}
          titulo="Cierre de caja"
          close={() => this.setState({ modal: false })}
        >
          <div className="w-screen max-w-xs">
            <div className="grid grid-cols-1">
              <label
                className="uppercase text-sm text-black font-bold md:text-sm text-light"
                htmlFor="descripBreve"
              >
                Comentario
              </label>
              <textarea
                className="px-3 py-2 rounded-lg border-2 border-primary-500 mt-1 focus:border-primary-600"
                id="comentario"
                name="comentario"
                value={this.state.comentario}
                onChange={(ev) => this.onChange(ev)}
              ></textarea>
            </div>
            <button
              className="enviar bg-primary-500 text-gray-800 justify-center w-full mt-4"
              onClick={() => this.confirmar()}
            >
              Confirmar
            </button>
          </div>
        </ModalView>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.session
  };
};

export default connect(mapStateToProps, null)(CajaClose);
