import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  };

  componentDidUpdate() {
    const savedNotes = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", savedNotes);
  }

  componentDidMount() {
    const savedNotes = localStorage.getItem("savedNotes");
    if (savedNotes) {
      this.setState({ notes: JSON.parse(savedNotes) });
    }
  }

  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    const newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
  };

  onType = (editMeId, updatedKey, updatedValue) => {
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editMeId) {
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
    this.setState({ notes: updatedNotes });
  };

  onSearch = (text) => {
    const newSearchText = text.toLowerCase();

    const updatedNotes = this.state.notes.map((note) => {
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
    this.setState({ notes: updatedNotes, searchText: newSearchText });
  };

  deleteNote = (deleteId) => {
    const updatedNotes = this.state.notes.filter(
      (note) => note.id !== deleteId
    );
    this.setState({ notes: updatedNotes });
  };

  render() {
    return (
      <div>
        <Header
          addNote={this.addNote}
          searchText={this.state.searchText}
          onSearch={this.onSearch}
        />
        <NotesList
          notes={this.state.notes}
          onType={this.onType}
          deleteNote={this.deleteNote}
        />
      </div>
    );
  }
}

export default App;
