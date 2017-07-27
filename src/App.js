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

  addBook(book) {
    let pos = this.state.books.map(e => e.id).indexOf(book.id);
    if (pos === -1) this.setState(prevState => { prevState.books.push(book) });
    else this.setState(prevState => { prevState.books[pos].shelf = book.shelf });
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
