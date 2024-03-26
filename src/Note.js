import React from "react";

const Note = ({ note, editNote, deleteNote, updateColor }) => {
  const updateTitle = (e) =>
    editNote(note.id, "title", e.target.value);

  const updateDescription = (e) =>
    editNote(note.id, "description", e.target.value);

  const clickDelete = () => deleteNote(note.id);

  return (
    <li className="note" style={{background: note.color}}>
      <input
        type="text"
        placeholder="Title"
        className="note__title"
        value={note.title}
        onChange={updateTitle}
      />
      <textarea
        placeholder="Description..."
        className="note__description"
        value={note.description}
        onChange={updateDescription}
      />
      <span className="note__delete" onClick={clickDelete}>
        X
      </span>
      <input type="color" className="note-color" value={note.color} onChange={e => updateColor(note.id, e.target.value)} />
    </li>
  );
};

export default Note;
