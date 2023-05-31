import React from 'react';
import APIConsultas from '../../services/consultas';
class SearchProducto extends React.Component {
  state = {
    timer: null,
    productos: [],
    prodFilter: [],
    visible: false
  };

  productoSelect = [];
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    APIConsultas.producto.GET_SHOP(0, 0).then(async (dataprod) => {
      dataprod.forEach((prod) => {
        prod.checked = false;
      });
      this.setState({
        productos: dataprod,
        prodFilter: dataprod
      });
      this.controlClick();
    });
  }

  // Evento que controla cuando se hace click en el contenedor
  // del buscador o los items, o cuando se hace click fuera
  controlClick() {
    document.addEventListener('mouseup', (event) => {
      const obj = document.getElementById('contenedor');
      if (!obj) return;
      if (!obj.contains(event.target)) {
        this.setState({ visible: false });
      } else {
        this.setState({ visible: true });
      }
    });
  }

  search(ev) {
    const q = ev.target.value;
    this.setState({
      prodFilter: this.state.productos.filter((v) => {
        if (q) {
          if (
            v.modelo?.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            v.descripcion?.toLowerCase().indexOf(q.toLowerCase()) > -1
          ) {
            this.setState({ visible: true });
            return true;
          }
          this.setState({ visible: false });
          return false;
        }
        this.setState({ visible: false });
        return this.state.productos;
      })
    });
  }

  selectProducto(ev, prod) {
    prod.checked = ev.target.checked;
    if (prod.checked) this.productoSelect = [...this.productoSelect, prod];
    if (!prod.checked) {
      this.productoSelect = this.productoSelect.filter(
        (p) => p.idart !== prod.idart
      );
    }
    this.props.setProductos(this.productoSelect);
  }

  render() {
    return (
      <>
        <div id="contenedor">
          <div className="grid grid-cols-1">
            <label
              className="uppercase text-sm text-black font-bold md:text-sm text-light mb-1"
              htmlFor="telefono"
            >
              Agrega un producto
            </label>
            <div
              className={`w-full flex flex-col gap-4 border-secondary rounded-[20px] transition-all ${
                this.state.visible ? 'border-2' : 'border-0'
              }`}
            >
              <input
                className={`px-3 h-[2.45rem] rounded-[20px] border-secondary transition-all  w-full outline-none ${
                  this.state.visible ? 'border-0' : 'border-2'
                }`}
                autoComplete="off"
                id="search"
                name="search"
                type="search"
                onChange={(ev) => this.search(ev)}
                required={true}
              />
              <ul
                className={`border border-gray-200 rounded-[20px] overflow-auto max-h-[170px] ${
                  this.state.visible ? 'block' : 'hidden'
                }`}
              >
                {this.state.prodFilter.map((prod, index) => (
                  <label
                    key={index}
                    className="px-4 py-2 bg-white hover:bg-primary-100 hover:text-primary-700 flex justify-between
                  border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out cursor-pointer"
                    htmlFor={'check' + index}
                  >
                    <p>{prod.modelo}</p>
                    <input
                      type="checkbox"
                      id={'check' + index}
                      onChange={(ev) => this.selectProducto(ev, prod, index)}
                      value={prod.checked}
                    />
                  </label>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SearchProducto;
