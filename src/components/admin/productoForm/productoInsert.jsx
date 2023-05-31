import { useEffect, useState } from 'react';
import APIConsultas from '../../../services/consultas';
import ModalList from '../../utils/modalList';
import ModalView from '../../utils/modalView';

import { v4 as uuidv4 } from 'uuid';

import { useRouter } from 'next/router';

const ProductoUpdate = (props) => {
  const router = useRouter();
  const [arr_categs, setArr_categs] = useState([]);
  const [arr_marcas, setArr_marcas] = useState([]);
  const [bndModal, setBandera] = useState({
    categ: false,
    subc: false,
    marca: false
  });

  const [formulario, setFormulario] = useState({
    idart: '',
    idsubc: '',
    subc: '',
    idcateg: '',
    categ: '',
    modelo: '',
    idmarca: '',
    marca: '',
    codart: uuidv4(),
    precioventa: '',
    preciocompra: '',
    moneda: 'peso',
    descripcion: '',
    descripBreve: ''
  });
  useEffect(() => {
    const fetchData = async () => {
      const categs = await APIConsultas.categoria.TODO(true);
      setArr_categs(categs);
      setArr_marcas(await APIConsultas.marca.TODO(true));
    };
    fetchData().catch(console.error);
  }, []);
  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === 'categ' || name === 'subc' || name === 'marca') {
      return clickBandera(null, name, true);
    }

    setFormulario({
      ...formulario,
      [name]: value
    });
  };
  const clickBandera = (ev, name, value) => {
    ev?.preventDefault();
    setBandera({
      ...bndModal,
      [name]: value
    });
  };

  const setData = (item, name) => {
    setFormulario({
      ...formulario,
      [name]: item.nombre,
      [`id${name}`]: item[`id${name}`]
    });
  };

  const insertProducto = async (e) => {
    e.preventDefault();
    const re = await APIConsultas.producto.ADD(formulario);
    if (re) {
      setFormulario({
        idart: '',
        idsubc: '',
        subc: '',
        idcateg: '',
        categ: '',
        modelo: '',
        idmarca: '',
        marca: '',
        codart: uuidv4(),
        precioventa: '',
        preciocompra: '',
        moneda: 'peso',
        descripcion: '',
        descripBreve: ''
      });
      closeModal(null);
      router.push('/admin?s=productos');
    }
  };
  const closeModal = (ev) => {
    ev?.preventDefault();
    props.close(false);
  };
  return (
    <>
      <ModalView
        open={props.open}
        titulo="Alta de producto"
        close={() => closeModal()}
      >
        <article className="h-full">
          <form
            className="fullScroll rounded max-w-[460px] w-full Outfit"
            id="formProd"
            onSubmit={(e) => insertProducto(e)}
          >
            <div className="cont-inps w-full">
              <div className="flex w-full">
                <div className="grid grid-cols-1 mr-3 w-5/6">
                  <label
                    className=" text-sm text-black font-bold text-light md:text-sm "
                    htmlFor="codart"
                  >
                    Codigo
                  </label>
                  <input
                    className="px-3 h-10 rounded-[20px] border-2 border-secondary mt-1  "
                    type="text"
                    id="codart"
                    name="codart"
                    value={formulario.codart}
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-1 mr-3 w-full">
                  <label
                    className=" text-sm text-black font-bold md:text-sm text-light"
                    htmlFor="idcateg"
                  >
                    Categoria
                    <abbr className="text-red-400 pl-1" title="required">
                      *
                    </abbr>
                  </label>
                  <input
                    className="px-3 h-10 rounded-[20px] border-2 border-secondary mt-1 "
                    id="categ"
                    name="categ"
                    onClick={(ev) => clickBandera(ev, 'categ', true)}
                    value={formulario.categ}
                    onChange={onChange}
                    required={true}
                    autoComplete="off"
                  />
                  <ModalList
                    nomlist="Categorias"
                    data={arr_categs}
                    open={bndModal.categ}
                    keyuse="nombre"
                    setdata={(item) => setData(item, 'categ')}
                    close={(ev) => clickBandera(ev, 'categ', false)}
                  />
                </div>
              </div>
              <div className="flex mt-5 w-full">
                <div className="grid grid-cols-1 mr-3 w-9/6">
                  <label
                    className=" text-sm text-black font-bold md:text-sm text-light"
                    htmlFor="marca"
                  >
                    Marca
                  </label>
                  <input
                    className="px-3 h-10 rounded-[20px] border-2 border-secondary mt-1"
                    type="text"
                    placeholder=""
                    id="marca"
                    name="marca"
                    onClick={(ev) => clickBandera(ev, 'marca', true)}
                    value={formulario.marca}
                    onChange={onChange}
                    autoComplete="off"
                  />
                  <ModalList
                    nomlist="Marcas"
                    data={arr_marcas}
                    open={bndModal.marca}
                    keyuse="nombre"
                    setdata={(item) => setData(item, 'marca')}
                    close={(ev) => clickBandera(ev, 'marca', false)}
                  />
                </div>
                <div className="grid grid-cols-1 w-full">
                  <label
                    className=" text-sm text-black font-bold md:text-sm text-light"
                    htmlFor="modelo"
                  >
                    Nombre producto
                    <abbr className="text-red-400 pl-1" title="required">
                      *
                    </abbr>
                  </label>
                  <input
                    className="px-3 h-10 rounded-[20px] border-2 border-secondary mt-1"
                    type="text"
                    placeholder=""
                    id="modelo"
                    name="modelo"
                    value={formulario.modelo}
                    onChange={onChange}
                    required={true}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="flex mt-5">
                <div className="grid grid-cols-1 mr-3 max-w-[110px] w-full">
                  <label
                    className="md:text-sm text-light  text-sm text-black font-bold"
                    htmlFor="moneda"
                  >
                    Moneda
                    <abbr className="text-red-400 pl-1" title="required">
                      *
                    </abbr>
                  </label>
                  <select
                    className="px-3 h-10 rounded-[20px] border-2 border-secondary mt-1"
                    id="moneda"
                    name="moneda"
                    value={formulario.moneda}
                    onChange={onChange}
                    required={true}
                  >
                    <option value="peso">Pesos</option>
                    <option value="usd">Dolar</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 mr-3 w-full">
                  <label
                    className=" text-sm text-black font-bold md:text-sm text-light"
                    htmlFor="precioventa"
                  >
                    Precio Venta
                    <abbr className="text-red-400 pl-1" title="required">
                      *
                    </abbr>
                  </label>
                  <input
                    className="px-3 h-10 rounded-[20px] border-2 border-secondary mt-1"
                    type="text"
                    min="1"
                    placeholder="0,00"
                    id="precioventa"
                    name="precioventa"
                    value={formulario.precioventa}
                    onChange={onChange}
                    required={true}
                    autoComplete="off"
                  />
                </div>
                <div className="grid grid-cols-1 w-full">
                  <label
                    className=" text-sm text-black font-bold md:text-sm text-light"
                    htmlFor="preciocompra"
                  >
                    Costo Compra
                  </label>
                  <input
                    className="px-3 h-10 rounded-[20px] border-2 border-secondary mt-1 focus:border-primary-600 text-right"
                    type="number"
                    placeholder="0,00"
                    id="preciocompra"
                    name="preciocompra"
                    value={formulario.preciocompra}
                    onChange={onChange}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:gap-8 mt-5">
                <div className="grid grid-cols-1">
                  <label
                    className=" text-sm text-black font-bold md:text-sm text-light"
                    htmlFor="descripcion"
                  >
                    Descripcion
                  </label>
                  <textarea
                    className="px-3 py-2 h-10 rounded-[20px] border-2 border-secondary mt-1  min-h-[150px]"
                    id="descripcion"
                    name="descripcion"
                    value={formulario.descripcion}
                    onChange={onChange}
                    autoComplete="off"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-end gap-4 my-4">
              <button
                type="button"
                onClick={(ev) => closeModal(ev)}
                className="w-[50%] bg-black rounded-[20px] shadow-xl font-medium text-white px-4 py-2 hover:bg-gray-700"
              >
                Cancelar
              </button>
              <input
                type="submit"
                className="w-[50%] bg-primary-500 rounded-[20px] shadow-xl font-bold text-white px-4 py-2 hover:bg-primary-500 cursor-pointer"
                value="Confirmar"
              />
            </div>
          </form>
        </article>
      </ModalView>
    </>
  );
};
export default ProductoUpdate;
