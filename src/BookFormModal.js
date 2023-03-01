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
