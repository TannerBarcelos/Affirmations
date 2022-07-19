import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAffirmations,
  metaSelector,
  reset,
  selectAffirmations,
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

  const { isError, isLoading, message } = useSelector(metaSelector);

  const affirmationIds = useSelector(selectAffirmations);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!user) {
      navigate('/login');
    }

    dispatch(getAffirmations());

    return () => {
      dispatch(reset());
    };
  }, [isError, message]);

  const renderAffirmations = () => {
    /**
     * Note the use of mapping over the IDs. Since we are using normalized state
     * for one, we want to get all the IDs of our entities and use that as the means of mapping.
     * From there, we can use another selector 'selectById' or as I renamed it 'selectAffirmationById'
     * which will look at the entities with the supplied ID and give that result back. THis is how we improve
     * efficiency but also use normalized state.
     *
     * Also, mapping over IDs regardless and rendering a separate component that takes that ID and does a lookup
     * is far better than just rendering in the map or passing a whole payload in the map to a sub component. The true reasons
     * can be seen here - https://redux.js.org/tutorials/fundamentals/part-5-ui-react#selecting-data-in-list-items-by-id
     *
     * For all future projects Normalized state, memoized selectors and mapping over IDs and getting items by IDs via getSelectors() should be used
     */
    return affirmationIds.map((id) => (
      <AffirmationItem
        key={id}
        affirmationId={id}
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
