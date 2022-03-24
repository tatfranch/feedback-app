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
    try {
      const response = await fetch('http://localhost:5000/getFeedback', {
        method: 'GET',
        mode: 'cors',
      });

      const data = await response.json();

      setFeedback(data);

      setIsLoading(false);
    } catch (error) {
      console.log('error!', error);
      setIsLoading(false);
    }
  };

  // Add feedback
  const addFeedback = async (newFeedback) => {
    try {
      const response = await fetch('http://localhost:5000/getFeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(newFeedback),
      });

      const data = await response.json();
      console.log('feedback', newFeedback);

      console.log('data', data);

      setFeedback([data, ...feedback]);
    } catch (error) {
      console.log('error!', error);
    }
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    console.log('id', id);
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`http://localhost:5000/Feedback/${id}`, {
        method: 'DELETE',
        mode: 'cors',
      });

      setFeedback(feedback.filter((item) => item._id !== id));
    }
  };

  // Update feedback feedback data
  const updateFeedback = async (id, updItem) => {
    const response = await fetch('http://localhost:5000/updateFeedback', {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    });

    const data = await response.json();

    setFeedback(
      feedback.map((item) => (item._id === id ? { ...item, ...data } : item))
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
