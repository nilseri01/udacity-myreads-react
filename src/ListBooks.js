import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ListBooks extends Component {
  static propTypes = {
    shelvedBooks: PropTypes.array.isRequired,
    showToast: PropTypes.bool.isRequired,
    toastMessage: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.showToast === false && this.props.showToast === true) {
      toast.success(this.props.toastMessage);
    }
  }

  navigateToSearch = () => {
    let path = '/search';
    this.props.history.push(path);
  };

  render() {
    const { shelvedBooks, onShelfChange } = this.props;

    const currentlyReadingBooks = shelvedBooks.filter(
      (book) => (book.shelf || '') === 'currentlyReading'
    );

    const wantToReadBooks = shelvedBooks.filter(
      (book) => (book.shelf || '') === 'wantToRead'
    );

    const readBooks = shelvedBooks.filter(
      (book) => (book.shelf || '') === 'read'
    );

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={true}
          />
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReadingBooks.map((book) => (
                    <li key={book.id}>
                      <Book book={book} onShelfChange={onShelfChange} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToReadBooks.map((book) => (
                    <li key={book.id}>
                      <Book book={book} onShelfChange={onShelfChange} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {readBooks.map((book) => (
                    <li key={book.id}>
                      <Book book={book} onShelfChange={onShelfChange} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => this.navigateToSearch()}>Add a book</button>
        </div>
      </div>
    );
  }
}

export default ListBooks;
