import axios from 'axios';
const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:8000/api'
    : 'https://59b0e017ffff010011b4ef5c.mockapi.io/api';

const action = name => `myfootyteam18/auth/${name}`;

export const AUTH_USER = action('AUTH_USER');
export const UNAUTH_USER = action('UNAUTH_USER');
export const LOGIN_REQUEST = action('LOGIN_REQUEST');
export const LOGIN_FAILURE = action('LOGIN_FAILURE');

export const authUser = user => ({ type: AUTH_USER, user });
export const unAuthUser = () => ({ type: UNAUTH_USER });

export const loginRequest = user => ({ type: LOGIN_REQUEST, user });
export const loginFail = error => ({ type: LOGIN_FAILURE, error });

const initialState = {
  error: '',
  message: '',
  content: '',
  authenticated: false,
  user: null,
  uploading: false
};

const auth = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case AUTH_USER:
      return { error: '', message: '', authenticated: true, user: action.user };
    default:
      return state;
  }
};

export default auth;

export const submitLoginRequest = data => {
  console.log(data);
  return dispatch => {
    const body = JSON.stringify(data);
    console.log(body);
    return axios({
      method: 'post',
      url: `${baseUrl}/login`,
      data: body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        const user = response.data; // ????
        dispatch(authUser(user));
      })
      .catch(error => {
        console.log(error.response);
      });
  };
};
