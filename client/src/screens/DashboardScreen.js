import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminSendMailAction(subject, body));
  };

  const users = adminInfo.subscribedUsers;

  return (
    <Container>
      <Row>
        <Col xs={12} md={6}>
          <h4>⭐{users.length} users subscribed your newsletter.</h4>
          <Table
            striped
            bordered
            hover
            responsive
            className="text-primary"
            size="sm"
          >
            <thead>
              <tr>
                <th style={{ fontSize: 18 }}>EMAIL ID</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="text-primary "
                  style={{ fontSize: 18 }}
                >
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
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
                rows={4}
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
