import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAffirmations,
  selectAffirmationsMetadata,
  reset,
  selectEntitiesIds,
} from '../features/affirmations/affirmationSlice';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
import AffirmationForm from '../components/affirmationComponents/AffirmationForm.jsx';
import EditAffirmationModal from '../components/affirmationComponents/EditAffirmationModal';
import { AffirmationItem } from '../components/affirmationComponents/AffirmationItem.jsx';
import { userAuth } from '../features/auth/authSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editableAffirmation, setEditableAffirmation] = useState({});

  // Pull out global state
  const auth = useSelector(userAuth);

  const { user } = auth;

  const { isError, isLoading, message } = useSelector(
    selectAffirmationsMetadata,
  );

  const affirmationIds = useSelector(selectEntitiesIds);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!user) {
      navigate('/login');
    }

    dispatch(fetchAffirmations());

    return () => {
      dispatch(reset());
    };
  }, [isError, message]);

  const renderAffirmations = () => {
    // Note the use of mapping over the IDs. Since we are using normalized state - see docs
    return affirmationIds.map((id) => (
      <AffirmationItem
        key={id}
        id={id}
        setModalIsOpen={setModalIsOpen}
        isOpen={modalIsOpen}
        editable={setEditableAffirmation}
      />
    ));
  };

  const closeModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const renderModal = () => {
    return (
      <EditAffirmationModal
        editableAffirmation={editableAffirmation}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={'Edit Affirmation'}
      />
    );
  };

  const renderWelcome = () => {
    const today = new Date();
    const curHr = today.getHours();

    if (curHr < 12) {
      return 'Good Morning';
    } else if (curHr < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  return (
    <div className='container'>
      <section className='dashboard-heading'>
        <h1>{renderWelcome()}</h1>
        <AffirmationForm />
      </section>
      {isLoading ? (
        <div className='loading-affirmations'>
          <ClipLoader />
        </div>
      ) : affirmationIds.length === 0 ? (
        <div className='no-affirmations'>
          <h4>No Affirmations</h4>
          <p>Go ahead and create one above!</p>
        </div>
      ) : (
        <>
          {modalIsOpen && renderModal()}
          <section className='dashboard-affirmations-container'>
            {renderAffirmations()}
          </section>
        </>
      )}
    </div>
  );
};
export default Dashboard;
