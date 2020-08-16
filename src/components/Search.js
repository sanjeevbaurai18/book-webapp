import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const Search = ({ updateInputValue, fetchBooks, history }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      history.push('/');
      fetchBooks({ currentPage: 1 });
    }}
  >
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Search books by title, author name, year or country name"
        onChange={evt => updateInputValue(evt)}
      />
      <InputGroup.Append>
        <Button
          variant="outline-secondary"
          type="submit"
        >
          Search
        </Button>
      </InputGroup.Append>
    </InputGroup>
  </form>
);

Search.propTypes = {
  history: PropTypes.any,
  updateInputValue: PropTypes.func,
  fetchBooks: PropTypes.func,
};

export default Search;
