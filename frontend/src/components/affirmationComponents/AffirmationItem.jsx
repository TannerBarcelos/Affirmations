import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moodIcons from '../../assets/icons/moodIcons';
import affirmationImages from '../../assets/images/affirmationImages';
import {
  deleteAffirmation,
  selectAffirmationById,
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
  const aff = useSelector((state) =>
    selectAffirmationById(state, affirmationId),
  );

  const { _id, affirmation, startMood, endMood, createdAt, updatedAt } = aff;

  const moodIcon = moodIcons[startMood];
  return (
    <div className='affirmation-card'>
      <div className='image'>
        <img
          src={
            endMood ? affirmationImages[endMood] : affirmationImages[startMood]
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
              <i
                className={`${moodIcon} end-mood-icon ${startMood}`}
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
          onClick={(e) => dispatch(deleteAffirmation(_id))}
        ></i>
        <i
          className='fa-solid fa-pen-to-square'
          title='Update this Affirmation'
          onClick={(e) => {
            setModalIsOpen(!isOpen);
            editable(aff);
          }}
        ></i>
        <span
          style={{ position: 'absolute', right: '1rem', fontSize: '.7rem' }}
          title='Affirmation created'
        >
          Created {generateDate(createdAt)}
        </span>
      </div>
    </div>
  );
};
