import React, { Component } from 'react';
import { connect } from 'react-redux';
import UsuarioUpdate from '../usuarioForm/usuarioUpdate';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import APIConsultas from '../../../services/consultas';
import { RELOAD_TABLERO } from '../../../redux/actions';
import UpdateProducto from '../productoForm/updateProducto';

export class ButtonEdit extends Component {
  state = {
    editClientes: false,
    editProductos: false
  };

  componentDidMount() {
    if (this.props.use) {
      this.setState({ [this.props.use]: true });
    }
  }

  EditData() {
    //si tiene iduser es un edit a un cliente
    if (this.props.params.row.iduser) {
      //   // edita un Clieente
      //   // actualiza la url del navegador
      window.history.pushState(null, '', '/admin?edit=clientes');
      //   // abre el modal de edit, ya que al actualizar y no recargar pagina no se abre solo.
      this.setState({ editClientes: true });
    } else if (this.props.params.row.idart) {
      //   // edita un Clieente
      //   // actualiza la url del navegador
      window.history.pushState(null, '', '/admin?edit=productos');
      //   // abre el modal de edit, ya que al actualizar y no recargar pagina no se abre solo.
      this.setState({ editProductos: true });
    }
  }
  DeleteProducto = (prod) => {
    Swal.fire({
      icon: 'question',
      title: '¿Desea eliminar el producto?',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: 'Cancelar',
      customClass: {
        actions: 'my-actions',
        denyButton: 'order-2',
        confirmButton: 'order-3 !bg-primary-500'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        await APIConsultas.producto.UPDATE(prod.idart, 'eliminado', 1);
        toast.success(`Articulo eliminado`);
      }
    });
  };

  CloseModal = () => {
    window.history.pushState(null, '', '/admin?s=clientes');
    this.setState({ editClientes: false });
  };

  render() {
    return (
      <>
        <div className="flex flex-row gap-2">
          <button onClick={() => this.EditData()}>
            <i className="bx bxs-pencil text-secondary-500 text-[22px]"></i>
          </button>
          <button onClick={() => this.DeleteProducto(this.props.params.row)}>
            <i className="bx bxs-trash text-red-500 text-[22px]"></i>
          </button>
        </div>
        <UsuarioUpdate
          client={this.props.params.row}
          open={this.state.editClientes}
          close={this.CloseModal}
        />
        <UpdateProducto
          client={this.props.params.row}
          open={this.state.editProductos}
          close={() => this.setState({ editProductos: false })}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    reload: () => dispatch(RELOAD_TABLERO(true))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonEdit);
