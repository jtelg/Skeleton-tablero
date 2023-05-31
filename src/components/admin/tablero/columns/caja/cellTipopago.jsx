import { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { RELOAD_TABLERO } from '../../../../../redux/actions';
import APIConsultas from '../../../../../services/consultas';
import ModalView from '../../../../utils/modalView';
class CellTipoPago extends Component {
  DataTipoPago = {
    Tarjeta: {
      colorPendiente: 'bg-red-200',
      colorAprobado: 'bg-green-200',
      msgPendiente: 'Pendiente de aprobacion',
      msgAprobado: 'Comprobante entregado con exito'
    },
    Transferencia: {
      colorPendiente: 'bg-red-200',
      colorAprobado: 'bg-green-200',
      msgPendiente: 'Pendiente de aprobacion',
      msgAprobado: 'Comprobante entregado con exito'
    }
  };

  state = {
    data: [],
    bndPendiente: false
  };

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      bndPendiente: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.data.pago_confirmado !== state.data.pago_confirmado) {
      return { data: props.data };
    }
    return null;
  }

  setData(index) {
    if (!this.DataTipoPago[this.state.data.tipo_pago]) return '';
    const fullIndex = `${index}${this.state.data.pago_confirmado}`;
    return this.DataTipoPago[this.state.data.tipo_pago][fullIndex];
  }

  cellClick() {
    if (!this.DataTipoPago[this.state.data.tipo_pago]) return '';
    if (this.state.data.vista_admin === 'Pendiente de confirmacion')
      return toast.info(`El pedido no fue aceptado aun`);
    if (this.state.data.pago_confirmado === 'Aprobado')
      return toast.success(`Comprobante aprobado`);
    if (this.state.data.pago_confirmado === 'Pendiente')
      return this.setState({ bndPendiente: true });
  }

  async btnClick(index) {
    if (index === 'rechazado') return this.setState({ bndPendiente: false });
    const obj = {
      idventa: this.state.data.idventa,
      campo: 'pago_confirmado',
      valor: 'Aprobado'
    };
    await APIConsultas.ventas.UPDATE_XCAMPO(obj, true);
    toast.success(`Comprobante aprobado`);
    this.setState({ bndPendiente: false });
    this.props.dispatch(RELOAD_TABLERO(true));
  }

  render() {
    return (
      <>
        <button
          title={this.setData('msg')}
          className={`w-full h-full flex justify-center items-center ${this.setData(
            'color'
          )}`}
          onClick={() => this.cellClick()}
        >
          {this.state.data.tipo_pago}
        </button>
        <ModalView
          open={this.state.bndPendiente}
          titulo="Comprobante"
          close={() => this.setState({ bndPendiente: false })}
        >
          <div className="flex justify-center flex-col items-center">
            <p className="max-w-[260px] text-center font-bold">
              ¿El comprobante fue recibido correctamente?
            </p>
            <div className="flex gap-4">
              <button
                className="enviar mt-4 bg-red-500 w-full justify-center"
                onClick={() => this.btnClick('rechazado')}
              >
                Cancelar
              </button>
              <button
                className="enviar mt-4 bg-green-500 w-full justify-center"
                onClick={() => this.btnClick('confirmado')}
              >
                Confirmado
              </button>
            </div>
          </div>
        </ModalView>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, null)(CellTipoPago);
