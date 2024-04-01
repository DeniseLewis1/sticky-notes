import React from "react";
import { Heart } from "react-feather";

const Note = ({ note, editNote, deleteNote, updateColor, favoriteNotes, toggleFavorite }) => {
  const alreadyFavorite = favoriteNotes.find(favorite => favorite.id === note.id);
  const faveStyle = alreadyFavorite ? "#333" : "";

  return (
    <li className="note" style={{background: note.color}}>
      <input
        type="text"
        placeholder="Title"
        className="note__title"
        value={note.title}
        onChange={e => editNote(note.id, "title", e.target.value)}
      />
      <textarea
        placeholder="Description..."
        className="note__description"
        value={note.description}
        onChange={e => editNote(note.id, "description", e.target.value)}
      />
      <span className="note__delete" onClick={() => deleteNote(note.id)}>
        X
      </span>
      <input 
        type="color" 
        className="note-color" 
        value={note.color} 
        onChange={e => updateColor(note.id, e.target.value)} 
      />
      <p className="add-favorite" onClick={() => toggleFavorite(note.id)}>
        <Heart style={{fill: faveStyle}} />
      </p>
    </li>
  );
};

export default Note;
