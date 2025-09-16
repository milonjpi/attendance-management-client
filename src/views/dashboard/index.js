// project imports
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';
import AdminBoard from './AdminBoard';
import UserBoard from './UserBoard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const userData = useSelector(selectAuth);

  if (['super_admin', 'admin'].includes(userData?.role)) {
    return <AdminBoard userData={userData} />;
  }

  return <UserBoard />;
};

export default Dashboard;
