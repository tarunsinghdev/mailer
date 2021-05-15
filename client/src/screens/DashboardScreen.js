import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { adminSendMailAction } from '../store/actions/adminActions';

//Display total subscribed users
//FORM containing subject and body

const DashboardScreen = ({ history }) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.adminSendMail
  );
  const { adminInfo } = useSelector((state) => state.adminLogin);

  useEffect(() => {
    if (!adminInfo.email) {
      history.push('/');
    }
  }, [adminInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminSendMailAction(subject, body));
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2>Send Your Mail</h2>
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">Mail Sent</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Body </Form.Label>
              <Form.Control
                required
                as="textarea"
                row={6}
                type="text"
                placeholder="Start writing..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Send mail
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardScreen;
