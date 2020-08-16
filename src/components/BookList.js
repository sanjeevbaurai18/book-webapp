import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import Book from './Book';

class BookList extends React.Component {
  componentDidMount() {
    const { fetchBooks, match } = this.props;
    fetchBooks({ currentPage: match.params.id || 1 });
  }

  render() {
    const { data, match } = this.props;
    return (
      data &&
        <React.Fragment>
          <Row style={{ margin: '10px 0px 10px 0px' }}>
            Page:
            <strong>{data.books.length !== 0 ? match.params.id || 1 : '--'}</strong>
          </Row>
          <Row>
          {data && data.books.map((e, i) => (
              <Book item={e} key={i} />
            ))}
            {data && data.books.length === 0 &&
              <Col lg="12" style={{ margin: '15px 0' }} className="text-center">
                <div style={{ maxWidth: '400px', width: '100%' }}>No result found...</div>
              </Col>
            }
          </Row>
        </React.Fragment>
    );
  }
}

BookList.propTypes = {
  data: PropTypes.object,
  match: PropTypes.any,
  fetchBooks: PropTypes.func,
  loader: PropTypes.bool,
};

export default BookList;
