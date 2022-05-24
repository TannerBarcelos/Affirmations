import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAffirmations,
  reset,
} from '../features/affirmations/affirmationSlice';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';

// Component Import
import AffirmationForm from '../components/affirmationComponents/AffirmationForm.jsx';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Pull out global state
  const { user } = useSelector((state) => state.auth);
  const { affirmations, isError, isLoading, message } = useSelector(
    (state) => state.affirmations,
  );

  // If user is not logged in, redirect to login page
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!user) {
      navigate('/login');
    }

    dispatch(getAffirmations());
    // cleanup on un-mount
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  // console.log(affirmations);
  return (
    <div className='container'>
      <section className='dashboard-heading'>
        <h1>Welcome, {user && user.name}</h1>
        <AffirmationForm />
      </section>
      {isLoading ? (
        <div className='loading-affirmations'>
          <ClipLoader />
        </div>
      ) : affirmations.length === 0 ? (
        <div className='no-affirmations'>
          <h4>No Affirmations</h4>
          <p>Go ahead and create one above!</p>
        </div>
      ) : (
        <section className='dashboard-affirmations-container'></section>
      )}
    </div>
  );
};
export default Dashboard;
