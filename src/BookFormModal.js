import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

class BookFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      description: "",
      show: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, status } = this.state;
    if (!title || !description || !status) {
      return;
    }
    const newBook = { title, description, status };
    this.props.onAddNewBook(newBook);
    this.setState({ title: "", description: "", status: "" });
    this.props.onHide();
  };

  handleShowModal = () => {
    this.setState({ show: true });
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
          Add New Book
        </Button>
        <Modal
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add a new book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  placeholder="Enter title"
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  placeholder="Enter description"
                />
              </Form.Group>
              <Form.Group >
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={this.state.status}
                  onChange={this.handleChange}
                  placeholder="Select status"
                >
                  <option value="">Select Status</option>
                  <option value="Read">Read</option>
                  <option value="Reading">Reading</option>
                  <option value="Want to Read">Want to Read</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default BookFormModal;
