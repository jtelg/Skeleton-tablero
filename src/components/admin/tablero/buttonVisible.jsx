import React, { Component } from 'react';
import APIConsultas from '../../../services/consultas';

export default class ButtonVisible extends Component {
  async searchVisible(e) {
    e.preventDefault();
    let re = [];
    let idcaja = 0;
    let bndestado = 1;
    if (this.props.cajaAbierta) idcaja = this.props.cajaAbierta.idcaja;
    if (this.props.visible) bndestado = 0;
    this.props.setVisible(!this.props.visible);
    re = await APIConsultas.ventas.GET_ALL(idcaja, bndestado);
    this.props.setArr_use(re);
  }

  render() {
    return (
      <div>
        {!this.props.visible ? (
          <button
            onClick={(e) => this.searchVisible(e)}
            className="bg-white w-9 h-9 rounded-full hover:bg-[#ffffff99] transition-all"
          >
            <i className="bx bx-low-vision text-xl"></i>
          </button>
        ) : (
          <button
            onClick={(e) => this.searchVisible(e)}
            className="bg-white w-9 h-9 rounded-full hover:bg-[#ffffff99] transition-all"
          >
            <i className="bx bx-show-alt text-xl"></i>
          </button>
        )}
      </div>
    );
  }
}
