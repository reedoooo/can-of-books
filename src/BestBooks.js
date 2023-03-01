import React from "react";
import axios from "axios";
import placeHolderImage from "./placeHolder.png";
import { Button, Carousel, Container, Modal } from "react-bootstrap";
import BookFormModal from "./BookFormModal";
import DeleteBookModal from "./DeleteBookModal";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      showDeleteModal: false,
      showModal: false,
      books: [],
      newBooksAdded: 0,
      numDeletedBooks: 0,
      errorMessage: "",
      filteredBooks: [],
      searchQuery: "",
    };

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

  handleSearch = async (e) => {
    e.preventDefault();
    const { searchQuery } = this.state;

    try {
      let apiFetch = `${process.env.REACT_APP_SERVER}books`;
      let response = await axios.get(apiFetch);

      let filteredBooks = response.data.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      this.setState({
        showModal: true,
        filteredBooks: filteredBooks,
      });
    } catch (error) {
      this.setState({
        error: "Error occurred while searching books",
      });
    }
  };

  async deleteBook(bookId) {
    try {
      const apiDelete = `${process.env.REACT_APP_SERVER}books/${bookId}`;
      await axios.delete(apiDelete);
      console.log(`Book with ID ${bookId} deleted successfully`);
      this.setState((prevState) => ({
        books: prevState.books.filter((book) => book._id !== bookId),
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
        this.setState((prevState) => ({
          books: [...prevState.books, response.data],
          newBooksAdded: prevState.newBooksAdded + 1,
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

  render() {
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
            onHide={this.handleCloseAddModal}
            onAddNewBook={this.handleAddNewBook}
            newBooksAdded={this.state.newBooksAdded}
            errorMessage={this.state.errorMessage}
          />

          <DeleteBookModal
            show={this.state.showDeleteModal}
            books={this.state.books}
            onHide={() => this.setState({ showDeleteModal: false })}
            onDelete={this.deleteBook}
            errorMessage={this.state.errorMessage}
          />

          <div className="mt-3">
            {/* <Button
              variant="primary"
              onClick={() => this.setState({ showAddModal: true })}
            >
              Add a Book
            </Button>
            <Button
              variant="danger"
              className="ml-2"
              onClick={() => this.setState({ showDeleteModal: true })}
            >
              Delete a Book
            </Button> */}
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
        </Container>
      </>
    );
  }
}

export default BestBooks;