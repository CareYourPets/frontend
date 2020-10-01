import API from '../api';

export const login = async (email, password, role) => {
  try {
    var { accessToken } = await API.post('/user/login', {
      email,
      password,
      role
    });
    window.localStorage.setItem('accessToken', accessToken);
    return;
  } catch (error) {
    throw new Error(error);
  }
};

export const logout = () => {
  localStorage.removeItem('accessToken');
};

export const createUser = async (
  firstName,
  lastName,
  email,
  password,
  role
) => {
  try {
    var { accessToken } = await API.post('/user/create', {
      firstName,
      lastName,
      email,
      password,
      role
    });
    window.localStorage.setItem('accessToken', accessToken);
    return;
  } catch (error) {
    throw new Error(error.detail);
  }
};
