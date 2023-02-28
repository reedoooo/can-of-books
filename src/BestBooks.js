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
      showModal: false,
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

  showAddModal = (e) => {
    this.setState({
      showAddModal: true,
    });
  };

  showModal = (e) => {
    this.setState({
      showModal: true,
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
          <h2>My Cool Guy Book Shelf</h2>
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
          {/* <Button
            onClick={this.handleSearch}
            className="btn-lg mainButton"
            style={{
              background:
                "linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))",
            }}
          >
            Search for Current Books
          </Button> */}
          {this.state.books.length ? (
            <>
              <Carousel>
                {this.state.books.map((book) => (
                  <Carousel.Item key={book._id}>
                    <div
                      className="bg-image hover-overlay ripple shadow-1-strong rounded"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        className="w-100"
                        src={book.image || placeHolderImage}
                        alt={book.title}
                      />
                      {/* <Carousel.Caption> */}
                      <div
                        className="overlay hover-overlay mask text-light d-flex justify-content-center flex-column text-center"
                        data-mdb-ripple-color="light"
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        <h3>
                          <i class="fas fa-search-plus">{book.title}</i>
                        </h3>
                        <p className="m-0">{book.description}</p>
                        <p className="m-0">Status: {book.status}</p>
                      </div>
                    </div>
                    {/* </Carousel.Caption> */}
                  </Carousel.Item>
                ))}
              </Carousel>
            </>
          ) : (
            <>
              <Modal show={this.showModal} onHide={this.handleCloseModal}>
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
          <BookFormModal
            show={this.showAddModal}
            onHide={this.handleCloseModal}
          />
        </Container>
      </>
    );
  }
}

export default BestBooks;