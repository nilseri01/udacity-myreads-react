import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SearchBooks extends Component {
  static propTypes = {
    shelvedBooks: PropTypes.array.isRequired,
    showToast: PropTypes.bool.isRequired,
    toastMessage: PropTypes.string.isRequired,
    onNavigateBack: PropTypes.func.isRequired,
    onShelfChange: PropTypes.func.isRequired
  };

  state = {
    query: '',
    showingBooks: [],
    isLoading: false,
    noResultsFound: false
  };

  // to cancel previous request at each type, axios is used in SearchBooks and BooksAPI
  // https://www.codingdeft.com/posts/axios-cancel-previous-request-react/
  cancelToken;

  updateQuery = (query) => {
    this.setState(() => ({
      // TODO: NilS keep uppercase when typed, fix later
      query: (query || '').trim().length === 0 ? '' : query.trim().toLowerCase()
    }));
  };

  clearQuery = () => {
    this.updateQuery('');
  };

  search = (query) => {
    //Save the cancel token for the current request
    this.cancelToken = axios.CancelToken.source();

    this.setState({ isLoading: true, noResultsFound: false }, () => {
      //Pass the cancel token to the current request
      BooksAPI.search(query, this.cancelToken.token)
        .then((books) => {
          if (books.error) {
            this.setState(() => ({
              showingBooks: [],
              isLoading: false,
              noResultsFound: true
            }));
          } else {
            // add books' shelf status if added before
            this.props.shelvedBooks.forEach((addedBook) => {
              const index = books.map((book) => book.id).indexOf(addedBook.id);
              if (index !== -1) {
                books[index] = { ...books[index], shelf: addedBook.shelf };
              }
            });
            this.setState(() => ({
              showingBooks: books,
              isLoading: false,
              noResultsFound: false
            }));
          }
        })
        .catch((error) => {
          // console.log(error);
          // continue to show loading spinner if request is cancelled due to typing
          if (error && error.message === 'CANCELLED_DUE_TO_NEW_REQUEST') {
            this.setState(() => ({
              showingBooks: [],
              isLoading: true, // TODO: NilS tamamen silince sorun oldu
              noResultsFound: false
            }));
          } else {
            this.setState(() => ({
              showingBooks: [],
              isLoading: false,
              noResultsFound: true
            }));
          }
        });
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      //Check if there are any previous pending requests
      if (typeof this.cancelToken != typeof undefined) {
        this.cancelToken.cancel('CANCELLED_DUE_TO_NEW_REQUEST');
      }

      if ((this.state.query || '').trim().length === 0) {
        this.setState(() => ({
          showingBooks: [],
          isLoading: false,
          noResultsFound: false
        }));
      } else {
        this.search(this.state.query);
      }
    }

    if (prevProps.showToast === false && this.props.showToast === true) {
      toast.success(this.props.toastMessage);
    }
  }

  render() {
    const { query, showingBooks, isLoading, noResultsFound } = this.state;
    const { onNavigateBack, onShelfChange } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => onNavigateBack()}>
            Close
          </button>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>

        <div className="search-books-results">
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={true}
          />
          {query !== '' && isLoading === true && (
            <div className="loader-wrapper">
              <div className="loader" />
            </div>
          )}

          {noResultsFound === true && <div>No results found...</div>}

          {isLoading === false && showingBooks.length > 0 && (
            <ol className="books-grid">
              {showingBooks.map((book) => (
                <li key={book.id}>
                  <Book book={book} onShelfChange={onShelfChange} />
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
