import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moodIcons from '../../assets/icons/moodIcons';
import { createAffirmation } from '../../features/affirmations/affirmationSlice';
import { toast } from 'react-toastify';

const AffirmationForm = () => {
  const [affirmation, setAffirmation] = useState('');
  const [currentMood, setCurrentMood] = useState('');

  const dispatch = useDispatch();
  const { isError, isSuccess, message } = useSelector(
    (state) => state.affirmations,
  );

  const onSubmit = (e) => {
    e.preventDefault();

    if (!affirmation.length > 0 || !currentMood.length > 0) {
      toast.error('You must enter an affirmation and a mood');
      return;
    }

    const affirmationPayload = { affirmation, currentMood };
    dispatch(createAffirmation(affirmationPayload)); // dispatch create affirmation

    if (isSuccess) {
      toast.success('Affirmation created!');
    }

    if (isError) {
      toast.error('Something went wrong ' + message);
    }

    setAffirmation('');
    setCurrentMood('');
  };

  return (
    <section className='form affirmation-form'>
      <h2 className='affirmation-cta'>Create Your Affirmation</h2>
      <form onSubmit={onSubmit}>
        <div className='form-group affirmation-box'>
          <input
            autoFocus
            type='text'
            name='affirmation'
            id='affirmation-input'
            value={affirmation}
            placeholder='Enter your affirmation'
            onChange={(e) => setAffirmation(e.target.value)}
          />
        </div>
        <h3 className='mood-cta'>Select Your Current Mood</h3>
        <div className='form-group mood-box'>
          {Object.entries(moodIcons).map(([key, mood]) => {
            return (
              <i
                key={key}
                className={`${key} ${mood} mood-icon`}
                onClick={(e) => setCurrentMood(e.target.classList[0])}
              ></i>
            );
          })}
        </div>
        <div className='form-group'>
          <button type='submit' className='btn'>
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};
export default AffirmationForm;
