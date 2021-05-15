import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';

import FormContainer from '../components/FormContainer';
import { adminLogin } from '../store/actions/adminActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const LoginScreen = ({ history, location }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { adminInfo, loading, error } = useSelector(
    (state) => state.adminLogin
  );

  useEffect(() => {
    if (adminInfo.email) {
      history.push('/admin/dashboard');
    }
  }, [adminInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(email, password));
  };

  return (
    <FormContainer>
      <h1>Admin Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
