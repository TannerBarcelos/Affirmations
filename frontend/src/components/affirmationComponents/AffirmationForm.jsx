import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moodIcons from '../../assets/icons/moodIcons';

const AffirmationForm = () => {
  const [affirmation, setAffirmation] = useState('');
  const [currentMood, setCurrentMood] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = { affirmation, currentMood };
    console.log(payload);
  };

  return (
    <section className='form affirmation-form'>
      <h2>Create Your Affirmation</h2>
      <form onSubmit={onSubmit}>
        <div className='form-group affirmation-box'>
          <input
            type='text'
            name='affirmation'
            id='affirmation'
            value={affirmation}
            placeholder='Enter your affirmation'
            onChange={(e) => setAffirmation(e.target.value)}
          />
        </div>
        <h3>Select Your Current Mood</h3>
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
