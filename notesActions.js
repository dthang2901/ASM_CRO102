import firestore from '@react-native-firebase/firestore';

export const fetchNotes = (userId) => {
  return (dispatch) => {
    firestore().collection('notes').where('idUser', '==', userId)
      .onSnapshot(snapshot => {
        const notes = snapshot.docs.map(doc => ({
          idNote: doc.id,
          ...doc.data()
        }));
        dispatch({ type: 'SET_NOTES', payload: notes });
      }, error => {
        console.error("Error fetching notes: ", error);
        // Handle errors here, e.g., dispatch another action to show an error message
      });
  };
};

export const addNote = (note) => {
  return (dispatch) => {
    firestore().collection('notes').add(note)
      .then(docRef => {
        dispatch({
          type: 'ADD_NOTE',
          payload: { ...note, idNote: docRef.id }
        });
      })
      .catch(error => {
        console.error("Error adding note: ", error);
        // Handle errors here
      });
  };
};

export const deleteNote = (idNote) => {
  return (dispatch) => {
    firestore().collection('notes').doc(idNote).delete()
      .then(() => {
        dispatch({ type: 'DELETE_NOTE', payload: idNote });
      })
      .catch(error => {
        console.error("Error deleting note: ", error);
        // Handle errors here
      });
  };
};

export const updateNote = (idNote, note) => {
  return (dispatch) => {
    firestore().collection('notes').doc(idNote).update(note)
      .then(() => {
        dispatch({ type: 'UPDATE_NOTE', payload: { idNote, ...note } });
      })
      .catch(error => {
        console.error("Error updating note: ", error);
        // Handle errors here
      });
  };
};
