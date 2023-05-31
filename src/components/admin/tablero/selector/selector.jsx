import { useEffect, useState } from 'react';
import ProductoColumnConfig from '../columns/productos';
import { useRouter } from 'next/router';
import selectorColumns from './columnsSelector';

const objCategs = [
  selectorColumns.ordenCol,
  selectorColumns.prodCol,
  selectorColumns.cliCol,
  selectorColumns.configCol
];
const SelectorCategory = (props) => {
  const router = useRouter();
  const [loading, setloading] = useState(true);
  const [categs_muestra, setCategs_muestra] = useState(objCategs);
  const { dataChange } = ProductoColumnConfig(router);

  useEffect(() => {
    fetch('/api/user?path=CATEGSVIEW_GET_COUNT')
      .then((res) => res.json())
      .then((res) => {
        const obj = objCategs;
        obj[0].count = 0;
        obj[1].count = res[0].prod_count;
        obj[2].count = res[0].user_count;
        return setCategs_muestra([...obj]);
      });
  }, [props.arrVentas]);
  useEffect(() => {
    if (!dataChange) return;
    selector(selectorColumns.prodCol);
  }, [dataChange]);

  useEffect(() => {
    setloading(props.loading);
  }, [props.loading]);

  const selector = async (categ) => {
    setloading(true);
    if (categ.ind_use === 3) {
      return router.push(`/admin/configuracion`);
    }
    const selectorcaja = categ.ind_use === 0 ? `&sc=ingresos` : '';
    return router.push(`/admin?s=${categ.text_use}${selectorcaja}`);
  };
  return (
    <>
      <article className="px-4 md:mt-12 mt-[100px] mb-4 w-full">
        <div className="flex md:flex-row flex-col justify-between w-full gap-4 ">
          {categs_muestra.map((categ, index) => (
            <div
              className={`${
                index !== categs_muestra.length - 1
                  ? 'md:w-[30%] w-full h-full'
                  : 'md:w-[10%] w-full'
              }`}
              key={index}
              title={categ.descrip}
              disabled={true}
            >
              <button
                className={`  ${
                  props.obj_use.ind_use === index
                    ? 'border-2 bg-secondary'
                    : 'bg-white'
                }  w-full border-2 transition-all border-secondary h-full flex items-center justify-center px-[1rem] shadow-sm rounded-[1rem] cursor-pointer`}
                onClick={() => selector(categ)}
                disabled={loading || props.obj_use.ind_use === index}
              >
                <div
                  className={`h-12 w-12 flex items-center justify-center rounded-full ${
                    props.obj_use.ind_use === index
                      ? 'text-white'
                      : ' text-secondary '
                  }`}
                >
                  <span className="material-icons text-3xl">{categ.icon}</span>
                </div>
                {categ.text_use && (
                  <div className="mx-2 flex items-center justify-between w-full gap-[1rem]  ">
                    <div
                      className={`uppercase  tracking-tighter text-[15px] font-semibold ${
                        props.obj_use.ind_use === index ||
                        categ.ind_use === 4 ||
                        index === categs_muestra.length - 1
                          ? 'text-white'
                          : 'text-secondary'
                      }`}
                    >
                      {categ.text_use}
                    </div>
                    {categ.ind_use !== 0 &&
                      (loading ? (
                        <i className="bx bx-refresh bx-spin text-xl"></i>
                      ) : (
                        <h4
                          className={`text-[15px] font-bold ${
                            props.obj_use.ind_use === index
                              ? 'text-white '
                              : 'text-secondary'
                          } `}
                        >
                          {categ.count}
                        </h4>
                      ))}
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </article>
    </>
  );
};
export default SelectorCategory;
