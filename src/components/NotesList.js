import React from "react";
import Note from "./Note.js";

const NotesList = ({ notes, editNote, deleteNote, updateColor }) => {
  const matchSearch = (note) => note.doesMatchSearch;
  const matches = notes.filter(matchSearch);
  const renderNote = (note) => (
    <Note
      note={note}
      key={note.id}
      editNote={editNote}
      deleteNote={deleteNote}
      updateColor={updateColor}
    />
  );
  const noteElements = matches.map(renderNote);
  return <ul className="notes-list">{noteElements}</ul>;
};

export default NotesList;
