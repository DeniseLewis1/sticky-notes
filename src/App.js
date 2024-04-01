import React, { useState, useEffect } from "react";
import Header from "./components/Header.js";
import NotesList from "./components/NotesList.js";

function App() {
  const [color, setColor] = useState("#FFFFE0");
  const defaultColor = "#FFFFE0";
  const [notes, setNotes] = useState(JSON.parse(window.localStorage.getItem("savedNotes")) || [{
    id: Date.now(),
    title: "",
    description: "",
    color: defaultColor,
    doesMatchSearch: true
  }]);
  const [searchText, setSearchText] = useState("");
  const [favoriteNotes, setFavoriteNotes] = useState(JSON.parse(window.localStorage.getItem("favoriteNotes")) || []);

  useEffect(() => {
    window.localStorage.setItem("savedNotes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    window.localStorage.setItem("favoriteNotes", JSON.stringify(favoriteNotes));
  }, [favoriteNotes]);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      color: defaultColor,
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
    updateFavorites(noteId);
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
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    const updatedFavoriteNotes = favoriteNotes.filter(favorite => favorite.id !== noteId);
    setNotes(updatedNotes);
    setFavoriteNotes([...updatedFavoriteNotes]);
  };

  const updateColor = (noteId, newColor) => {
    const updatedNotes = notes.map(note => {
      if (note.id === noteId) {
        note.color = newColor;
        setColor(newColor);
        return note;
      } else {
        return note;
      }
    });
    setNotes([...updatedNotes]);
    updateFavorites(noteId);
  };

  const toggleFavorite = (noteId) => {
    const selectedNote = notes.find(note => note.id === noteId);
    const alreadyFavorite = favoriteNotes.find(favorite => favorite.id === selectedNote.id);

    if (!alreadyFavorite) {
      setFavoriteNotes([...favoriteNotes, selectedNote]);
    }
    else {
      const updatedFavoriteNotes = favoriteNotes.filter(favorite => favorite.id !== noteId);
      setFavoriteNotes([...updatedFavoriteNotes]);
    }
  };

  const updateFavorites = (noteId) => {
    const selectedNote = notes.find(note => note.id === noteId);
    const updatedFavorites = favoriteNotes.map(favorite => {
      if (favorite.id === noteId) {
        return selectedNote;
      } else {
        return favorite;
      }
    });
    setFavoriteNotes([...updatedFavorites]);
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
        updateColor={updateColor}
        favoriteNotes={favoriteNotes}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default App;
