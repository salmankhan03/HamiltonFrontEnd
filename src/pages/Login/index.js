import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './style.css';
import AuthServices from "../../services/AuthServices";
import Cookies from 'js-cookie';
import {setUserData, setUserToken} from "../../redux/action/auth-action";
import {useDispatch} from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    room_no: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
        AuthServices.allUserLogin(formData).then((resp) => {
          if (resp?.ResponseCode === '1') {
            const cookieTimeOut = 1000;
            dispatch(setUserData({
              resp
            }))
            dispatch(setUserToken(
              resp?.authentication_token
            ))
            Cookies.set('userToken', JSON.stringify(resp?.authentication_token), {
              expires: cookieTimeOut,
            });
            setFormData({
                room_no: '',
                password: ''
            });

            switch (resp.role) {
                case 'admin':
                  return  navigate('/admin', { replace: true });
                case 'kitchen':
                  return  navigate('/kitchen', { replace: true });
                case 'concierge':
                  return  navigate('/concierge', { replace: true });
                default:
                  return  navigate('/admin', { replace: true });
              }

          
          }
        }).catch((error) => {
          console.log('something went wrong', error)

        })
      } catch (error) {

        console.error('Login failed:', error);
      }


    console.log('room_no:', formData.room_no);
    console.log('Password:', formData.password);

   
  };

  return (
    <div className="login-page">
      <Container fluid className="vh-100 d-flex align-items-center">
        <Row className="w-100">
          <Col md={8} className="d-none d-md-block image-section">
            <div className="overlay">
              <h2>DINNING APP</h2>
              <p>Welcome to Voyager: The Missing Admin for Laravel</p>
            </div>
          </Col>

          <Col xs={12} md={4} className="form-section d-flex align-items-center justify-content-center">
            <div className="form-container">
              <h3 className="text-center mb-4">Sign in below:</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formroom_no">
                  <Form.Label>Room no</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Room No"
                    name="room_no"
                    value={formData.room_no}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formCheckbox">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
