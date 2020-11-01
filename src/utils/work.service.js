import API from 'api';
import { toast } from 'react-toastify';
import { getAccessToken } from './auth.service';

export const getCareTakerRole = async payload => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post('/pet/caretaker/fetch', payload, accessToken);
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};

export const createCareTakerType = async payload => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post(
      '/user/caretaker/type/create',
      payload,
      accessToken
    );
    toast.success('Created Successfully');
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};

export const deleteCareTakerType = async payload => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post(
      '/user/caretaker/type/delete',
      payload,
      accessToken
    );
    toast.success('Deleted Successfully');
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};