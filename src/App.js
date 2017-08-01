import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './components/SearchPage.js';
import BookShelf from './components/BookShelf';
import { Route } from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchPage: true,
      books: []
    }
    this.addBook = this.addBook.bind(this);
  }

  async componentDidMount() {
    let books = await BooksAPI.getAll();
    this.setState({ books });
  }

  async addBook(book) {
    try {
      // Before we add book, let's update the database
      await BooksAPI.update(book, book.shelf);
      // Then let's check if the book is already in our state array of 'books'
      let pos = this.state.books.map(e => e.id).indexOf(book.id);
      // if it isn't currently in our array of books, let's add it!
      if (pos === -1) this.setState(prevState => { prevState.books.push(book) });
      // If it is already in there let's just update it's shelf.
      else this.setState(prevState => { prevState.books[pos].shelf = book.shelf });
    } catch (err) {
      // If we get a bad response let's console log it.
      console.log('Couldn\'t completely add book. Got error of: ', err);
    }

  }
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={ ({ history }) => (
          <BookShelf 
          history={history}
          addBook={this.addBook}
          books={this.state.books} />
        )} />
        <Route exact path='/create' render={({ history }) => (
          <SearchPage
          history={history}
          addBook={this.addBook} />
        )} />
      </div>
    )
  }
}
