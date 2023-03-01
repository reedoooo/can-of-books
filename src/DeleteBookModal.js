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
