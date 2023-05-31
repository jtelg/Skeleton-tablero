import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import APIConsultas from '../../../services/consultas';
import ServUsos from '../../../utils/usos.utils';
import ModalView from '../../utils/modalView';

export class EgresoInsert extends Component {
  state = {
    tipo: 'Proveedor',
    monto: 0,
    numFactura: '',
    descripcion: '',
    fechaUso: ``
  };

  tipoEgreso = [
    { idtipo: 'Proveedor', nombre: 'Proveedor' },
    { idtipo: 'Cadeteria', nombre: 'Cadeteria' },
    { idtipo: 'Retiro', nombre: 'Retiro' }
  ];

  componentDidMount() {
    this.setState({ fechaUso: ServUsos.newDateMysql() });
  }

  onChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  closeModal(ev) {
    ev?.preventDefault();
    this.props.close(false);
    this.props.router.push('/admin');
  }

  async confirmarEgreso(ev) {
    ev.preventDefault();
    Swal.fire({
      icon: 'success',
      title: '¡Generando EGRESO!',
      showConfirmButton: false
    });
    try {
      await APIConsultas.caja.EGRESO_ADD(this.state);
      this.closeModal();
      this.props.router.push('/admin');
    } catch (error) {
      console.error('alta de egreso ', error);
    }
    Swal.close();
  }

  render() {
    return (
      <>
        <ModalView
          open={this.props.open}
          titulo="Nuevo Egreso"
          close={() => this.closeModal()}
          className="w-full"
        >
          <article className="h-full flex w-full min-w-[480px] gap-4">
            <form
              className="fullScroll rounded w-full"
              id="formProd"
              onSubmit={(e) => this.confirmarEgreso(e)}
            >
              <div className="cont-inps w-full">
                <div className="flex w-full mb-4">
                  <div className="grid grid-cols-1 w-[50%] mr-3">
                    <label
                      className="uppercase text-sm text-black font-bold text-light md:text-sm "
                      htmlFor="tipo"
                    >
                      Tipo
                    </label>
                    <select
                      className="px-3 h-10 rounded-lg border-2 border-primary-500 mt-1 focus:border-primary-600"
                      id="tipo"
                      name="tipo"
                      onChange={(ev) => this.onChange(ev)}
                      required={true}
                    >
                      {this.tipoEgreso.map((e, index) => (
                        <option key={index} value={e.idtipo}>
                          {e.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 w-[50%]">
                    <label
                      className="uppercase text-sm text-black font-bold md:text-sm text-light"
                      htmlFor="numFactura"
                    >
                      Numero de Factura
                    </label>
                    <input
                      className="px-3 h-10 rounded-lg border-2 border-primary-500 mt-1 focus:border-primary-600"
                      id="numFactura"
                      name="numFactura"
                      onChange={(ev) => this.onChange(ev)}
                    />
                  </div>
                </div>

                <div className="flex w-full mb-4">
                  <div className="grid grid-cols-1 w-[50%] mr-3">
                    <label
                      className="uppercase text-sm text-black font-bold text-light md:text-sm "
                      htmlFor="monto"
                    >
                      Monto
                    </label>
                    <input
                      className="px-3 h-10 rounded-lg border-2 border-primary-500 mt-1 focus:border-primary-600 "
                      type="number"
                      id="monto"
                      name="monto"
                      onChange={(ev) => this.onChange(ev)}
                      required={true}
                    />
                  </div>
                  <div className="grid grid-cols-1 w-[50%]">
                    <label
                      className="uppercase text-sm text-black font-bold md:text-sm text-light"
                      htmlFor="fechaUso"
                    >
                      FECHA
                    </label>
                    <input
                      className="px-3 h-10 rounded-lg border-2 border-primary-500 mt-1 focus:border-primary-600"
                      type="datetime-local"
                      placeholder=""
                      value={`${this.state.fechaUso}`}
                      id="fechaUso"
                      name="fechaUso"
                      onChange={(ev) => this.onChange(ev)}
                    />
                  </div>
                </div>
                <div className="flex mt-5 w-full">
                  <div className="grid grid-cols-1 w-full ">
                    <label
                      className="uppercase text-sm text-black font-bold md:text-sm text-light"
                      htmlFor="descripcion"
                    >
                      DESCRIPCION
                    </label>
                    <textarea
                      className="px-3 h-20 rounded-lg border-2 border-primary-500 mt-1 focus:border-primary-600"
                      type="text"
                      placeholder="Descripcion extra del egreso"
                      id="descripcion"
                      name="descripcion"
                      onChange={(ev) => this.onChange(ev)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-end gap-4 my-4">
                <input
                  type="submit"
                  className="w-full bg-primary-500 rounded-lg shadow-xl font-bold text-black px-4 py-2 hover:bg-primary-500 cursor-pointer"
                  value="Confirmar"
                />
              </div>
            </form>
          </article>
        </ModalView>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EgresoInsert);
