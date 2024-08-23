import axios from './axios';

const getRecipients = async () => {
  const response = await axios.get('/9-3/recipients/');
  console.log(response.data);
  return response.data;
};

export { getRecipients };
