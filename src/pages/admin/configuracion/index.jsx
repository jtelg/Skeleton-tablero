import TablesConfig from '../../../components/admin/configs';
import Head from 'next/head';
import InputsVar from '../../../components/admin/configs/inputsVars';
import { useEffect, useState } from 'react';

const Configs = (props) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(`Configuraciones | ${props.appName}`);
  }, [props.appName]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Tablero de edicion de variables" />
        <link rel="icon" href="/media/logoPatio.png" />
      </Head>
      <>
        <div className="w-full mt-4 pb-10">
          <InputsVar {...props} />
          <div className="mt-4">
            <TablesConfig />
          </div>
        </div>
      </>
    </>
  );
};

Configs.auth = {
  role: 'Admin'
};

export default Configs;
