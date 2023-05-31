import ctrlCaja from '../../../controllers/caja.control';

export default async function handler(req, res) {
  return new Promise((resolve) => {
    switch (req.method) {
      case 'POST':
        switch (req.query.path) {
          case 'CAJA_ADD':
            return ctrlCaja.CAJA_ADD(req, res, resolve);
          case 'EGRESO_ADD':
            return ctrlCaja.EGRESO_ADD(req, res, resolve);
        }
        break;
      case 'GET':
        switch (req.query.path) {
          case 'CAJA_GET_TODO':
            return ctrlCaja.CAJA_GET_TODO(req, res, resolve);
          case 'GET_REPORTE_XID':
            return ctrlCaja.GET_REPORTE_XID(req, res, resolve);
          case 'EGRESO_GET_XCAJA':
            return ctrlCaja.EGRESO_GET_XCAJA(req, res, resolve);
        }
        break;
    }
    res.status(405).end();
    return resolve();
  });
}
