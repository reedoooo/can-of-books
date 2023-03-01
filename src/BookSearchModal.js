import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import placeHolderImage from "./placeHolder.png";

export default class BookSearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
  }
  handleCloseModal() {
    this.setState({

      showModal: false,
    });
  }

  handleShowModal() {
    this.setState({ showModal: true });
  }
  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="bg-image hover-overlay ripple shadow-1-strong rounded"
            data-mdb-ripple-color="light"
          >
            <img
              className="w-100"
              src={this.props.books.image || placeHolderImage}
              alt={this.props.books.title}
            />
            <div
              className="overlay hover-overlay mask text-light d-flex justify-content-center flex-column text-center"
              data-mdb-ripple-color="light"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <h3>
                <i className="fas">{this.props.books.title}</i>
              </h3>
              <p className="m-0">{this.props.books.description}</p>
              <p className="m-0">Status: {this.props.books.status}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
