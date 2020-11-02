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
    toast.success('Updated Successfully');
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};

export const updateCareTakerInfo = async profileInfo => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post(
      '/user/update/caretaker',
      profileInfo,
      accessToken
    );
    toast.success('Updated Successfully');
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};

export const updateAdministratorInfo = async profileInfo => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post('/user/update/admin', profileInfo, accessToken);
    toast.success('Updated Successfully');
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};

export const fetchCareTakerSkills = async () => {
  try {
    const accessToken = getAccessToken();
    const data = await API.get('/user/caretaker/skill/fetch', {}, accessToken);
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};

export const updateCareTakerSkills = async skill => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post(
      '/user/caretaker/skill/update',
      skill,
      accessToken
    );
    toast.success('Updated Successfully');
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};

export const fetchPetCategories = async () => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post(
      '/pet/category/fetch',
      { category: null },
      accessToken
    );
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};

export const createPetCategories = async skill => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post(
      '/user/caretaker/skill/create',
      skill,
      accessToken
    );
    toast.success('Created Successfully');
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};

export const deletePetCategories = async skill => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post(
      '/user/caretaker/skill/delete',
      skill,
      accessToken
    );
    toast.success('Deleted Successfully');
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};
