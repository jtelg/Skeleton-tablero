import '../../styles/globals.css';
import { wrapper } from '../redux/store';
import Session from '../components/client/userSession';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  pageProps.phone = '54 9 353 6 570 880';
  pageProps.appName = 'Patio Chino';
  pageProps.addres = 'Bv Carcano 469';

  return (
    <Session comp={Component}>
      <Component {...pageProps} />

      <ToastContainer
        position="bottom-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="colored"
        draggable
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </Session>
  );
}

export default wrapper.withRedux(MyApp);
