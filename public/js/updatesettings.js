/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert';

// type is either password or data
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updatepassword'
        : '/api/v1/users/updateme';

    // console.log(url);
    const res = await axios.patch(url, data);

    if (res.data.status === 'success')
      showAlert('success', `${type.toUpperCase()} updated successfully`);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
