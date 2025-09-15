// project imports
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';
import AdminBoard from './AdminBoard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const userData = useSelector(selectAuth);

  if (['super_admin', 'admin'].includes(userData?.role)) {
    return <AdminBoard userData={userData} />;
  }

  return null;
};

export default Dashboard;
