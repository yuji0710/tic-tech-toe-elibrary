import React, { Component } from 'react';
import MainCard from './MainCard.js';

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: false,
      error: null,
      page: 1,
      hasMore: true,
    };

    // Array of random queries
    this.randomQueries = [
      'fantasy',
      'science fiction',
      'mystery',
      'romance',
      'non-fiction',
      'history',
      'biography',
      'self-help',
      'cookbooks',
      'travel',
    ];
  }

  componentDidMount() {
    this.fetchData(); // Fetch initial data
  }

  componentDidUpdate(prevProps) {
    // Fetch new data if search text has changed
    if (prevProps.text !== this.props.text && this.props.text) {
      this.setState({ items: [], page: 1, hasMore: true }, this.fetchData);
    } else if (prevProps.text !== this.props.text) {
      // If no search text, fetch random data
      this.setState({ items: [], page: 1, hasMore: true }, this.fetchData);
    }
  }

  fetchData = async () => {
    const { page } = this.state;

    this.setState({ loading: true, error: null });

    // If there's a search text, use that; otherwise, select a random query
    const query = this.props.text || this.randomQueries[Math.floor(Math.random() * this.randomQueries.length)];

    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10&startIndex=${(page - 1) * 10}`;

    try {
      let response = await fetch(url);
      let parsedData = await response.json();

      if (parsedData.items) {
        this.setState((prevState) => ({
          items: [...prevState.items, ...parsedData.items],
          loading: false,
          page: prevState.page + 1,
          hasMore: parsedData.items.length > 0,
        }));
      } else {
        this.setState({ loading: false, hasMore: false, error: 'No items found' });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ loading: false, error: error.message });
    }
  };

  handleLoadMore = () => {
    this.fetchData(); // Load more data when button is clicked
  };

  render() {
    const { items, loading, error, hasMore } = this.state;

    // Filter out items without images
    const filteredItems = items.filter(item => item.volumeInfo && item.volumeInfo.imageLinks);

    return (
      <div className="my-3" >
        {error && <div className="alert alert-danger">{error}</div>}

        {filteredItems.length === 0 && !loading && !error && (
          <div className="alert alert-info text-center my-3">
            <h4>Welcome to the Book Finder!</h4>
            <p>Use the search bar to find books by title, author, or subject.</p>
            <p>Start exploring now!</p>
          </div>
        )}

        <div className="row my-3">
          {filteredItems.map((element) => {
            if (!element || !element.volumeInfo) return null;

            const { volumeInfo } = element;

            return (
              <div className="col-sm-4 col-md-6 col-lg-3 my-4" key={volumeInfo.id}>
                <MainCard
                  title={volumeInfo.title || "No Title"}
                  description={volumeInfo.description ? volumeInfo.description.substring(0, 80) + '...' : "No Description"}
                  imageUrl={volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : ""} // Use thumbnail safely
                  newsUrl={volumeInfo.infoLink}
                  author={volumeInfo.authors ? volumeInfo.authors.join(', ') : "Unknown Author"}
                  date={volumeInfo.publishedDate}
                  source={volumeInfo.publisher || "Unknown Publisher"}
                />
              </div>
            );
          })}
        </div>

        {loading && <div className="text-center">Loading...</div>}
        {hasMore && !loading && (
          <div className="d-grid gap-2 col-6 mx-auto">
            <button onClick={this.handleLoadMore} className="btn btn-success">
              Load More
            </button>
          </div>
        )}
      </div>
    );
  }
}
