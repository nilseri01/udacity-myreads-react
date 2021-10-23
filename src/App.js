import React from 'react';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ListBooks from './ListBooks';

class BooksApp extends React.Component {
  state = {
    shelvedBooks: [],
    showToast: false,
    toastMessage: ''
  };

  componentDidMount() {
    this.getShelvedBooks();
  }

  getShelvedBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({ shelvedBooks: books }));
    });
  };

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        this.setState(() => ({
          showToast: true,
          toastMessage: 'Book shelf successfully updated!'
        }));
        setTimeout(() => {
          this.setState({ showToast: false, toastMessage: '' });
        }, 1000);
        this.getShelvedBooks();
      })
      .catch((error) => {
        this.setState(() => ({
          showToast: true,
          toastMessage: 'An error occurred!'
        }));
        setTimeout(() => {
          this.setState({ showToast: false, toastMessage: '' });
        }, 1000);
      });
  };

  navigateBack = () => {
    this.getShelvedBooks();
  };

  render() {
    const { shelvedBooks, showToast, toastMessage } = this.state;

    return (
      <div className="app">
        <Route
          path="/search"
          render={({ history }) => (
            <SearchBooks
              shelvedBooks={shelvedBooks}
              onShelfChange={this.changeShelf}
              showToast={showToast}
              toastMessage={toastMessage}
              onNavigateBack={() => {
                this.navigateBack();
                history.push('/');
              }}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={({ history }) => (
            <ListBooks
              shelvedBooks={shelvedBooks}
              onShelfChange={this.changeShelf}
              showToast={showToast}
              toastMessage={toastMessage}
              history={history}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
