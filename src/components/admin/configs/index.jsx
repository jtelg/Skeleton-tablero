import { useState } from 'react';
import Categorias from './categorias';
import Marcas from './marcas';
const TablesConfig = () => {
  const [sub_categ, setSub_categ] = useState([]);
  const [categ, setCateg] = useState([]);
  const [select, setSelect] = useState(1);

  return (
    <>
      <div className="lg:w-[50%] w-full flex justify-around gap-4 px-4 pt-6 Outfit">
        <div className="w-full h-full">
          <div
            className={`border-2 border-secondary py-3 ${
              select === 1 ? 'bg-secondary' : 'bg-white'
            } transition-all h-full flex items-center px-3  shadow-sm rounded-[20px] cursor-pointer justify-center`}
            onClick={() => setSelect(1)}
            role="button"
            aria-hidden
          >
            <div className="mx-5">
              <div
                className={`uppercase font-bold tracking-tighter text-sm ${
                  select === 1 ? 'text-white ' : 'text-black'
                }`}
              >
                Categorias
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full">
          <div
            className={`border-2 border-secondary py-3 ${
              select === 2 ? 'bg-secondary' : 'bg-white'
            } transition-all h-full flex items-center px-3  shadow-sm rounded-[20px] cursor-pointer justify-center `}
            onClick={() => setSelect(2)}
            role="button"
            aria-hidden
          >
            <div className="mx-5">
              <div
                className={`uppercase font-bold tracking-tighter text-sm text-center ${
                  select === 2 ? 'text-gray-100' : 'text-gray-700'
                }`}
              >
                Marcas
              </div>
            </div>
          </div>
        </div>
      </div>
      {select === 1 ? (
        <div className="flex lg:flex-row flex-col lg:gap-0 gap-8 w-full justify-around mt-7 px-4">
          <Categorias />
        </div>
      ) : (
        <Marcas
          setSub_categ={setSub_categ}
          sub_categ={sub_categ}
          setCateg={setCateg}
          categ={categ}
        />
      )}
    </>
  );
};

export default TablesConfig;
