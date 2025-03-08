import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { isLoggedIn } from 'services/auth.service';
import { useGetProfileQuery } from 'store/api/profile/profileApi';
import { setAuth } from 'store/authSlice';
import { selectRefresh } from 'store/refreshSlice';
import LoadingPage from 'ui-component/LoadingPage';
import Login from 'views/login';

const PrivateRoute = () => {
  const refresh = useSelector(selectRefresh);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { data: profileData, isLoading } = useGetProfileQuery(
    { isLogin },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    setIsLogin(isLoggedIn());
    setLoading(false);
    dispatch(setAuth(profileData?.data || null));
  }, [refresh, profileData?.data, dispatch]);

  if (loading || (isLogin && isLoading)) {
    return <LoadingPage />;
  }

  return isLogin ? <Outlet /> : <Login />;
};

export default PrivateRoute;
