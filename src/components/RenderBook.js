import React, { Component } from 'react';

export default class RenderBook extends Component {
  renderAuthor(book) {
    if (book.authors) return book.authors.map(author => (<div key={author} className='book-authors'>{author}</div>));
  }
  handleSelectChange(e, book) {
    let reShelf = book;
    reShelf.shelf = e.target.value;
    this.props.addBook(reShelf);
  }
  render() {
    let { book } = this.props;
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select onChange={(e) => this.handleSelectChange(e, book)}>
                <option value="none" disabled>Move to...</option>
                <option value="none">None</option>                
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {this.renderAuthor(book)} 
        </div>
      </li>
    );
  }
}