import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moodIcons from '../../assets/icons/moodIcons';
import affirmationImages from '../../assets/images/affirmationImages';
import {
  deleteAffirmation,
  selectEntityById,
} from '../../features/affirmations/affirmationSlice';
import { generateDate } from '../../utils/helpers';

export const AffirmationItem = ({
  affirmationId,
  setModalIsOpen,
  isOpen,
  editable,
}) => {
  const dispatch = useDispatch();

  // Get this affirmation from the entities object in our affirmations state
  const affirmation = useSelector((state) =>
    selectEntityById(state, affirmationId),
  );

  const moodIcon = moodIcons[affirmation.startMood];
  return (
    <div className='affirmation-card'>
      <div className='image'>
        <img
          src={
            endMood
              ? affirmationImages[affirmation.endMood]
              : affirmationImages[affirmation.startMood]
          }
          alt='mood-image'
        />
      </div>
      <div className='affirmation'>
        <h4 className='affirmation-text'>{affirmation.affirmation}</h4>
        <div className='affirmation-moods'>
          <i
            className={`${moodIcon} start-mood-icon ${affirmation.startMood}`}
            title='Affirmations starting mood'
          ></i>
          {endMood ? (
            <>
              <i
                className={`${moodIcon} end-mood-icon ${affirmation.startMood}`}
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
