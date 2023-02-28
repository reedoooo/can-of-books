import React from "react";
import axios from "axios";
import placeHolderImage from "./placeHolder.png";
import { Button, Carousel, Container, Modal } from "react-bootstrap";

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
    return (
      <>
        {console.log(this.state)}
        <Container className="headerContainer">
          <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
          <Button
            onClick={this.handleSearch}
            className="btn-lg mainButton"
            style={{
              background:
                "linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))",
            }}
          >
            Click to View Library
          </Button>
          {this.state.books.length ? (
            <>
              <h3>Books</h3>
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={placeHolderImage}
                    alt="The Giver"
                  />
                  <Carousel.Caption>
                    <h3>The Giver</h3>
                    <p>A description of The Giver goes here</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={placeHolderImage}
                    alt="The Outsiders"
                  />

                  <Carousel.Caption>
                    <h3>The Outsiders</h3>
                    <p>A description of The Outsiders goes here</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={placeHolderImage}
                    alt="Animal Farm"
                  />

                  <Carousel.Caption>
                    <h3>Animal Farm</h3>
                    <p>A description of Animal Farm goes here</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </>
          ) : (
            <>
              <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>No Books Found :(</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Sorry, no books were found for your search.</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleCloseModal}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )}
        </Container>
      </>
    );
  }
}

export default BestBooks;
