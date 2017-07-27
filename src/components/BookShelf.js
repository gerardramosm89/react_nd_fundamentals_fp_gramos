import React from 'react'
import '../App.css'
import RenderBook from './RenderBook';

class BookShelf extends React.Component {
  state = {
    books: this.props.books
  }
  renderCurrentlyReading() {
    if (this.state.books.length > 0) {
      let reduced = this.state.books.filter(data => data.shelf === 'currentlyReading');
        return reduced.map(book => {
          return(
            <RenderBook key={book.id} book={book} addBook={this.props.addBook} />
          );
      })
    };
  }
  renderRead() {
    let reduced;
    if (this.state.books.length > 0) {
      reduced = this.state.books.filter(data => data.shelf === 'read');
        return reduced.map(book => {
          return(
            <RenderBook key={book.id} book={book} addBook={this.props.addBook} />
          );
      })
    };

  }
  renderWantToRead() {
    if (this.state.books.length > 0) {
      let reduced = this.state.books.filter(data => data.shelf === 'wantToRead');
        return reduced.map(book => {
          return(
            <RenderBook key={book.id} book={book} addBook={this.props.addBook} />
          );
      })
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      books: nextProps.books
    });
  }
  render() {
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>         
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.renderCurrentlyReading()}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.renderWantToRead()}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.renderRead()}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.props.history.push('/create')}>Add a book</a>
            </div>
          </div>
      </div>
    )
  }
}

export default BookShelf