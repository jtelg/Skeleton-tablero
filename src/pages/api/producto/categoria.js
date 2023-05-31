import { conexionDB } from '../../../config/db';

export default async function handler(req, res) {
  return new Promise((resolve) => {
    let sql = '';
    switch (req.method) {
      case 'POST':
        switch (req.query.path) {
          case 'ADD_CATEG':
            sql = `INSERT INTO categoria (nombre) VALUES ('${req.body}')`;
            break;
          case 'ADD_SUBCATEG':
            sql = `INSERT INTO subcateg (nombre,idcateg) VALUES ('${req.body.nombre}','${req.body.idcateg}')`;
            break;
          case 'ADD_MARCA':
            sql = `INSERT INTO marca (create_time,nombre) VALUES (NOW(),'${req.body.nombre}')`;
            break;
        }
        APPLY_GET(sql, res, resolve);
        return;
      case 'GET':
        switch (req.query.path) {
          case 'CATEGORIA_GET_LIST':
            sql = `CALL SP_categoria_get_list()`;
            break;
          case 'MARCA_GET_LIST':
            sql = `CALL SP_marca_get_xcateg('${req.query.idcateg}')`;
            break;
          case 'MARCA_GET_TODOLIST':
            sql = `CALL SP_marca_get_todolist()`;
            break;
          case 'SUBCATEG_GET_XID':
            sql = `CALL SP_subcateg_get_xid('${req.query.idcateg}')`;
            break;
        }
        APPLY_GET(sql, res, resolve);
        return;
      case 'PUT':
        switch (req.query.path) {
          case 'UPD_CATEG':
            sql = `
                UPDATE categoria c
              set
                  c.nombre = '${req.body.valor}'
              WHERE c.idcateg = '${req.body.id}';`;
            break;
          case 'UPD_SUBCATEG':
            sql = `
                  UPDATE subcateg sc
                set
                    sc.nombre = '${req.body.valor}'
                WHERE sc.idsubc = '${req.body.id}';`;
            break;
          case 'UPD_MARCA':
            sql = `
                  UPDATE marca m
                set
                    m.nombre = '${req.body.valor}'
                WHERE m.idmarca = '${req.body.id}';`;
            break;
          case 'UPDATE_VISIBLE':
            sql = `
                  UPDATE categoria c
                set
                    c.visible = '${req.body.valor}'
                WHERE c.idcateg = '${req.body.id}';`;
            APPLY_GET_NEW(sql, res, resolve);
            return;
        }
        APPLY_GET(sql, res, resolve);
        return;
      case 'DELETE':
        switch (req.query.path) {
          case 'DELETE_CATEG':
            sql = `DELETE FROM categoria WHERE idcateg = '${req.body}'`;
            break;
          case 'DELETE_SUBCATEG':
            sql = `DELETE FROM subcateg WHERE idsubc = '${req.body}'`;
            break;
          case 'DELETE_MARCA':
            sql = `DELETE FROM marca WHERE idmarca = '${req.body}'`;
            break;
        }
        APPLY_GET(sql, res, resolve);
        return;
    }
    res.status(405).end();
    return resolve();
  });
}

const APPLY_GET = async (sql, res, resolve) => {
  try {
    const [result] = await conexionDB.query(sql);
    res.write(JSON.stringify(result[0]));
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).end();
    return resolve();
  }
};

const APPLY_GET_NEW = async (sql, res, resolve) => {
  try {
    const [result] = await conexionDB.query(sql);
    res.write(JSON.stringify(result));
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).end();
    return resolve();
  }
};
