const initialState = {
    notes: []
  };
  
  const notesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_NOTES':
        return {
          ...state,
          notes: action.payload
        };
        case 'ADD_NOTE':
            // Check if the note already exists to prevent duplicates
            const exists = state.notes.some(note => note.idNote === action.payload.idNote);
            return {
              ...state,
              notes: exists ? state.notes : [...state.notes, action.payload]
            };
          
      case 'DELETE_NOTE':
        return {
          ...state,
          notes: state.notes.filter(note => note.idNote !== action.payload)
        };
      case 'UPDATE_NOTE':
        return {
          ...state,
          notes: state.notes.map(note => note.idNote === action.payload.idNote ? action.payload : note)
        };
      default:
        return state;
    }
  };
  
  export default notesReducer;
  