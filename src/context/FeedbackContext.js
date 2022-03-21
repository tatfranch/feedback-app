import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  //Fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch(
      'https://feedback-app-backend-v1.herokuapp.com/getFeedback',
      { method: 'GET' }
    );

    const data = await response.json();

    setFeedback(data);
    setIsLoading(false);
  };

  // Add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch(
      'https://feedback-app-backend-v1.herokuapp.com/createFeedback',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFeedback),
      }
    );

    const data = await response.json();

    setFeedback([data, ...feedback]);
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(
        'https://feedback-app-backend-v1.herokuapp.com/deleteFeedback',
        { method: 'DELETE' }
      );

      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // Update feedback feedback data
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(
      'https://feedback-app-backend-v1.herokuapp.com/updateFeedback',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updItem),
      }
    );

    const data = await response.json();

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  //Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
