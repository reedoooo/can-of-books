import React, { Component } from "react";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";

class EditBookForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      searchResults: [],
      book: {},
      _id: this.props.book._id ?? "",
      title: this.props.book.title,
      description: this.props.book.description,
      status: this.props.book.status,
      showModal: false,
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    if (name === "description") {
      this.setState({
        [name]: value,
        prevDescription: this.state.description,
        description: value,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  handleSearchInputChange = (event) => {
    const searchTerm = event.target.value;
    console.log(searchTerm._id);

    this.setState({ searchTerm });

    axios
      .get(`${process.env.REACT_APP_SERVER}books?q=${searchTerm}`)
      .then((response) => {
        console.log(`Search results for "${searchTerm}":`, response.data);
        const filteredResults = response.data.filter(
          (book) =>
            book.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        );
        this.setState({
          searchResults: filteredResults,
        });
      })
      .catch((error) => {
        console.error(
          `Error searching for books with query "${searchTerm}": `,
          error
        );
      });
  };

  //   handleSelect = (title) => {
  //     this.setState({
  //       title,
  //       searchResults: [],
  //     });
  //   };

  handleBookSelect = (book) => {
    this.setState({
      book: {
        _id: book._id,
        title: book.title,
        description: book.description,
        status: book.status,
      },
      searchResults: [],
    });
  };

  handleBookUpdate = (updatedBook) => {
    this.props.onBookUpdated(updatedBook);
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.book._id) {
      console.error("Book ID is undefined");
      return;
    }

    const updatedBook = {
      _id: this.state.book._id,
      title: this.state.book.title,
      description: this.state.description,
      status: this.state.book.status,
    };

    axios
      .put(
        `${process.env.REACT_APP_SERVER}books/${updatedBook._id}`,
        updatedBook
      )
      .then((response) => {
        console.log(`Book with ID ${updatedBook._id} updated successfully`);
        if (typeof this.props.onBookUpdated === "function") {
          this.props.onBookUpdated(response.data);
        }

        if (this.state.prevDescription) {
          axios
            .delete(
              `${process.env.REACT_APP_SERVER}books/${updatedBook._id}/description/${this.state.prevDescription}`
            )
            .then((response) => {
              console.log(`Previous description deleted successfully`);
            })
            .catch((error) => {
              console.error(
                `Error deleting previous description of book with ID ${updatedBook._id}: `,
                error
              );
            });
        }
      })
      .catch((error) => {
        console.error(
          `Error updating book with ID ${updatedBook._id}: `,
          error
        );
      });
  };

  handleShowModal = () => {
    this.setState({
      showModal: true,
      book: this.props.book,
    });
  };

  handleCloseModal = () => {
    this.setState({
      book: this.props.book,
      showModal: false,
    });
  };

  render() {
    console.log(this.props.books);
    console.log(this.state.searchResults);

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
          Edit Book
        </Button>

        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                {/* <Form.Control
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  required
                /> */}
                <Form.Control
                  type="text"
                  placeholder="Search by title"
                  name="searchTerm"
                  value={this.state.searchTerm}
                  onChange={this.handleSearchInputChange}
                />
                {this.state.searchResults.length > 0 && (
                  <div className="search-results">
                    {this.state.searchResults.map((book) => (
                      <div
                        key={book._id}
                        className="search-result"
                        onClick={() => this.handleBookSelect(book)}
                      >
                        {book.title}
                      </div>
                    ))}
                  </div>
                )}
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={this.state.status}
                  onChange={this.handleInputChange}
                >
                  <option value="unread">Unread</option>
                  <option value="reading">Reading</option>
                  <option value="read">Read</option>
                </Form.Control>
              </Form.Group>
              <Button type="submit" className="btn-lg mainButton">
                Update Book
              </Button>
            </Form>

            <hr />

            {/* <Form.Group controlId="formSearch">
              <Form.Label>Search Books</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by title"
                name="searchTerm"
                value={this.state.searchTerm}
                onChange={this.handleSearchInputChange}
              />
            </Form.Group> */}
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default EditBookForm;
