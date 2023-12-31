import React from "react";

const Header = (props) => {
  const searchInput = (e) => props.onSearch(e.target.value);

  return (
    <header>
      <h1 className="app-header__title">Super Sticky Notes</h1>
      <aside className="app-header__controls">
        <button onClick={props.addNote} className="add-new">
          + New Note
        </button>
        <input
          type="text"
          placeholder="Type here to search..."
          className="search"
          value={props.searchText}
          onChange={searchInput}
        />
      </aside>
    </header>
  );
};

export default Header;
