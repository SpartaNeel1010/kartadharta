import { useContext } from 'react';

import { AuthContext } from '../context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const { checkLogin } = useContext(AuthContext);
  //   console.log(checkLogin())
  
  if (!checkLogin()) {
    return <Navigate to={`/login`} />;
  }

  return children;
};