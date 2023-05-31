import { conexionDB } from '../config/db';

const ctrlCaja = {
  CAJA_ADD: async (req, res, resolve) => {
    await conexionDB.query("SET time_zone = '-03:00';");
    const sqlCaja = `
      INSERT INTO caja (feccarga) VALUES (NOW());
    `;
    try {
      const [result] = await conexionDB.query(sqlCaja);
      const idcaja = result.insertId;
      res.write(JSON.stringify(result));
      ctrlCaja.CAJACIERRE_ADD(req, res, resolve, idcaja);
      return;
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  },
  CAJACIERRE_ADD: async (req, res, resolve, idcaja) => {
    const { iduser, comentario } = req.body;
    const sqlCajaCierre = `
    INSERT INTO cajacierre (feccarga, estado, idcaja, iduser, comentario) 
                    VALUES (NOW(), 'Cerrada', ${idcaja}, '${iduser}', '${comentario}');
  `;
    try {
      await conexionDB.query(sqlCajaCierre);
      ctrlCaja.CAJAXVENTA_ADD(req, res, resolve, idcaja);
      ctrlCaja.EGRESOXCAJA_UPD(req, res, resolve, idcaja);
      return;
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  },
  CAJAXVENTA_ADD: async (req, res, resolve, idcaja) => {
    const { arrVentas } = req.body;
    const string = arrVentas
      .map((venta) => `('${idcaja}', '${venta.idventa}')`)
      .join(',');
    const sqlCajaxVenta = `INSERT INTO cajaxventa (idcaja, idventa) VALUES ${string};
  `;
    try {
      const [result] = await conexionDB.query(sqlCajaxVenta);
      res.write(JSON.stringify(result));
      return;
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  },
  CAJA_GET_TODO: async (req, res, resolve) => {
    const sqlApply = `CALL SP_caja_get_todo()`;
    try {
      // const [resultTime] = await conexionDB.query(sqltime);
      const [result] = await conexionDB.query(sqlApply);
      let re = [];
      if (result[0]) re = result[0];
      res.write(JSON.stringify(re));
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  },
  GET_REPORTE_XID: async (req, res, resolve) => {
    const { idcaja } = req.query;
    const sqlApply = `CALL SP_caja_reporte_xid(${idcaja})`;
    try {
      // const [resultTime] = await conexionDB.query(sqltime);
      const [result] = await conexionDB.query(sqlApply);
      res.write(JSON.stringify(result[0]));
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  },
  EGRESO_ADD: async (req, res, resolve) => {
    await conexionDB.query("SET time_zone = '-03:00';");
    const sqlEgreso = `
      INSERT INTO egreso (tipo, monto, numFactura, descripcion, fechaIngreso, fechaUso, idcaja) VALUES 
      ('${req.body.tipo}', '${req.body.monto}', '${req.body.numFactura}', '${req.body.descripcion}', NOW(), '${req.body.fechaUso}', '${req.body.idcaja}');
    `;
    try {
      const [result] = await conexionDB.query(sqlEgreso);
      res.write(JSON.stringify(result));
      return;
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  },
  EGRESOXCAJA_UPD: async (req, res, resolve, idcaja) => {
    const { arrEgresos } = req.body;

    try {
      for (const egreso of arrEgresos) {
        const sqlUpdEgreso = `UPDATE egreso SET idcaja = '${idcaja}' WHERE idegreso = ${egreso.idegreso};`;
        await conexionDB.query(sqlUpdEgreso);
      }
      res.write(JSON.stringify(true));
      res.end();
      return;
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  },
  EGRESO_GET_XCAJA: async (req, res, resolve) => {
    const { idcaja } = req.query;
    const sqlApply = `SELECT e.*, e.idegreso as id FROM egreso e WHERE e.idcaja = ${idcaja}`;
    try {
      const [result] = await conexionDB.query(sqlApply);
      res.write(JSON.stringify(result));
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  }
};

export default ctrlCaja;
