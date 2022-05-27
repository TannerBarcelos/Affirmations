import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moodIcons from '../assets/icons/moodIcons';
import affirmationImages from '../assets/images/affirmationImages';
import { deleteAffirmation } from '../features/affirmations/affirmationSlice';
import { generateDate } from '../utils/helpers';

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

  const renderAffirmations = () => {
    return affirmations.map((affirm, idx) => {
      const { affirmation, startMood, endMood, createdAt, updatedAt } = affirm;

      const moodIcon = moodIcons[startMood];
      return (
        <div className='affirmation-card' key={idx}>
          <div className='image'>
            <img
              src={
                endMood
                  ? affirmationImages[endMood]
                  : affirmationImages[startMood]
              }
              alt='mood-image'
            />
          </div>
          <div className='affirmation'>
            <h4 className='affirmation-text'>{affirmation}</h4>
            <div className='affirmation-moods'>
              <i
                className={`${moodIcon} start-mood-icon ${startMood}`}
                title='Affirmations starting mood'
              ></i>
              {endMood ? (
                <>
                  {/* Title attribute will give a little visual feedback tooltip on what the icon is */}
                  <i
                    className={`${moodIcon} end-mood-icon ${startMood}`}
                    title='Affirmations ending mood'
                  ></i>
                </>
              ) : null}
            </div>
          </div>
          <div className='update-box'>
            {/* ADD EDIT FUNCTIONALITY IN V2
            <i
              className='fa-solid fa-pen-to-square'
              title='Update this Affirmation'
            ></i> */}
            <i
              className='fa-solid fa-trash'
              title='Delete this Affirmation'
              onClick={(e) =>
                dispatch(deleteAffirmation(affirm))
              } /* pass whole affirmation to the delete action  */
            ></i>
            <span
              style={{ position: 'absolute', right: '1rem' }}
              title='Affirmation created'
            >
              {generateDate(createdAt)}
            </span>
          </div>
        </div>
      );
    });
  };

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
        <section className='dashboard-affirmations-container'>
          {renderAffirmations()}
        </section>
      )}
    </div>
  );
};
export default Dashboard;
