import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductoInsert from '../productoForm/productoInsert';
import VentaInsert from '../../admin/ventas/ventaInsert';
import EgresoInsert from '../ventas/egresoInsert';
import ClienteInsert from '../usuarioForm/clientesInsert';
export class ButtonInsert extends Component {
  state = {
    altaProd: false,
    altaVenta: false,
    altaEgreso: false,
    altaClientes: false
  };

  componentDidMount() {
    if (this.props.use) {
      this.setState({ [this.props.use]: true });
    }
  }

  InsertData() {
    if (this.props.obj_use.ind_use === 1) {
      // inserta un nuevo producto
      // actualiza la url del navegador
      window.history.pushState(null, '', '/admin?use=altaProd');
      // abre el modal de alta, ya que al actualizar y no recargar pagina no se abre solo.
      this.setState({ altaProd: true });
    } else if (this.props.obj_use.ind_use === 0) {
      if (this.props.obj_use.buttonTitle === 'Nueva Orden') {
        // inserta una nueva orden
        window.history.pushState(null, '', '/admin?use=altaVenta');
        // abre el modal de ordenes
        this.setState({ altaVenta: true });
      } else if (this.props.obj_use.buttonTitle === 'Nuevo Egreso') {
        // inserta un nuevo Egreso
        window.history.pushState(null, '', '/admin?use=altaEgreso');
        this.setState({ altaEgreso: true });
      }
    } else if (this.props.obj_use.buttonTitle === 'Nuevo Cliente') {
      // inserta un nuevo Egreso
      window.history.pushState(null, '', '/admin?use=altaClientes');
      this.setState({ altaClientes: true });
    }
  }

  CloseModal = () => {
    this.setState({ altaClientes: false });
    window.history.pushState(null, '', '/admin?s=clientes');
  };

  render() {
    return (
      <>
        <button
          className="enviar bg-primary-500  text-white"
          onClick={() => this.InsertData()}
        >
          <span className="material-icons-outlined">add</span>
          {this.props.obj_use.buttonTitle}
        </button>

        <ProductoInsert
          open={this.state.altaProd}
          close={() => this.setState({ altaProd: false })}
        />
        <VentaInsert
          open={this.state.altaVenta}
          close={() => this.setState({ altaVenta: false })}
        />
        <ClienteInsert open={this.state.altaClientes} close={this.CloseModal} />
        <EgresoInsert
          open={this.state.altaEgreso}
          close={() => this.setState({ altaEgreso: false })}
          router={this.props.router}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonInsert);
