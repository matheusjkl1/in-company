import React, { useState } from 'react';
import axios from 'axios';
import AppContext from './AppContext';
import { useHistory } from 'react-router-dom';

function Provider({ children }) {
  const [certified, setCertified] = useState([]);
  const [certifiedById, setCertifiedById] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(null)
  const [certifiedData, setCertifiedData] = useState({
    name: '', descript: '', file: '', hours: ''
  });

  const router = useHistory();

  const setUserInLocalStorage = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
  };

  const getLocalStorageUser = () => {
    if (!localStorage.getItem('user')) {
      router.push('/');
    } else {
      const { token, name, registrationNumber, role } = JSON.parse(localStorage.getItem('user'));
      return {
        token,
        name,
        registrationNumber,
        role,
      }
    }
  };

  const signIn = async ({ registrationNumber, password }) => {
    try {
      const response = await axios.post('http://localhost:3001/login', { registrationNumber, password });
      setUserInLocalStorage(response.data);
      if (response.data.role === 'admin') {
        router.push('admin/certified');
      }
      router.push('certified');
    } catch (error) {
      setNotFound(error)
    }
  };

  const registerCertified = async (data, token) => {
    try {
      const response = await axios.post('http://localhost:3001/certified', data, {
          headers: {
            authorization: token,
          },
        }
      );
      router.push(`/certified/${response.data.insertedId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const getCertifiedByNumberRegister = async (token) => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:3001/certified',{
        headers: { authorization: token }
      });
      setCertified(response.data);
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
      setCertified([])
    }
  };

  const getCertifiedDetailsById = async (id, token) => {
    try {
      const response = await axios.get(`http://localhost:3001/certified/${id}`, {
        headers: { authorization: token },
      });
      const { certifiedName, certifiedDescript, certifiedImage, hours} = response.data
      setCertifiedData({ name: certifiedName, descript: certifiedDescript, file: certifiedImage, hours: hours })
      setCertifiedById(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCertified = async (token) => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:3001/admin/certified',{
        headers: { authorization: token }
      });
      setCertified(response.data);
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
      setCertified([])
    }
  };

  const updateCertified = async (id, token, data) => {
    try {
        await axios.put(`http://localhost:3001/certified/${id}`, data, {
          headers: {
            authorization: token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateCertifiedStatus = async (id, token, data) => {
    try {
        await axios.put(`http://localhost:3001/admin/certified/${id}`, {status: data }, {
          headers: {
            authorization: token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCertified = async (id, token) => {
    try {
      await axios.delete(`http://localhost:3001/certified/${id}`, {
        headers: {
          authorization: token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  const contextValue = {
    signIn,
    router,
    getLocalStorageUser,
    getCertifiedByNumberRegister,
    certified,
    registerCertified,
    getCertifiedDetailsById,
    user,
    setUser,
    loading,
    updateCertified,
    certifiedById,
    certifiedData,
    setCertifiedData,
    getAllCertified,
    notFound,
    updateCertifiedStatus,
    deleteCertified,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

export default Provider;