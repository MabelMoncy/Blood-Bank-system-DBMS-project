import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.message) {
      console.error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export const fetchDonors = async (params = {}) => {
  const { data } = await api.get('/donors', { params });
  return data;
};

export const createDonor = async (payload) => {
  const { data } = await api.post('/donors', payload);
  return data;
};

export const updateDonor = async ({ id, ...payload }) => {
  const { data } = await api.patch(`/donors/${id}`, payload);
  return data;
};

export const deleteDonor = async (id) => {
  await api.delete(`/donors/${id}`);
};

export const fetchAcceptors = async (params = {}) => {
  const { data } = await api.get('/acceptors', { params });
  return data;
};

export const createAcceptor = async (payload) => {
  const { data } = await api.post('/acceptors', payload);
  return data;
};

export const fetchMatches = async (params = {}) => {
  const { data } = await api.get('/matching', { params });
  return data;
};

export const fetchStats = async () => {
  const { data } = await api.get('/stats');
  return data;
};

export default api;
