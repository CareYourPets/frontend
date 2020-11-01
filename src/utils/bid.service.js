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

export const createBid = async bidInfo => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post('/bid/create', bidInfo, accessToken);
    toast.success('Create Successfully');
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};

export const fetchBids = async () => {
  try {
    const accessToken = getAccessToken();
    const { response: data } = await API.get('/bid/info', {}, accessToken);
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};

export const updateBid = async bidInfo => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post('/bid/update', bidInfo, accessToken);
    toast.success('Updated Successfully');
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};

export const deleteBid = async bidInfo => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post('/bid/delete', bidInfo, accessToken);
    toast.success('Deleted Successfully');
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};
