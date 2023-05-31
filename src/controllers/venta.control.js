import { conexionDB } from '../config/db';
import APIConsultas from '../services/consultas';
const ctrlVenta = {
  VENTA_GET_LIST: async (req, res, resolve) => {
    // const sqltime = `SET time_zone = '-03:00'`;
    const { idcaja } = req.query;
    // 0=todos 1 = no visibles
    const { visible } = req.query;
    const sqlApply = `CALL SP_ventas_get_tablero(${idcaja},${visible})`;
    try {
      // const [resultTime] = await conexionDB.query(sqltime);
      const [result] = await conexionDB.query(sqlApply);
      let data = [];
      if (result[0]) {
        data = result[0];
        // data.forEach((e) => {
        //   e.fecha_tablero = new Date(e.timestamp * 1000).toLocaleTimeString();
        // });
      }
      res.write(JSON.stringify(data));
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  },
  VENTA_GET_XID: async (req, res, resolve) => {
    const sql = `CALL SP_venta_get_xid('${req.query.id}')`;
    try {
      // const [resultTime] = await conexionDB.query(sqltime);
      const [result] = await conexionDB.query(sql);
      res.write(JSON.stringify(result[0]));
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  },
  VENTA_GET_PROD_XID: async (req, res, resolve) => {
    const sql = `CALL SP_venta_get_prod_xid('${req.query.id}')`;
    try {
      // const [resultTime] = await conexionDB.query(sqltime);
      const [result] = await conexionDB.query(sql);
      res.write(JSON.stringify(result[0]));
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  },
  VENTA_ADD: async (req, res, resolve) => {
    await conexionDB.query("SET time_zone = '-03:00';");
    const sql = `INSERT INTO
          venta (
            iduser,
            CP,
            destino_calle,
            destino_nro,
            destino_dpto,
            destino_barrio,
            destino_ciudad,
            entrega,
            otra_persona,
            retira_nombre,
            retira_apellido,
            montototal,
            tipo_pago,
            estado,
            anulado_porque,
            fec_anulado,
            tel_form,
            tipo_alta,
            timestamp,
            fec_carga
          )
        VALUES
          (
            '${req.body.venta.iduser}',
            '${req.body.venta.CP}',
            '${req.body.venta.destino_calle}',
            '${req.body.venta.destino_nro}',
            '${req.body.venta.destino_dpto}',
            '${req.body.venta.destino_barrio}',
            '${req.body.venta.destino_ciudad}',
            '${req.body.venta.entrega}',
            '${req.body.venta.otra_persona}',
            '${req.body.venta.retira_nombre}',
            '${req.body.venta.retira_apellido}',
            '${req.body.venta.montototal}',
            '${req.body.venta.tipo_pago}',
            '${req.body.venta.estado}',
            '${req.body.venta.anulado_porque}',
            '${req.body.venta.fec_anulado}',
            '${req.body.venta.tel_form}',
            '${req.body.venta.tipo_alta}',
            NOW(),
            NOW()
            );`;
    let idventa = '';
    try {
      const [result] = await conexionDB.query(sql);
      idventa = result.insertId;
      res.write(JSON.stringify(result));
      ctrlVenta.ARTXVENTA_ADD(
        req,
        res,
        resolve,
        idventa,
        req.body.venta.seguimiento_idestado
      );
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  },
  ARTXVENTA_ADD: async (req, res, resolve, idventa, idestadoSeg) => {
    let string = '';
    req.body.arrProd.forEach((prod) => {
      string += `('${idventa}', '${prod.idart}', '${null}', '${null}',
       '${prod.precioFinal}', '${prod.cantidadForm}', '${
        prod.comentario || ''
      }','${prod.presentacion}'),`;
    });
    string = string.substring(0, string.length - 1);

    const sqlS = `
        INSERT INTO
          artxventa (idventa, idart, nomcolor, size, precioventa, cantidad, comentario, presentacion)
        VALUES
          ${string};`;
    try {
      await conexionDB.query(sqlS);
      ctrlVenta.SEGUIMIENTO_ADD(req, res, resolve, idventa, idestadoSeg);
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  },
  SEGUIMIENTO_ADD: async (_, res, resolve, idventa, idestadoSeg) => {
    const sqlS = `INSERT INTO seguimiento (idventa, idestado, create_time)
                      VALUES (${idventa}, ${idestadoSeg}, NOW());
                      `;
    try {
      await conexionDB.query(sqlS);
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  },
  UPDATE_ESTADO: async (req, res, resolve) => {
    const sql = `UPDATE venta SET 
                tel_wpp = '${req.body.wppnumber}',
                estado = '${req.body.newEstado}',
                timestamp = '${req.body.timestamp}'
               WHERE idventa = '${req.body.idventa}'`;
    try {
      const [result] = await conexionDB.query(sql);
      res.write(JSON.stringify(result));
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  },
  UPDATE_SEGUIMIENTO: async (req, res, resolve) => {
    const sql = `UPDATE seguimiento SET 
                idestado = '${req.body.idestado}',
                ${req.body.name} = '${req.body.value}'
               WHERE idventa = '${req.body.idventa}'`;
    try {
      const [result] = await conexionDB.query(sql);
      res.write(JSON.stringify(result));
      await APIConsultas.ventas.VENTA_RELOAD();
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  },
  UPDATE_XCAMPO: async (req, res, resolve) => {
    const { campo, valor, idventa } = req.body;
    const sql = `UPDATE venta SET 
                  ${campo} = '${valor}'
                WHERE idventa = '${idventa}'`;
    try {
      const [result] = await conexionDB.query(sql);
      res.write(JSON.stringify(result));
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  }
};
export default ctrlVenta;
