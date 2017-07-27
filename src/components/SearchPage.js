import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import RenderBook from './RenderBook';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      books: []
    };
    this.renderAuthor.bind(this);
  }

  inputChange(e) {
    this.setState({
      searchQuery: e.target.value
    })
    if (this.state.searchQuery.length > 0) {
      BooksAPI.search(this.state.searchQuery, 20).then(data => {
        this.setState({
          books: data
        });
      });
    }
  }

  renderAuthor(book) {
    if (book.authors) return book.authors.map(author => (<div key={author} className='book-authors'>{author}</div>));
  }
  handleSelectChange(e, book) {
    let reShelf = book;
    reShelf.shelf = e.target.value;
    this.props.addBook(reShelf);
  }
  renderBooks() {
    if (this.state.books.length > 0) {
      return this.state.books.map(book => {
        return (
            <RenderBook key={book.id} book={book} addBook={this.props.addBook} />
        );
      })
    }
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.props.history.push('/')}>Close</a>
          <div className="search-books-input-wrapper">
            <input onChange={this.inputChange.bind(this)} value={this.state.searchQuery} type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.renderBooks()}
          </ol>
        </div>      
      </div>
    );
  }
}