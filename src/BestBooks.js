import React from "react";
import axios from "axios";
import placeHolderImage from "./placeHolder.png";
import { Button, Carousel, Container, Modal } from "react-bootstrap";
import BookFormModal from "./BookFormModal";
// import { async } from "q";
import EditBookModal from "./EditBookModal";

class Book {
  constructor(title, description, status) {
    this.title = title;
    this.description = description;
    this.status = status;
  }
}

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      showEditModal: false,
      showModal: true,
      books: [],
      error: null,
      filteredBooks: [],
      searchQuery: "",
    };
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database */
  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = async() => {
    try {
      let apiFetch = `${process.env.REACT_APP_SERVER}/books`;
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
  //     let apiFetch = `${process.env.REACT_APP_SERVER}books`;
  //     let response = await axios.get(apiFetch);

  //     let filteredBooks = response.data.filter((book) =>
  //       book.title.toLowerCase().includes(searchQuery.toLowerCase())
  //     );

  //     this.setState({
  //       showModal: true,
  //       filteredBooks: filteredBooks,
  //     });
  //   } catch (error) {
  //     this.setState({
  //       error: "Error occurred while searching books",
  //     });
  //   }
  // };

  handleCloseAddModal = () => {
    this.setState({
      showAddModal: false,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  handleDeleteBook = async (book) => {
    try {
      let apiUrl = `${process.env.REACT_APP_SERVER}/books/${book._id}`;
      await axios.delete(apiUrl);
      this.fetchBooks();
    } catch (err){
      console.error(err)
    }
  }

  handleAddBook = (event) => {
    let newBook = new Book(
      event.target.title.value,
      event.target.description.value,
      event.target.status.value
    )

    console.log(newBook);

    axios
      .post(`${process.env.REACT_APP_SERVER}/books`, newBook)
      .then(response => {
        console.log(response);
        this.fetchBooks();
      })
      .catch(error => {console.log(error)})
  };

  handleEditBook = (event, book) => {
    let newBook = new Book (
      event.target.title.value,
      event.target.description.value,
      event.target.status.value
    )

    console.log(book);
    console.log(newBook);

    axios
      .put(`${process.env.REACT_APP_SERVER}/books/${book._id}`, newBook)
      .then(response => {console.log('put request successful ' + response)})
      .catch(err => console.log(err + ' | put request failed' ))
  }


  render() {
    return (
      <>
        <Container className="headerContainer">
          <h2>My Cool Guy Book Shelf</h2>

          {this.state.books.length > 0 ? (
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
                          <i className="fas">{book.title}</i>
                        </h3>
                        <p className="m-0">{book.description}</p>
                        <p className="m-0">Status: {book.status}</p>
                        <button onClick={() => this.handleDeleteBook(book)}>Remove</button>
                        <EditBookModal book={book} handleEditBook={(event, book) => this.handleEditBook(event, book)}/>
                      </div>
                    </div>
                    {/* </Carousel.Caption> */}
                  </Carousel.Item>
                ))}
              </Carousel>
            </>
          ) : (
            <>
              {/* this.state.showModal is false by default, needs to be set to true if you want modal to show up when no books are found */}
              <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>No Books Found :</Modal.Title>
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
          <BookFormModal handleAddBook={this.handleAddBook}/>
        </Container>
      </>
    );
  }
}

export default BestBooks;
