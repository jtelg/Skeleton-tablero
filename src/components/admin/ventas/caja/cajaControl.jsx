import React, { Component } from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { connect } from 'react-redux';
class CajaControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCajas: props.arrCajas,
      selectTxt: props.dataCaja.titulo
    };
  }

  static getDerivedStateFromProps(props, state) {
    return { selectTxt: props.dataCaja.titulo };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.arrCajas !== this.props.arrCajas && this.props.arrCajas) {
      this.setState({ arrCajas: this.props.arrCajas });
    }
  }

  async handleChangeFilter(event) {
    // cuando se selecciona una nueva caja, enviar a una url con el id de la caja
    // para que desde index tablero se carguen los datos
    const caja = this.props.arrCajas.find(
      (c) => c.titulo === event.target.value
    );
    let filter = ``;
    if (caja.idcaja > 0) filter = `&idc=${caja.idcaja}`;
    this.props.router.push(`/admin?s=ordenes&sc=ingresos${filter}`);
    this.setState({ selectTxt: event.target.value });
  }

  render() {
    return (
      <div className="rounded flex gap-4">
        <FormControl size="small" className="rounded">
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={this.state.selectTxt}
            label="data"
            onChange={(ev) => this.handleChangeFilter(ev)}
            className="bg-secondary text-white rounded font-bold uppercase text-sm"
          >
            {this.state.arrCajas.map((b, i) => (
              <MenuItem
                key={i}
                value={b.titulo}
                className="font-bold uppercase text-sm"
              >
                {b.titulo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reloadCaja: state.reloadCaja
  };
};

export default connect(mapStateToProps, null)(CajaControl);
