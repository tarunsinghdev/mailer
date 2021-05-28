import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Message from '../components/Message';
import { userSubscribe } from '../store/actions/userActions';

const HomeScreen = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.userSubscribe
  );

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userSubscribe(email));
  };

  useEffect(() => {
    if (success) {
      setEmail('');
    }
  }, [success]);

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={9} lg={7}>
            <h2>Byte sized news for busy techies.</h2>
            <br />
            <strong style={{ textAlign: 'center' }}>
              Mailer is a daily newsletter with links and the TLDRs of the most
              interesting stories in tech!
            </strong>
            <br />
            <Image
              style={{ width: '70%' }}
              className="justify-content-md-center"
              src="/images/newsletter.svg"
              rounded
            />

            <Form onSubmit={submitHandler} className="py-3">
              {error ? (
                <Message variant="danger">{error}</Message>
              ) : loading ? (
                <Loader />
              ) : null}
              {success ? (
                <Message variant="success">Thank you for signing up</Message>
              ) : null}
              <Form.Label>Enter Your Email</Form.Label>
              <Form.Control
                required
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
