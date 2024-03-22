import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

function App() {
  const [notes, setNotes] = useState(JSON.parse(window.localStorage.getItem("savedNotes")) || [{
    id: Date.now(),
    title: "",
    description: "",
    doesMatchSearch: true
  }]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    window.localStorage.setItem("savedNotes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    setNotes([newNote, ...notes])
  };

  const editNote = (noteId, updatedKey, updatedValue) => {
    const updatedNotes = notes.map((note) => {
      if (note.id !== noteId) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    setNotes(updatedNotes);
  };

  const searchNote = (text) => {
    const newSearchText = text.toLowerCase();

    const updatedNotes = notes.map((note) => {
      if (!newSearchText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        note.doesMatchSearch =
          note.title.toLowerCase().includes(newSearchText) ||
          note.description.toLowerCase().includes(newSearchText);
        return note;
      }
    });
    setNotes(updatedNotes);
    setSearchText(newSearchText);
  };

  const deleteNote = (noteId) => {
    const updatedNotes = notes.filter(
      (note) => note.id !== noteId
    );
    setNotes(updatedNotes);
  };

  return (
    <div>
      <Header
        addNote={addNote}
        searchText={searchText}
        searchNote={searchNote}
      />
      <NotesList
        notes={notes}
        editNote={editNote}
        deleteNote={deleteNote}
      />
    </div>
  );
}

export default App;
