import { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import myPhoto from "./headshot.png";
import coCreatorPhoto from "./headshot.png";

class Profile extends Component {
  render() {
    return (
      <Container className="my-5">
        <h2 className="text-center mb-4">About Us</h2>
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={6} className="mb-4">
            <Image src={myPhoto} fluid />
          </Col>
          <Col xs={12} md={6}>
            <h3>Reed Vogt</h3>
            <p>
              Hi, I'm Reed! I'm a passionate developer who loves building
              websites and applications that make people's lives easier. I also
              love books which is why I created this app!
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={6} className="mb-4 order-md-2">
            <Image src={coCreatorPhoto} fluid />
          </Col>
          <Col xs={12} md={6} className="order-md-1">
            <h3>Kawika Miller</h3>
            <p>
              Hi, I'm Kawika! I'm a co-creator of this website and I'm passionate
              about using technology to make the world a better place. I have
              experience in frontend and backend development, and I'm always
              excited to learn new things and take on new challenges.
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Profile;
