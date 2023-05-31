const ContadorProd = ({ prod, actualizaProd }) => {
  const CountChange = (index) => {
    let count = +prod.cantidadForm;
    if (index === 'resta') {
      count = count === 1 ? 1 : count - 1;
    } else {
      count = count + 1;
    }
    return actualizaProd({
      ...prod,
      cantidadForm: count,
      precioTotal: prod.precioventa * count
    });
  };
  const handleChange = ({ target: { name, value } }) => {
    if (value <= 0 || value === '') {
      value = 1;
    }
    return actualizaProd({
      ...prod,
      [name]: value
    });
  };

  return (
    <>
      <div className="flex items-center">
        <button
          onClick={() => CountChange('resta')}
          className="hover:text-primary-500 transition-all flex items-center justify-center h-6 w-6"
        >
          <span className="material-icons-outlined text-lg">remove</span>
        </button>
        {/* <p className="text-xl">{prod.cantidadForm}</p> */}
        <input
          type="number"
          value={prod.cantidadForm}
          onChange={handleChange}
          name="cantidadForm"
          id="cantidadForm"
          className="w-8 text-center outline-none relative -top-[1px]"
        />
        <button
          onClick={() => CountChange('suma')}
          className="hover:text-primary-500 transition-all flex items-center justify-center h-6 w-6"
        >
          <span className="material-icons-outlined text-lg">add</span>
        </button>
      </div>
    </>
  );
};

export default ContadorProd;
