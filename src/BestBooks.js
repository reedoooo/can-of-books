import React from "react";
import axios from "axios";
import placeHolderImage from "./placeHolder.png";
// import { MDBInput } from "mdb-react-ui-kit";
import { Button, Carousel, Container, Modal } from "react-bootstrap";
import BookFormModal from "./BookFormModal";
import DeleteBookModal from "./DeleteBookModal";
// import BookSearchModal from "./BookSearchModal";
import EditBookForm from "./EditBookForm";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      showDeleteModal: false,
      showSearchModal: false,
      showEditModal: false,
      showModal: false,
      books: [],
      book: {
        _id: this._id,
        title: this.title,
        description: this.description,
        status: this.status,
        numNewBooks: 0,
      },
      newBooksAdded: 0,
      numDeletedBooks: 0,
      errorMessage: "",
      filteredBooks: [],
      searchResults: [],
      searchQuery: "",
    };
    // this.handleAutoComplete = this.handleAutoComplete.bind(this);
    // this.handleSelect = this.handleSelect.bind(this);
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

  // handleAutoComplete(event) {
  //   const query = event.target.value.trim();
  //   if (query === "") {
  //     this.setState({ searchResults: [] });
  //     return;
  //   }
  //   this.searchBooks(query);
  // }

  // handleSelect(title) {
  //   this.setState({ searchQuery: title, searchResults: [] }, () =>
  //     this.searchBooks(title)
  //   );
  // }

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

  // handleSearch = async (e) => {
  //   e.preventDefault();
  //   const { searchQuery } = this.state;

  //   try {
  //     await this.searchBooks(searchQuery);
  //     this.setState({
  //       showModal: true,
  //     });
  //   } catch (error) {
  //     console.error("Error occurred while searching books: ", error);
  //     this.setState({
  //       errorMessage: "Error occurred while searching books",
  //     });
  //   }
  // };

  handleBookUpdate = (updatedBook) => {
    axios
      .put(
        `${process.env.REACT_APP_SERVER}books/${updatedBook._id}`,
        updatedBook
      )
      .then((response) => {
        console.log(`Book with ID ${updatedBook._id} updated successfully`);
        this.fetchBooks();
      })
      .catch((error) => {
        console.error(
          `Error updating book with ID ${updatedBook._id}: `,
          error
        );
      });
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

          {/* <Button
            onClick={this.handleShowModal}
            className="btn-lg mainButton"
            style={{
              background:
                "linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))",
            }}
          >
            Add New Book
          </Button> */}

          <BookFormModal
            show={this.state.showAddModal}
            books={this.state.books}
            onHide={this.handleCloseAddModal}
            onAddNewBook={this.handleAddNewBook}
            handleShowModal={this.handleShowModal}
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
          <EditBookForm
            book={{
              _id: this.state._id,
              title: this.state.title,
              description: this.state.description,
              status: this.state.status,
            }}
            show={this.state.showEditModal}
            books={this.state.books}
            onHide={() => this.setState({ showEditModal: false })}
            onEdit={this.editBook}
            errorMessage={this.state.errorMessage}
            onBookUpdated={this.handleBookUpdate}
          />
          {/* <BookList books={this.state.books} /> */}
          {/* <BookSearchModal
            show={this.state.showSearchModal}
            books={this.state.books}
            book={this.state.book}
            onHide={() => this.setState({ showSearchModal: false })}
            onSearch={this.searchBooks}
            errorMessage={this.state.errorMessage}
          /> */}
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
              {/* <MDBInput
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
              /> */}
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

              {/* <Button
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
              </Button> */}
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