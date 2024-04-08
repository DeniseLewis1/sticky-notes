import React from "react";
import { Filter } from "react-feather";

const Header = ({ addNote, searchText, searchNote, categories, category, handleCategoryChange }) => {
  const searchInput = (e) => searchNote(e.target.value);

  return (
    <header>
      <h1 className="app-header__title">Sticky Notes</h1>
      <aside className="app-header__controls">
        <div className="app-header__left">
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
        </div>
        <div className="app-header__right">
        <form className="category-filter">
            <Filter />
            <label for="category">Filter Notes:</label>
            <select 
              id="category" 
              name="category" 
              value={category} 
              onChange={handleCategoryChange}
            >
              {categories.map(category => <option value={category} key={category}>{category}</option>)}
            </select>
            </form>
          </div>
      </aside>
    </header>
  );
};

export default Header;
