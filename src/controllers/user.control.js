// import { getSession } from 'next-auth/react';
import { conexionDB } from '../config/db';

const ctrlUser = {
  SAVE_USER: async (req, res, resolve) => {
    const sql = `
    INSERT INTO
    usuario (
      role,
      nombre,
      apellido,
      pass,
      image,
      tipodoc,
      numdoc,
      telefono,
      email,
      fecregistro,
      recibe_oferta,
      tipo_cliente
    )
  VALUES
    (
      '${req.body.objUser.role}',
      '${req.body.objUser.nombre}',      
      '${req.body.objUser.apellido}',
      '${req.body.objUser.pass}',
      '${req.body.objUser.image}',
      '${req.body.objUser.tipodoc}',
      '${req.body.objUser.numdoc}',
      '${req.body.objUser.telefono}',
      '${req.body.objUser.email}',
      '${req.body.objUser.fecregistro}',
      '${req.body.objUser.recibe_oferta}',
      '${req.body.objUser.tipoCliente}'
    )
`;
    const [result] = await conexionDB.query(sql);
    return res.status(200).json({
      nombre: result.nombre,
      email: result.email,
      id: result.insertId,
      role: result.role
    });
  },
  USUARIO_LOGIN: (req, res, resolve) => {
    const { usuario, password } = req.body;
    const sql = `CALL SP_usuario_login('${usuario}', '${password}')`;
    APPLY_GET(sql, res, resolve);
  },
  USUARIO_GET_EMAIL: (req, res, resolve) => {
    const sql = `CALL SP_usuario_get_email('${req.query.email}')`;
    APPLY_GET(sql, res, resolve);
  },
  USUARIO_GET_LIST: async (_, res, resolve) => {
    const sql = `CALL SP_usuario_get_list()`;
    APPLY_GET(sql, res, resolve);
  },
  CATEGSVIEW_GET_COUNT: async (_, res, resolve) => {
    const sql = `CALL SP_categsview_get_counts()`;
    APPLY_GET(sql, res, resolve);
  },
  VARIABLES_GET: async (_, res, resolve) => {
    const sql = `CALL SP_get_variables()`;
    APPLY_GET(sql, res, resolve);
  },
  SP_variables_put: async (req, res, resolve) => {
    const sqlu = `UPDATE 
    variable
    set
      valor = '${req.body.valor}'
    WHERE 
    nombre = '${req.body.nombre}';`;

    try {
      const [result] = await conexionDB.query(sqlu);
      res.write(JSON.stringify(result));
      res.end();
      return;
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  },
  UPD_CLIENTE: async (req, res, resolve) => {
    const sqlu = `UPDATE 
    usuario
    set
    ${req.body.campo}  = '${req.body.valor}'
    WHERE 
    iduser = '${req.body.iduser}';`;

    try {
      const [result] = await conexionDB.query(sqlu);
      res.write(JSON.stringify(result));
      res.end();
      return;
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  }
};

const APPLY_GET = async (sql, res, resolve) => {
  try {
    const [result] = await conexionDB.query(sql);
    res.write(JSON.stringify(result[0]));
    res.end();
    // return;
  } catch (error) {
    console.error(error);
    res.status(500).end();
    return resolve();
  }
};
export default ctrlUser;
