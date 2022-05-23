import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Component Import
import AffirmationForm from '../components/affirmationComponents/AffirmationForm';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // If user is not logged in, redirect to login page
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  return (
    <div className='container'>
      <section className='dashboard-heading'>
        <h1>Welcome, {user && user.name}</h1>
        <AffirmationForm />
      </section>
      <section className='dashboard-section'></section>
    </div>
  );
};
export default Dashboard;
