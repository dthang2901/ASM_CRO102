import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, addNote, deleteNote, updateNote } from '../action/notesActions';
import Modal from 'react-native-modal';
import auth from '@react-native-firebase/auth';
const EntriesListScreen = () => {
  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes.notes);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [editNoteTitle, setEditNoteTitle] = useState('');
  const [editNoteId, setEditNoteId] = useState(null);

  // Simulate user ID from authentication state
  const user = auth().currentUser;
  useEffect(() => {
    // Fetch notes for the current user
    dispatch(fetchNotes(user.uid));

  }, [dispatch, user.uid]);

  const handleAddNote = () => {
    if (!newNoteTitle.trim()) {
      Alert.alert('Validation', 'Please enter a title for the note');
      return;
    }
    const note = {
      idUser: user.uid,
      title: newNoteTitle,
      date: new Date().toLocaleString(),
      color: `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padEnd(6, '0')}`
    };
    dispatch(addNote(note));
    setNewNoteTitle('');
    setModalVisible(false);
  };

  const handleEditNote = () => {
    if (!editNoteTitle.trim()) {
      Alert.alert('Validation', 'Please enter a title for the note');
      return;
    }
    const updatedNote = {
      title: editNoteTitle,
      date: new Date().toLocaleString()
    };
    dispatch(updateNote(editNoteId, updatedNote));
    setEditNoteTitle('');
    setEditModalVisible(false);
  };

  const handleDeleteNote = (idNote) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      { text: "OK", onPress: () => dispatch(deleteNote(idNote)) }
    ]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.noteItem, { backgroundColor: item.color }]}
      onLongPress={() => {
        setEditNoteId(item.idNote);
        setEditNoteTitle(item.title);
        setEditModalVisible(true);
      }}>
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.noteDate}>{item.date}</Text>
      <TouchableOpacity onPress={() => handleDeleteNote(item.idNote)}>
        <Icon name="delete" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setEditNoteId(item.idNote);
          setEditNoteTitle(item.title);
          setEditModalVisible(true);
        }}
      >
        <Icon name="edit" size={24} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={item => item.idNote}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Icon name="add" size={24} color="#fff" />
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Note Title"
            style={styles.input}
            onChangeText={setNewNoteTitle}
            value={newNoteTitle}
          />
          <Button title="Add Note" onPress={handleAddNote} />
          <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      <Modal isVisible={isEditModalVisible}>
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Edit Note Title"
            style={styles.input}
            onChangeText={setEditNoteTitle}
            value={editNoteTitle}
          />
          <Button title="Update Note" onPress={handleEditNote} />
          <Button title="Cancel" color="red" onPress={() => setEditModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#673ab7',
  },
  row: {
    justifyContent: 'space-around',
  },
  noteItem: {
    flex: 1,
    margin: 8,
    borderRadius: 10,
    padding: 10,
    minHeight: 150,
    justifyContent: 'space-between',
  },
  noteTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  noteDate: {
    fontSize: 14,
    color: '#fff',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
  }
});

export default EntriesListScreen;
