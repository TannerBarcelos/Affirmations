import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moodIcons from '../../assets/icons/moodIcons';
import affirmationImages from '../../assets/images/affirmationImages';
import {
  deleteAffirmation,
  selectAffirmationEntityById,
} from '../../features/affirmations/affirmationSlice';
import { generateDate } from '../../utils/helpers';

export const AffirmationItem = ({ id, setModalIsOpen, isOpen, editable }) => {
  const dispatch = useDispatch();

  // Get this affirmation from the entities object in our affirmations state using the hook selector generated from getSelectors and aliased as the new name
  const affirmation = useSelector((state) =>
    selectAffirmationEntityById(state, id),
  );

  return (
    <div className='affirmation-card'>
      <div className='image'>
        <img
          src={
            affirmation.endMood
              ? `${affirmationImages[affirmation.endMood]}`
              : `${affirmationImages[affirmation.startMood]}`
          }
          alt='mood-image'
        />
      </div>
      <div className='affirmation'>
        <h4 className='affirmation-text'>{affirmation.affirmation}</h4>
        <div className='affirmation-moods'>
          <i
            className={`${moodIcons[affirmation.startMood]} start-mood-icon ${
              affirmation.startMood
            }`}
            title='Affirmations starting mood'
          ></i>
          {affirmation.endMood ? (
            <>
              <i
                className={`${moodIcons[affirmation.endMood]} end-mood-icon ${
                  affirmation.endMood
                }`}
                title='Affirmations ending mood'
              ></i>
            </>
          ) : null}
        </div>
      </div>
      <div className='update-box'>
        <i
          className='fa-solid fa-trash'
          title='Delete this Affirmation'
          onClick={(e) => dispatch(deleteAffirmation(affirmation.id))}
        ></i>
        <i
          className='fa-solid fa-pen-to-square'
          title='Update this Affirmation'
          onClick={(e) => {
            setModalIsOpen(!isOpen);
            editable(affirmation);
          }}
        ></i>
        <span
          style={{ position: 'absolute', right: '1rem', fontSize: '.7rem' }}
          title='Affirmation created'
        >
          {generateDate(affirmation.createdAt)}
        </span>
      </div>
    </div>
  );
};
