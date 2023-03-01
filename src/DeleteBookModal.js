import React, { Component } from "react";
// import PropTypes from "prop-types";
import { Button, Form, FormText, Modal } from "react-bootstrap";

export default class DeleteBookModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      showModal: false,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

handleDeleteSubmit = (e) => {
  e.preventDefault();
    const bookId = this.state._id;
  if (this.props.onDelete) {
    this.props.onDelete(bookId);
  }
  this.handleCloseModal();
};

  handleCloseModal = () => {
    this.setState({
      _id: "",
      showModal: false,
    });
  };

  render() {
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
                  value={this.state._id}
                  onChange={this.handleInputChange}
                  required
                />
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
