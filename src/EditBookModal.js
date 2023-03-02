import React from "react";
import { Button, Form, FormText, Modal } from "react-bootstrap";

class EditBookModal extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      show: false,
      title: this.props.book.title,
      description: this.props.book.description,
      status: this.props.book.status
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleTitleInputChange = (event) => {
    this.setState({title: event.target.value})
  }

  handleShowModal = () => {
    this.setState({show: !this.state.show})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleEditBook(event, this.props.book);
    this.handleShowModal();
  }

  render(){
    return(
      <>
        <Button onClick={this.handleShowModal} >Edit</Button>

        <Modal show={this.state.show} onHide={this.handleShowModal} >
          <Modal.Header closeButton>Edit Book</Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>

              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  value={this.state.title}
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
                  value={this.state.description}
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={this.state.status}
                  onChange={this.handleInputChange}
                  required
                >
                  <option value="">Select status</option>
                  <option value="Unread">Unread</option>
                  <option value="Reading">Reading</option>
                  <option value="Read">Read</option>
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
        </Modal>
      </>
    )
  }
}

export default EditBookModal;