import API from 'api';
import { toast } from 'react-toastify';
import { getAccessToken } from './auth.service';

export const fetchCareTakers = async filters => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post(
      '/pet/caretaker/fetchall',
      filters,
      accessToken
    );
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};
