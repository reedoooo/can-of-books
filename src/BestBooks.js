import React from "react";
import axios from "axios";
import placeHolderImage from "./placeHolder.png";
import { Button, Carousel, Container, Modal } from "react-bootstrap";
import BookFormModal from "./BookFormModal";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        showAddModal: false,
        books: [],
        error: null,
      };
  }

/* TODO: Make a GET request to your API to fetch all the books from the database */
  componentDidMount() {
    this.fetchBooks();
  }

  async fetchBooks() {
    try {
    let apiFetch = `${process.env.REACT_APP_SERVER}books`;
    let response = await axios.get(apiFetch);
    this.setState({
      books: response.data,
    });
    } catch (error) {
    this.setState({
      error: "Error occurred while fetching books",
    });
    }
  }

  handleSearch = async (e) => {
    e.preventDefault();
      // Search implementation to be added
  };

  showModal = (e) => {
    this.setState({
      showAddModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showAddModal: false,
    });
  };

  render() {
    return (
      <>
      <Container className="headerContainer">
        <h2>My Essential Lifelong Learning & Formation Shelf</h2>
        {/* <Button
          onClick={this.showModal}
          className="btn-lg mainButton"
          style={{
            background:
            "linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))",
          }}
        >
        Add New Book
        </Button> */}
        <Button
          onClick={this.handleSearch}
          className="btn-lg mainButton"
          style={{
          background:
            "linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))",
          }}
        >
        Search for Current Books
        </Button>
        {this.state.books.length ? (
          <>
            <h3>Books</h3>
            <Carousel>
            {this.state.books.map((book) => (
              <Carousel.Item key={book._id}>
                <img
                  className="d-block w-100"
                  src={book.image || placeHolderImage}
                  alt={book.title}
                />
                <Carousel.Caption>
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                  <p>Status: {book.status}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
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
        <BookFormModal show={this.state.showAddModal} onHide={this.handleCloseModal} />
      </Container>
    </>
  );
  }
}

export default BestBooks;