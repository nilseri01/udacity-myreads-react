import React from 'react';
import PropTypes from 'prop-types';

const Book = (props) => (
  <div className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
          backgroundImage: `url(${
            props.book.imageLinks ? props.book.imageLinks.smallThumbnail : ''
          })`
        }}
      />
      <div className="book-shelf-changer">
        <select
          defaultValue={props.book.shelf ? props.book.shelf : 'none'}
          onChange={(e) => props.onShelfChange(props.book, e.target.value)}
        >
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{props.book.title}</div>
    <div className="book-authors">
      {props.book.authors ? props.book.authors.join(', ') : ''}
    </div>
  </div>
);

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired
};

export default Book;
