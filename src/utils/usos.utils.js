import axios from 'axios';
import Swal from 'sweetalert2';
const ServUsos = {
  convertUrl: (dato, indice) => {
    console.log(dato);
    if (!dato) return dato;
    if (indice === 'convert')
      return dato.replace(/ /g, '_').toLocaleLowerCase();
    return dato.replace(/_/g, ' ').toLocaleLowerCase();
  },
  parseNumber: (string = '') => {
    let number = +string.replace('.', '').replace(',', '.');
    if (typeof number !== 'number') number = 0;
    return number;
  },
  newDateMysql: () => {
    const dateArg = new Date().toLocaleString('eu-ES', {
      timeZone: 'America/Argentina/Buenos_Aires'
    });
    const date = new Date();
    const year = date.getFullYear();
    const hours = dateArg.split(' ')[1];
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    return `${year}-${month}-${day} ${hours}`;
  },
  sendMail_confirmacioncheckin: (obj) => {
    const msj = `
    <section
    style="
      background-color: #ffffff;
      width: 100%;
      height: 100%;
      padding: .5rem 2rem 1rem 2rem;
      color: #000;
    ">
    <div>
      <article style="padding: 1rem 0rem 1rem 0rem">
        <h2 style="font-size: 22px">
          ¡Mensaje de consulta!
        </h2>
        <h4 style="margin-top: 1rem; font-size: 14px">
          <p margin-bottom: 1px">
              Estás recibiendo este mensaje de ${obj.nombre} 
              <br>
              con el e-mail: ${obj.mail}
              <br>
              y e numero: ${obj.telefono}
              <br>
              <br> 
              Su consulta es: ${obj.mensaje}
          </p>
        </h4>
      </article>
    </div>
  </section>
    `;
    const msjHTML = new DatosSendMsj();
    msjHTML.to = 'felipeballarino97@gmail.com';
    msjHTML.from = obj.mail;
    msjHTML.tema = 'Consulta Patio Chino';
    msjHTML.mensaje = msj;
    axios
      .post(
        'https://api.custer.com.ar/server/mailer.php',
        JSON.stringify(msjHTML)
      )
      .then((resp) => {
        if (resp.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Mensaje enviado !',
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
  },
  SendWhatsapp: (numero, msg) => {
    const isMobile = navigator.userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    );
    if (isMobile) {
      window.location.replace(`whatsapp://send?text=${msg}&phone=549${numero}`);
    } else {
      window.open(`https://wa.me/549${numero}/?text=${msg}`, '_system');
    }

    // window.location.replace(`https://wa.me/549${numero}/?text=${pedido}`);
  }
};
export default ServUsos;

class DatosSendMsj {
  to = ''; // quien recibe el msj
  from = ''; // quien envia el msj
  tema = ''; // titulo del msj
  mensaje = '';
  nombre = ''; // nombre de quien envía el msj
  telefono = ''; // telefono de quien envía el msj
}
