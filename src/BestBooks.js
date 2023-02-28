import React from "react";
import axios from "axios";
import placeHolderImage from "./placeHolder.png";
import { Button, Carousel } from "react-bootstrap";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      description: [],
      status: [],
      title: [],
      error: null,
    };
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  // handleSearchInput = (e) => {
  //   let searchResult = e.target.value;
  //   this.setState(
  //     {
  //       searchInput: searchResult,
  //     },
  //     () => console.log(this.state.searchInput)
  //   );
  // };

  handleSearch = async (e) => {
    try {
      e.preventDefault();

      let apiFetch = `${process.env.REACT_APP_SERVER}books`;

      let response = await axios.get(apiFetch);
      this.setState({
        books: response.data,
        description: response.data.description,
        status: response.data.status,
        title: response.data.title,
      });
    } catch (error) {
      this.setState({
        error: console.log("error"),
      });
    }
  };

  render() {
    /* TODO: render all the books in a Carousel */
    return (
      <>
        {console.log(this.state)}
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <Button
          onClick={this.handleSearch}
          className="mainButton"
          style={{
            background:
              "linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))",
          }}
        >Click to View Library</Button>
        {this.state.books.length ? (
          <>
            <p>Book Carousel coming soon</p>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={placeHolderImage}
                  alt={this.state.books.description}
                />
                <Carousel.Caption>
                  <h3>The Giver</h3>
                  <p>{this.state.books.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={placeHolderImage}
                  alt={this.state.books.description}
                />

                <Carousel.Caption>
                  <h3>The Outsiders</h3>
                  <p>{this.state.books.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={placeHolderImage}
                  alt={this.state.books.description}
                />

                <Carousel.Caption>
                  <h3>Animal Farm</h3>
                  <p>{this.state.books.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    );
  }
}

export default BestBooks;
