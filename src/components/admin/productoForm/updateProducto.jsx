import React, { useState, useEffect } from 'react';
import ModalView from '../../utils/modalView';
import { toast } from 'react-toastify';

import ModalList from '../../utils/modalList';
import Link from 'next/link';
import { useRouter } from 'next/router';
import APIConsultas from '../../../services/consultas';

const UpdateProducto = (props) => {
  const [arr_categs, setArr_categs] = useState([]);
  const [arr_marcas, setArr_marcas] = useState([]);
  const [timer, setTimer] = useState(null);

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
    idmodelo: '',
    modelo: '',
    idmarca: '',
    marca: '',
    codart: '',
    precioventa: '',
    preciocompra: '',
    moneda: '',
    visible: '',
    feccarga: '',
    descripcion: '',
    descripBreve: '',
    typeCatalog: '',
    arrimagesIndiv: [],
    arrmedidasIndiv: [],
    arrcolor: []
  });

  const router = useRouter();

  useEffect(() => {
    APIConsultas.producto
      .GET_XID(props.client.idart, true)
      .then((data_prod) => {
        if (!data_prod) return router.push('/admin');
        setFormulario({
          idart: data_prod.idart,
          idsubc: data_prod.idsubc,
          subc: '',
          idcateg: data_prod.idcateg,
          categ: data_prod.categoria,
          idmodelo: data_prod.idmodelo,
          modelo: data_prod.modelo,
          idmarca: data_prod.idmarca,
          marca: data_prod.marca,
          codart: data_prod.codart,
          precioventa: data_prod.precioventa,
          preciocompra: data_prod.preciocompra,
          moneda: data_prod.moneda,
          visible: data_prod.visible,
          feccarga: data_prod.feccarga,
          descripcion: data_prod.descripcion,
          descripBreve: data_prod.descripBreve,
          typeCatalog: data_prod.typeCatalog,
          arrimagesIndiv: [],
          arrmedidasIndiv: data_prod.arrmedidasIndiv,
          arrcolor: data_prod.arrcolor
        });
        APIConsultas.categoria.TODO(true).then((categs) => {
          setArr_categs(categs);
        });
        APIConsultas.marca.TODO(true).then((marcas) => {
          setArr_marcas(marcas);
        });
      });
  }, [props.client.idart, router]);

  const setData = (item, name) => {
    setFormulario({
      ...formulario,
      [name]: item.nombre,
      [`id${name}`]: item[`id${name}`],
      visible: ctrlVisible([`id${name}`], item[`id${name}`])
    });

    // if (name !== 'categ') {
    updateData(`id${name}`, item[`id${name}`]);
    // }
  };
  const onChange = (e) => {
    e.preventDefault();
    if (e.target.name !== 'visible') {
      setFormulario({
        ...formulario,
        [e.target.name]: e.target.value,
        visible: ctrlVisible(e.target.name, e.target.value)
      });
    } else {
      let val = e.target.value;
      if (val === 0) val = ctrlVisible(e.target.name, e.target.value);
      setFormulario({
        ...formulario,
        visible: val
      });
    }

    if (
      e.target.name !== 'arrcolor' &&
      e.target.name !== 'arrmedidasIndiv' &&
      e.target.name !== 'arrimagesIndiv'
    ) {
      updateData(e.target.name, e.target.value);
    }
  };
  const updateData = (campo, valor) => {
    clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        const res = await APIConsultas.producto.UPDATE(
          formulario.idart,
          campo,
          valor
        );
        if (res) {
          if (campo !== 'visible') {
            updateData('visible', ctrlVisible(campo, valor));
            return toast.success(`Dato actualizado!`, {
              autoClose: 1000
            });
          }
          return;
        }
        return toast.error(`Error al modificar el campo.`);
      }, 1000)
    );
  };
  const clickBandera = (ev, name, value) => {
    ev.preventDefault();
    setBandera({
      ...bndModal,
      [name]: value
    });
  };
  const setValue = async (ev, name, value) => {
    ev?.preventDefault();
    updateData(name, value);
  };

  const ctrlVisible = (campo, valor) => {
    let ocultar = 0;

    if (
      campo === 'categ' ||
      campo === 'marca' ||
      campo === 'modelo' ||
      campo === 'moneda' ||
      campo === 'precioventa'
    ) {
      if (+valor <= 0 || valor.length === 0) {
        ocultar = 1;
      }
    }
    ocultar = ctrlForm(ocultar, campo, valor);

    return ocultar;
  };
  const infoUser = (ev, key, value) => {
    ev.preventDefault();
    let msg = '';
    let visible = 0;

    visible = formulario.visible === 0 ? 1 : 0;
    if (ctrlVisible('visible', visible) === 0) {
      setFormulario({
        ...formulario,
        visible
      });
      setValue(ev, 'visible', visible);
      return;
    }
    msg = `Para poner el producto visible debe completar todos los datos obligatorios.`;

    return toast.info(msg);
  };
  const ctrlForm = (ocultar, campo, valor) => {
    if (
      formulario.categ.length === 0 ||
      formulario.marca.length === 0 ||
      formulario.modelo.length === 0 ||
      formulario.moneda.length === 0 ||
      formulario.precioventa.length === 0 ||
      formulario.precioventa === 0
    ) {
      ocultar = 1;
    }

    return ocultar;
  };

  const closeModal = (e) => {
    e.preventDefault();
    props.close(false);
    router.push('/admin?s=productos');
  };

  return (
    <>
      <ModalView
        open={props.open}
        titulo="Ficha Producto"
        close={() => props.close(false)}
      >
        <article className="pb-4">
          <form className=" fullScroll Outfit ">
            <div className="bg-white rounded-3xl shadow-xl w-full  p-4  border-2 border-secondary">
              <div className="block md:flex gap-4">
                <div className="cont-inps w-full flex flex-col gap-4">
                  <div className="w-full">
                    <div className="flex w-full">
                      <div className="grid grid-cols-1 mr-3 w-5/6">
                        <label
                          className="uppercase text-sm text-black font-bold text-light md:text-sm "
                          htmlFor="codart"
                        >
                          Codigo
                        </label>
                        <input
                          className="px-3 h-10  border-2 border-secondary rounded-[20px] mt-1 "
                          type="text"
                          id="codart"
                          name="codart"
                          value={formulario.codart}
                          readOnly
                        />
                      </div>
                      <div className="grid grid-cols-1 mr-3 w-full">
                        <label
                          className="uppercase text-sm text-black font-bold md:text-sm text-light"
                          htmlFor="idcateg"
                        >
                          Categoria
                          <abbr
                            className="text-red-400 pl-1"
                            title="Dato obligatorio"
                          >
                            *
                          </abbr>
                        </label>
                        <input
                          className="px-3 h-10 border-2 border-secondary rounded-[20px] mt-1 "
                          id="categ"
                          name="categ"
                          readOnly
                          onClick={(ev) => clickBandera(ev, 'categ', true)}
                          value={formulario.categ}
                          onChange={onChange}
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
                          className="uppercase text-sm text-black font-bold md:text-sm text-light"
                          htmlFor="marca"
                        >
                          Marca
                          <abbr
                            className="text-red-400 pl-1"
                            title="Dato obligatorio"
                          >
                            *
                          </abbr>
                        </label>
                        <input
                          className="px-3 h-10  border-2 border-secondary rounded-[20px] mt-1 "
                          type="text"
                          placeholder=""
                          id="marca"
                          name="marca"
                          readOnly
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
                          className="uppercase text-sm text-black font-bold md:text-sm text-light"
                          htmlFor="modelo"
                        >
                          Modelo
                          <abbr
                            className="text-red-400 pl-1"
                            title="Dato obligatorio"
                          >
                            *
                          </abbr>
                        </label>
                        <input
                          className="px-3 h-10  border-2 border-secondary rounded-[20px] mt-1 "
                          type="text"
                          placeholder=""
                          id="modelo"
                          name="modelo"
                          value={formulario.modelo}
                          onChange={onChange}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="flex mt-5">
                      <div className="grid grid-cols-1 mr-3 max-w-[110px] w-full">
                        <label
                          className="md:text-sm text-light uppercase text-sm text-black font-bold"
                          htmlFor="moneda"
                        >
                          Moneda
                          <abbr
                            className="text-red-400 pl-1"
                            title="Dato obligatorio"
                          >
                            *
                          </abbr>
                        </label>
                        <select
                          className="px-3 h-10  border-2 border-secondary rounded-[20px] mt-1 "
                          id="moneda"
                          name="moneda"
                          value={formulario.moneda}
                          onChange={onChange}
                        >
                          <option value="peso">Pesos</option>
                          <option value="usd">Dolar</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-1 mr-3 w-full">
                        <label
                          className="uppercase text-sm text-black font-bold md:text-sm text-light"
                          htmlFor="precioventa"
                        >
                          Precio Venta
                          <abbr
                            className="text-red-400 pl-1"
                            title="Dato obligatorio"
                          >
                            *
                          </abbr>
                        </label>
                        <input
                          className="px-3 h-10  border-2 border-secondary rounded-[20px] mt-1 "
                          type="text"
                          min="1"
                          placeholder="0,00"
                          id="precioventa"
                          name="precioventa"
                          value={formulario.precioventa}
                          autoComplete="off"
                          onChange={onChange}
                        />
                      </div>
                      <div className="grid grid-cols-1 w-full">
                        <label
                          className="uppercase text-sm text-black font-bold md:text-sm text-light"
                          htmlFor="preciocompra"
                        >
                          Precio Compra
                        </label>
                        <input
                          className="px-3 h-10  border-2 border-secondary rounded-[20px] mt-1 "
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
                  </div>
                  <div className="w-full">
                    <div className="grid grid-cols-1 gap-5 md:gap-8">
                      <div className="grid grid-cols-1">
                        <label
                          className="uppercase text-sm text-black font-bold md:text-sm text-light"
                          htmlFor="descripBreve"
                        >
                          Breve Descripcion
                        </label>
                        <textarea
                          className="px-3 py-2 h-10 border-2 border-secondary rounded-[20px] mt-1 "
                          id="descripBreve"
                          name="descripBreve"
                          onChange={onChange}
                          value={formulario.descripBreve}
                          autoComplete="off"
                        ></textarea>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:gap-8 mt-5">
                      <div className="grid grid-cols-1">
                        <label
                          className="uppercase text-sm text-black font-bold md:text-sm text-light"
                          htmlFor="descripcion"
                        >
                          Descripcion
                        </label>
                        <textarea
                          className="px-3 py-2 h-10  border-2 border-secondary rounded-[20px] mt-1  min-h-[150px]"
                          id="descripcion"
                          name="descripcion"
                          value={formulario.descripcion}
                          onChange={onChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-start md:gap-8 gap-4 pt-4">
                <div className="flex items-center justify-between w-full max-w-xs ">
                  <div
                    className={`uppercase h-10  px-4 text-sm
                    font-bold text-light rounded-[20px]
                   md:text-sm flex items-center justify-between gap-4
                   w-full shadow ${
                     formulario.visible === 0
                       ? 'bg-green-500 text-white'
                       : 'bg-red-400 text-white'
                   }`}
                    onClick={(ev) => infoUser(ev, 'prodVisible', 1)}
                    aria-hidden
                  >
                    <div
                      aria-hidden
                      className="h-full w-full flex items-center cursor-pointer justify-center"
                    >
                      {formulario.visible === 0 ? (
                        <span>Producto Visible</span>
                      ) : (
                        <span>Producto Oculto</span>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <Link
                    onClick={(e) => closeModal(e)}
                    className="bg-secondary text-white shadow py-1 uppercase h-10  px-14 text-sm
                    font-bold text-light rounded-[20px]
                   md:text-sm flex items-center justify-between"
                    href={'/admin?s=productos'}
                  >
                    Volver
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </article>
      </ModalView>
    </>
  );
};

export default UpdateProducto;
