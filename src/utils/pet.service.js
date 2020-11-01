import API from 'api';
import { toast } from 'react-toastify';
import { getAccessToken } from './auth.service';

export const fetchPets = async () => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post('/pet/fetch', {}, accessToken);
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};

export const updatePetInfo = async petInfo => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post('/pet/update', petInfo, accessToken);
    toast.success('Updated Successfully');
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};
