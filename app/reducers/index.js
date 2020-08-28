import { reducer as formReducer } from 'redux-form';
import login from './login';
import network from './network';

export default {
  login,
  form: formReducer,
  network
};
