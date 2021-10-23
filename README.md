# MyReads Project

This is the final assessment project for Udacity's React Fundamentals course.
This project is forked from https://github.com/udacity/reactnd-project-myreads-starter.

Book, ListBooks and SearchBooks components are created for composition purpose.

As you type, current and unfinished API calls are cancelled for the new search keyword (instead of lodash debounce, search method in BooksAPI is updated with axios and cancelToken is used).

A loading spinner (added custom spinner, updated App.css file) appears while search books API call continues.

If search API turns no results, "No results found" info appears.

Books without a thumbnail or author can also be viewed.

You can put new books to your shelves after you search. You can update the current shelf of your book via List or Search results screen.

If you can add a book to a shelf or change the current shelf successfully, a toast appears with an info message (react-toastify is used here).

You can go to search page with plus icon at the bottom right of the list page and go back to list page using the back icon at the top left of the search page.

## TL;DR

To get started:

- install all project dependencies with `npm install`
- start the development server with `npm start`

You can also use `yarn install` and `yarn start` if yarn is installed.

Then you can visit http://localhost:3000/ to use the application.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query, axios cancel token);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Screenshots

List Page:
![ScreenShot](https://raw.github.com/nilseri01/udacity-myreads-react/master/screenshots/list-page.png)

Update Shelf from List Page:
![ScreenShot](https://raw.github.com/nilseri01/udacity-myreads-react/master/screenshots/update-from-list.png)

Search Page:
![ScreenShot](https://raw.github.com/nilseri01/udacity-myreads-react/master/screenshots/search-page.png)

Update Shelf from Search Page:
![ScreenShot](https://raw.github.com/nilseri01/udacity-myreads-react/master/screenshots/update-from-search.png)
