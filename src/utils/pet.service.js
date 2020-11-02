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

export const createPetInfo = async petInfo => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post('/pet/create', petInfo, accessToken);
    toast.success('Created Successfully');
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};

export const deletePetInfo = async petInfo => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post('/pet/delete', petInfo, accessToken);
    toast.success('Deleted Successfully');
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};

export const createPetCategories = async payload => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post('/pet/category/create', payload, accessToken);
    toast.success('Create Successfully');
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};

export const updatePetCategories = async payload => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post('/pet/category/update', payload, accessToken);
    toast.success('Updated Successfully');
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};

export const deletePetCategories = async payload => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post('/pet/category/delete', payload, accessToken);
    toast.success('Deleted Successfully');
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};
