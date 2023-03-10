import React from "react";
import axios from "axios";
import placeHolderImage from "./placeHolder.png";
import { MDBInput } from "mdb-react-ui-kit";
import { Button, Carousel, Container, Modal } from "react-bootstrap";
import BookFormModal from "./BookFormModal";
import DeleteBookModal from "./DeleteBookModal";
import BookSearchModal from "./BookSearchModal";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      showDeleteModal: false,
      showSearchModal: false,
      showModal: false,
      books: [],
      book: {
        _id: undefined,
        title: undefined,
        description: undefined,
        status: undefined,
        numNewBooks: 0,
      },
      newBooksAdded: 0,
      numDeletedBooks: 0,
      errorMessage: "",
      filteredBooks: [],
      searchResults: [],
      searchQuery: "",
    };
    this.handleAutoComplete = this.handleAutoComplete.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
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

  // handleSearch = async (e) => {
  //   e.preventDefault();
  //   const { searchQuery } = this.state;

  //   try {
  //     let apiFetch = `${process.env.REACT_APP_SERVER}books/${searchQuery}`;
  //     let response = await axios.get(apiFetch);
  //     console.log("You're searching for:", searchQuery);

  //     let filteredBooks = response.data.filter((book) =>
  //       book.title.toLowerCase().includes(searchQuery.toLowerCase())
  //     );

  //     this.setState({
  //       showSearchModal: true,
  //       filteredBooks: filteredBooks,
  //     });
  //   } catch (error) {
  //     this.setState({
  //       error: "Error occurred while searching books",
  //     });
  //   }
  // };
  async searchBooks(query) {
    try {
      let apiFetch = `${process.env.REACT_APP_SERVER}books/search?q=${query}`;
      let response = await axios.get(apiFetch);
      this.setState({
        filteredBooks: response.data,
      });
    } catch (error) {
      console.error("Error occurred while searching books: ", error);
      this.setState({
        errorMessage: "Error occurred while searching books",
      });
    }
  }

  handleAutoComplete(event) {
    const query = event.target.value.trim();
    if (query === "") {
      this.setState({ searchResults: [] });
      return;
    }
    this.searchBooks(query);
  }

  handleSelect(title) {
    this.setState({ searchQuery: title, searchResults: [] }, () =>
      this.searchBooks(title)
    );
  }

  async deleteBook(book) {
    try {
      const apiDelete = `${process.env.REACT_APP_SERVER}books/${book._id}`;
      await axios.delete(apiDelete);
      console.log(`Book with ID ${book._id} deleted successfully`);
      this.setState((prevState) => ({
        books: prevState.books.filter((b) => b._id !== book._id),
        numDeletedBooks: prevState.numDeletedBooks + 1,
        errorMessage: "",
      }));
    } catch (error) {
      console.error("Error occurred while deleting book: ", error);
      this.setState({
        errorMessage: "Error occurred while deleting book",
      });
    }
  }

  handleAddNewBook = (newBook) => {
    axios
      .post(`${process.env.REACT_APP_SERVER}books`, newBook)
      .then((response) => {
        console.log("Adding new book:", response.data);
        console.log("newBooks", this.state.newBooksAdded);

        this.setState((prevState) => ({
          books: [...prevState.books, response.data],
          newBooksAdded: this.state + 1,
          errorMessage: "",
        }));
      })
      .catch((error) => {
        console.error("Error adding new book:", error);
        this.setState({
          errorMessage: "Error adding new book. Please try again later.",
        });
      });
  };

  handleCloseAddModal = () => {
    this.setState({
      showAddModal: false,
    });
  };

  handleCloseDeleteModal = () => {
    this.setState({
      showDeleteModal: false,
    });
  };
  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  handleSearch = async (e) => {
    e.preventDefault();
    const { searchQuery } = this.state;

    try {
      await this.searchBooks(searchQuery);
      this.setState({
        showModal: true,
      });
    } catch (error) {
      console.error("Error occurred while searching books: ", error);
      this.setState({
        errorMessage: "Error occurred while searching books",
      });
    }
  };

  render() {
    const { searchResults } = this.state;
    console.log(this.state.books);
    console.log(this.state.searchResults);

    return (
      <>
        {console.log(this.state.newBook)}
        <Container className="headerContainer">
          <h2>My Cool Guy Book Shelf</h2>
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
                      <div
                        className="overlay hover-overlay mask text-light d-flex justify-content-center flex-column text-center"
                        data-mdb-ripple-color="light"
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        <h3>
                          <i className="fas">{book.title}</i>
                        </h3>
                        <p className="m-0">{book.description}</p>
                        <p className="m-0">Status: {book.status}</p>
                      </div>
                    </div>
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

          <BookFormModal
            show={this.state.showAddModal}
            books={this.state.books}
            book={this.state.book}
            onHide={this.handleCloseAddModal}
            onAddNewBook={this.handleAddNewBook}
            newBooksAdded={this.state.newBooksAdded}
            errorMessage={this.state.errorMessage}
          />

          <DeleteBookModal
            show={this.state.showDeleteModal}
            books={this.state.books}
            book={this.state.book}
            onHide={() => this.setState({ showDeleteModal: false })}
            onDelete={this.deleteBook}
            errorMessage={this.state.errorMessage}
          />

          <BookSearchModal
            show={this.state.showSearchModal}
            books={this.state.books}
            book={this.state.book}
            onHide={() => this.setState({ showSearchModal: false })}
            onSearch={this.searchBook}
            errorMessage={this.state.errorMessage}
          />
          {/* <div className="mt-3">
            <Button variant="primary" onClick={() => this.setState({ showAddModal: true })}>
              Add a Book
            </Button>
            <Button variant="danger" className="ml-2" onClick={() => this.setState({ showDeleteModal: true })}>
              Delete a Book
            </Button>
            <form onSubmit={this.handleSearch}>
              <input
                type="text"
                placeholder="Search Books"
                value={this.state.searchQuery}
                onChange={(e) => this.setState({ searchQuery: e.target.value })}
              />
              <Button type="submit" className="ml-2">
                Search
              </Button>
            </form>
          </div>

          {this.state.filteredBooks.length > 0 && (
            <div className="mt-3">
              <h4>Search Results:</h4>
              <ul>
                {this.state.filteredBooks.map((book) => (
                  <li key={book._id}>
                    {book.title} - {book.description}
                  </li>
                ))}
              </ul>
            </div>
          )} */}
          <div
            className="mt-3"
            style={{
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <form
              onSubmit={this.handleSearch}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <MDBInput
                wrapperClass="mb-4"
                label="Search Books"
                type="search"
                value={this.state.searchQuery}
                onChange={(e) => this.setState({ searchQuery: e.target.value })}
                onKeyUp={this.handleAutoComplete}
                style={{
                  Top: "50%",
                  Bottom: "50%",
                }}
              />
              {searchResults.length > 0 && (
                <ul className="search-dropdown">
                  {searchResults.map((result) => (
                    <li
                      key={result._id}
                      onClick={() => this.handleSelect(result.title)}
                    >
                      {result.title}
                    </li>
                  ))}
                </ul>
              )}
              {/* <input
                type="text"
                placeholder="Search Books"
                value={this.state.searchQuery}
                onChange={(e) => this.setState({ searchQuery: e.target.value })}
              /> */}
              <Button
                type="submit"
                className="ml-2"
                // className="btn-lg mainButton"
                style={{
                  background:
                    "linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))",
                  Top: "50%",
                  Bottom: "50%",
                }}
              >
                Search
              </Button>
            </form>
            {this.state.filteredBooks.length > 0 && (
              <div className="mt-3">
                <h4>Search Results:</h4>
                <ul>
                  {this.state.filteredBooks.map((book) => (
                    <li key={book._id}>
                      {book.title} - {book.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {this.state.errorMessage && (
              <div className="mt-3">
                <p>{this.state.errorMessage}</p>
              </div>
            )}
          </div>
        </Container>
      </>
    );
  }
}

export default BestBooks;
import React, { Component } from "react";
import { Button, Form, FormText, Modal } from "react-bootstrap";

export default class BookFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: props.book,
      showModal: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      book: { ...prevState.book, [name]: value },
      numNewBooks: prevState.book.numNewBooks + 1,
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { book } = this.state;

    // TODO: Send new book data to server using axios or fetch
    console.log("New Book:", book);
    this.props.onAddNewBook({
      _id: book._id,
      newBooksAdded: book.numNewBooks + 1,
      title: book.title,
      description: book.description,
      status: book.status,
    });

    this.handleCloseModal();
  };

  handleCloseModal() {
    this.setState({
      book: {
        _id: "",
        title: "",
        description: "",
        status: "",
        numNewBooks: 0,
      },
      showModal: false,
    });
  }

  handleShowModal() {
    this.setState({ showModal: true });
  }

  render() {
    const { book } = this.state;
    return (
      <>
        <Button
          onClick={this.handleShowModal}
          className="btn-lg mainButton"
          style={{
            background:
              "linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))",
          }}
        >
          Add New Book
        </Button>
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  value={book.title}
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={3}
                  placeholder="Enter description"
                  value={book.description}
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={book.status}
                  onChange={this.handleInputChange}
                  required
                >
                  <option value="">Select status</option>
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </Form.Control>
              </Form.Group>
              <FormText className="text-muted">
                All fields are required.
              </FormText>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

import React, { Component } from "react";
import { Button, Form, FormText, Modal } from "react-bootstrap";

export default class DeleteBookModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: props.book,
      showModal: false,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      book: { ...prevState.book, [name]: value },
    }));
  };

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleDeleteSubmit = (e) => {
    e.preventDefault();
    const { book } = this.state;
    if (this.props.onDelete) {
      this.props.onDelete(book);
    }
    this.handleCloseModal();
  };

  handleCloseModal = () => {
    this.setState({
      book: {
        _id: "",
        title: "",
        description: "",
        status: "",
      },
      showModal: false,
    });
  };

  render() {
        const { book } = this.state;

    return (
      <>
        <Button
          onClick={this.handleShowModal}
          className="btn-lg mainButton"
          style={{
            background:
              "linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))",
          }}
        >
          Delete
        </Button>
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleDeleteSubmit}>
              <Form.Group controlId="_id">
                <Form.Label>Book _id</Form.Label>
                <Form.Control
                  type="text"
                  name="_id"
                  placeholder="Enter _id"
                  value={book._id}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  value={book.title}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={3}
                  placeholder="Enter description"
                  value={book.description}
                />
              </Form.Group>
              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={book.status}
                  onChange={this.handleInputChange}
                >
                  <option value="">Select status</option>
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </Form.Control>
              </Form.Group>
              <FormText className="text-muted">
                All fields are required.
              </FormText>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

// DeleteBookModal.propTypes = {
//   show: PropTypes.bool.isRequired,
//   onHide: PropTypes.func.isRequired,
//   filteredBooks: PropTypes.array.isRequired,
//   onDelete: PropTypes.func.isRequired,
//   numDeletedBooks: PropTypes.number.isRequired,
//   errorMessage: PropTypes.string,
// };

// DeleteBookModal.defaultProps = {
//   errorMessage: "",
// };
