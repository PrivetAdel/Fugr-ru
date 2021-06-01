import axios from 'axios';

export const getApiResource = async (url) => {
  try {
    const res = await axios(url);

    if (res.statusText !== 'OK') {
      console.error('Could not fetch.', res.status);
    }
    
    return await res.data;

  } catch (error) {
    console.error('Could not fetch.', error.message);
  }
};