import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { isLoggedIn } from 'services/auth.service';
import { selectRefresh } from 'store/refreshSlice';
import LoadingPage from 'ui-component/LoadingPage';
import Login from 'views/login';

const PrivateRoute = () => {
  const refresh = useSelector(selectRefresh);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsLogin(isLoggedIn());
    setLoading(false);
  }, [refresh]);

  if (loading) {
    return <LoadingPage />;
  }

  return isLogin ? <Outlet /> : <Login />;
};

export default PrivateRoute;
