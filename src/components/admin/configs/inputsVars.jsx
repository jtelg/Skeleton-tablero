import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import APIConsultas from '../../../services/consultas';
import Link from 'next/link';

const InputsVar = (props) => {
  const [variablesNew, setVariablesNew] = useState();
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setVariablesNew(await APIConsultas.variables.GET());
    };
    fetchData().catch(console.error);
  }, []);
  const changeForm = (index) => (e) => {
    e.preventDefault();
    const newArr = variablesNew.map((item, i) => {
      if (index === i) {
        return { ...item, valor: e.target.value };
      } else {
        return item;
      }
    });
    setVariablesNew(newArr);
    updateData(e.target.name, e.target.value);
  };
  const updateData = (nombre, valor) => {
    clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        const res = await APIConsultas.variables.UPDATE('valor', nombre, valor);
        setVariablesNew(variablesNew);
        if (res) return toast.success(`Campo actualizado con exito!`);
        return toast.error(`Error al modificar el campo.`);
      }, 800)
    );
  };
  return (
    <>
      <div className="flex  justify-between items-center  md:pt-0 pt-[80px]  px-4 gap-3">
        <div className=" w-full flex  justify-between  py-4 items-start  relative">
          <div className="flex items-center gap-1  relative top-4 sm:top-0">
            <Link href={`/admin`}>
              <i className="bx bx-chevron-left text-3xl font-bold text-primary-500"></i>
            </Link>
            <span className=" tracking-wide text-lg Outfit text-secondary font-bold">
              Volver al tablero
            </span>
          </div>
        </div>
      </div>
      <form className="grid grid-cols-1 gap-4 md:grid-cols-4 w-full p-4 Outfit border-y-2 border-[#DEDBD3]">
        {variablesNew?.map((el, index) => (
          <div key={index} className="grid grid-cols-1 w-full">
            <label title="wpp" className="font-bold ">
              {el.nombre.slice(7)}
            </label>
            <input
              className="px-3 h-10 rounded-[20px] border-2 border-secondary mt-1 "
              type="text"
              name={el.nombre}
              defaultValue={el.valor}
              onChange={changeForm(index)}
            />
          </div>
        ))}
      </form>
    </>
  );
};

export default InputsVar;
