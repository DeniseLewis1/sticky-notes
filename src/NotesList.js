import React from "react";
import Note from "./Note.js";

const NotesList = ({ notes, editNote, deleteNote }) => {
  const matchSearch = (note) => note.doesMatchSearch;
  const matches = notes.filter(matchSearch);
  const renderNote = (note) => (
    <Note
      note={note}
      key={note.id}
      editNote={editNote}
      deleteNote={deleteNote}
    />
  );
  const noteElements = matches.map(renderNote);
  return <ul className="notes-list">{noteElements}</ul>;
};

export default NotesList;
