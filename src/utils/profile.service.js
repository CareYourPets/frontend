import API from 'api';
import { toast } from 'react-toastify';
import { getAccessToken } from './auth.service';

export const fetchUserInfo = async () => {
  try {
    const accessToken = getAccessToken();
    const data = await API.get('/user/info', {}, accessToken);
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};

export const updatePetOwnerInfo = async profileInfo => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post(
      '/user/update/petowner',
      profileInfo,
      accessToken
    );
    toast.success('Update Successfully');
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};
