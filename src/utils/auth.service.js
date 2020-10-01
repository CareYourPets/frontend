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
