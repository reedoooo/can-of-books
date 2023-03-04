import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Login from "./Auth/Login";

class LoginPage extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {

    }
  }

  render() {
    return(
      <Container style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <Card style={{width: '25%', height: '35%'}}>
          <Card.Header style={{textAlign: 'center'}}>Welcome!</Card.Header>
          <Card.Body style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <h4 style={{textAlign: 'center'}}>Please Sign-In to Get Started</h4>
            <Login />
          </Card.Body>
        </Card>
      </Container>
    )
  }
}

export default LoginPage;