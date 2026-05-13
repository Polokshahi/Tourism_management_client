import axios from 'axios';
import { useNavigate } from 'react-router'; 
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000/',
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  // 🔐 Request interceptor for attaching token
  axiosSecure.interceptors.request.use(
    async (config) => {
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // ❌ Response error interceptor
  axiosSecure.interceptors.response.use(
    (res) => res,
    (error) => {
      const status = error.response?.status;
      if (status === 403) {
        navigate('/forbidden');
      } else if (status === 401) {
        logOut()
          .then(() => navigate('/login'))
          .catch(() => {});
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
