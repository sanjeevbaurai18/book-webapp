import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import BookList from './components/BookList';
import Pagination from './components/pagination';
import './App.scss';
import Search from './components/Search';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      data: null,
      currentPage: null,
      itemsPerPage: 20,
      search: '',
    };
  }

  fetchBooks = (payload) => {
    this.setState({
      loader: true,
    });
    const { currentPage, itemsPerPage, search } = this.state;
    const data = {
      page: payload ? payload.currentPage : currentPage,
      itemsPerPage,
      filters: [
        {
          type: 'all',
          values: [search],
        },
      ],
    };
    fetch('http://nyx.vima.ekt.gr:3000/api/books', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(res => this.setState({
        data: res,
        currentPage: payload ? payload.currentPage : currentPage,
        loader: false,
      }));
  };

  updateInputValue = (evt) => {
    this.setState({
      search: evt.target.value,
    });
  };

  render() {
    const { location, history } = this.props;
    const { data, itemsPerPage, loader } = this.state;
    return (
      <div className="App">
        {loader &&
          <div className="loader">            
          </div>
        }
        <Route
          exact
          path={location.pathname !== '/' ? '/page/:id' : '/'}
          render={routeProps => (
            <Container>
              <Row>
                <Col xs="12" lg="6" style={{ margin: '15px 0' }}>
                  <Search
                    updateInputValue={this.updateInputValue}
                    fetchBooks={this.fetchBooks}
                    history={history}
                  />
                </Col>
                <Col xs="12" lg="6" style={{ margin: '15px 0' }}>
                  {data && data.books &&
                    <Pagination
                      totalRecords={data.count}
                      pageLimit={itemsPerPage}
                      fetchBooks={this.fetchBooks}
                      currentPage={Number(routeProps.match.params.id) || 1}
                      history={history}
                      location={location}
                    />
                  }
                </Col>
              </Row>
              <BookList
                {...routeProps}
                data={data}
                fetchBooks={this.fetchBooks}
              />
            </Container>
          )}
        />
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.any,
  history: PropTypes.any,
};

export default withRouter(props => <App {...props} />);
