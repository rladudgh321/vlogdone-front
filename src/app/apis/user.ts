import { backUrl } from '@/app/config'; //http://localhost:3065
import axios from 'axios';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export async function signupAPI(data: {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  gender: string;
}) {
  const response = await axios.post('/auth/signup', data);
  return response.data;
}

export async function logInAPI(data: { email: string; password: string }) {
  try {
    const response = await axios.post('/auth/signin', data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function logOutAPI() {
  const response = await axios.post('/auth/logout');
  return response.data;
}

export async function isLoggedInAPI() {
  const response = await axios.post('/auth/isLoggedIn');
  return response.data;
}

export async function getUserIdAPI(data: any) {
  try {
    const headers = {
      Authorization: `Bearer ${data.token}`,
    };
    const response = await axios.get('/user/findOne', {
      headers: data.token ? headers : { Authorization: null },
    });
    return response.data;
  } catch (err) {
    console.error('getUserIdAPI', err);
  }
}
