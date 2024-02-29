import '@/styles/bootstrap.scss';
import '@/styles/globals.scss';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import * as Types from '../store/actions/types';
import { getCookie } from '../utils/auth';

import { wrapper, store } from "../store/index";

const theme = extendTheme({
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
});

const token = getCookie('token');
if (token) {
  let decode = jwtDecode(token);
  store.dispatch({
    type: Types.SET_USER,
    payload: {
      isAuth: true,
      isTeacher: decode.data.type=="Teacher"?true:false,
      isStudent: decode.data.type=="Student"?true:false,
      user: decode.data,
    },
  });
  setAuthToken(token);
} else {
  store.dispatch({
    type: Types.SET_USER,
    payload: {
      isAuth: false,
      isTeacher:false,
      isStudent:false,
      user: {},
    },
  });
}
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
         <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
