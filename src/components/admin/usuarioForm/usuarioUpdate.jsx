import React, { useState, useEffect } from 'react';
import ModalView from '../../utils/modalView';
import { toast } from 'react-toastify';
import APIConsultas from '../../../services/consultas';

const UsuarioUpdate = (props) => {
  const [timer, setTimer] = useState(null);

  const [formulario, setFormulario] = useState({
    role: '',
    nombre: '',
    apellido: '',
    pass: '',
    image: '',
    tipodoc: '',
    numdoc: '',
    telefono: '',
    email: '',
    fecregistro: '',
    recibe_oferta: 0,
    tipoCliente: ''
  });

  useEffect(() => {
    setFormulario({
      role: props.client.role,
      nombre: props.client.nombre,
      apellido: props.client.apellido,
      pass: props.client.pass,
      image: '',
      tipodoc: 2,
      numdoc: props.client.numdoc,
      telefono: props.client.telefono,
      email: props.client.email,
      fecregistro: null,
      recibe_oferta: 0,
      tipoCliente: props.client.tipo_cliente
    });
  }, [props]);

  const handlerChange = (e) => {
    e.preventDefault();
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
    updateData(e.target.name, e.target.value);
  };

  const updateData = (campo, valor) => {
    clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        const res = await APIConsultas.usuario.UPDATE(
          props.client.iduser,
          campo,
          valor
        );
        if (res) {
          return toast.success(`Dato actualizado!`, {
            autoClose: 1000
          });
        }
        return toast.error(`Error al modificar el campo.`);
      }, 1000)
    );
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    props.close();
    router.push('/admin?s=clientes');
  };

  return (
    <>
      <ModalView
        open={props.open}
        titulo="Editar Cliente"
        close={() => props.close(false)}
      >
        <article className="h-full md:w-[500px]">
          <form onSubmit={handlerSubmit} className="grid grid-cols-2 gap-3">
            <div>
              <label className="flex  font-bold text-[15px]" htmlFor="nombre">
                Nombre
                <abbr title="required" className="text-[#ff0000]">
                  *
                </abbr>
              </label>
              <input
                type="text"
                name="nombre"
                value={formulario.nombre}
                id="nombre"
                onChange={handlerChange}
                className="border border-black h-[40px] rounded-lg w-full p-1"
              />
            </div>
            <div>
              <label className="flex  font-bold text-[15px]" htmlFor="apellido">
                Apellido
                <abbr title="required" className="text-[#ff0000]">
                  *
                </abbr>
              </label>
              <input
                type="text"
                name="apellido"
                value={formulario.apellido}
                id="apellido"
                onChange={handlerChange}
                className="border border-black h-[40px] rounded-lg w-full p-1"
              />
            </div>

            <div>
              <label className="flex   font-bold text-[15px]" htmlFor="numdoc">
                CUIT
                <abbr title="required" className="text-[#ff0000]">
                  *
                </abbr>
              </label>

              <input
                type="number"
                name="numdoc"
                value={formulario.numdoc}
                onChange={handlerChange}
                className="border border-black h-[40px] rounded-lg w-full p-1"
              />
            </div>

            <div>
              <label className="flex   font-bold text-[15px]" htmlFor="email">
                Email
                <abbr title="required" className="text-[#ff0000]">
                  *
                </abbr>
              </label>
              <input
                type="text"
                name="email"
                value={formulario.email}
                onChange={handlerChange}
                className="border border-black h-[40px] rounded-lg w-full p-1"
              />
            </div>

            <input
              type="submit"
              value="Volver"
              className="col-span-2 text-white text-bold bg-green-600 h-[40px] w-1/2 rounded-lg cursor-pointer"
            />
          </form>
        </article>
      </ModalView>
    </>
  );
};

export default UsuarioUpdate;
