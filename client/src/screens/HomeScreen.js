import { useState } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';

const HomeScreen = () => {
  const [email, setEmail] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submitted!');
    console.log(email);
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={7}>
            <h1>Hello, world!</h1>
            <Image
              style={{ width: '60%' }}
              className="justify-content-md-center"
              src="/images/newsletter.svg"
              rounded
            />
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <Form onSubmit={submitHandler} className="py-3">
              <Form.Label>Enter Your Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" className="btn-md my-3" variant="primary">
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;
