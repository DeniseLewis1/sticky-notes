import React from "react";

const Header = ({ addNote, searchText, searchNote }) => {
  const searchInput = (e) => searchNote(e.target.value);

  return (
    <header>
      <h1 className="app-header__title">Sticky Notes</h1>
      <aside className="app-header__controls">
        <button onClick={addNote} className="add-new">
          + New Note
        </button>
        <input
          type="text"
          placeholder="Type here to search..."
          className="search"
          value={searchText}
          onChange={searchInput}
        />
      </aside>
    </header>
  );
};

export default Header;
