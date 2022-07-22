import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moodIcons from '../../assets/icons/moodIcons';
import {
  selectAffirmationsMetadata,
  updateAffirmation,
} from '../../features/affirmations/affirmationSlice';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

const EditAffirmationModal = ({
  editableAffirmation,
  isOpen,
  onRequestClose,
  contentLabel,
}) => {
  const { id, affirmation, startMood } = editableAffirmation;

  const [newAffirmation, setNewAffirmation] = useState(affirmation);
  const [oldMood] = useState(startMood);
  const [newMood, setNewMood] = useState('');

  const dispatch = useDispatch();
  const { isError, isSuccess, message } = useSelector(
    selectAffirmationsMetadata,
  );

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement(document.getElementById('root'));

  const onSubmit = (e) => {
    e.preventDefault();

    if (!newAffirmation.length > 0 || !newMood.length > 0) {
      toast.error('You must enter an affirmation and a mood');
      return;
    }

    const affirmationPayload = {
      id,
      affirmation: newAffirmation,
      endMood: newMood,
    };

    dispatch(updateAffirmation(affirmationPayload));

    if (isSuccess) {
      toast.success('Affirmation Edited!');
      onRequestClose(!isOpen);
    }

    if (isError) {
      toast.error('Something went wrong ' + message);
    }

    setNewAffirmation('');
    setNewMood('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose()}
      contentLabel={contentLabel}
      style={customStyles}
    >
      <section className='form affirmation-form'>
        <h2 className='affirmation-cta'>Edit Affirmation</h2>
        <form onSubmit={onSubmit}>
          <div className='form-group affirmation-box'>
            <input
              type='text'
              name='affirmation'
              id='affirmation-input'
              value={newAffirmation}
              placeholder='Edit affirmation'
              onChange={(e) => setNewAffirmation(e.target.value)}
            />
          </div>
          <h3 className='mood-cta'>Select Your End Mood</h3>
          <div className='form-group mood-box'>
            {Object.entries(moodIcons).map(([key, mood]) => {
              return (
                <i
                  key={key}
                  className={`${key} ${mood} mood-icon`}
                  onClick={(e) => setNewMood(e.target.classList[0])}
                ></i>
              );
            })}
          </div>
          <div className='form-group'>
            <button type='submit' className='btn'>
              Update
            </button>
            {oldMood && (
              <span
                className='prompt'
                style={{ display: 'block', paddingTop: '1rem' }}
              >
                Your starting mood was {oldMood}
              </span>
            )}
          </div>
        </form>
      </section>
    </Modal>
  );
};
export default EditAffirmationModal;
