import React from "react";
import Note from "./Note.js";

const NotesList = (props) => {
  const matchSearch = (note) => note.doesMatchSearch;
  const matches = props.notes.filter(matchSearch);
  const renderNote = (note) => (
    <Note
      note={note}
      key={note.id}
      onType={props.onType}
      deleteNote={props.deleteNote}
    />
  );
  const noteElements = matches.map(renderNote);
  return <ul className="notes-list">{noteElements}</ul>;
};

export default NotesList;
