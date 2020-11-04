import API from 'api';
import { toast } from 'react-toastify';
import moment from 'moment';
import { getAccessToken } from './auth.service';

const CURR_MONTH_AND_YEAR = {
  month: moment().month(),
  year: moment().year()
};

// CARE TAKER

export const fetchTotalNumberOfPetDaysForCareTakerThisMonth = async () => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post(
      '/pet/caretaker/fetchpetdays',
      CURR_MONTH_AND_YEAR,
      accessToken
    );
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};

export const fetchCareTakerExpectedSalary = async () => {
  try {
    const accessToken = getAccessToken();
    const data = await API.get(
      '/pet/caretaker/salary/fetchexpected',
      {},
      accessToken
    );
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};

// ADMIN

export const fetchMonthWithHighestJobs = async () => {
  try {
    const accessToken = getAccessToken();
    const data = await API.get('/pet/admin/month/fetchjobs', {}, accessToken);
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};

export const fetchTotalNumOfUniquePetsTakenCareOf = async () => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post('/pet/admin/month/fetchpet', {}, accessToken);
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};

export const fetchCareTakerTotalSalary = async () => {
  try {
    const accessToken = getAccessToken();
    const data = await API.post(
      '/pet/caretaker/salary/fetchtotal',
      CURR_MONTH_AND_YEAR,
      accessToken
    );
    return data;
  } catch (error) {
    toast.error('Something Went Wrong');
    throw new Error(error.detail);
  }
};
