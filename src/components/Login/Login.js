import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import './Login.css'

const Login = () => {
    return (
        <div className='container w-50 mx-auto rounded p-4 login-container'>
            <h2>Welcome to Our Login Page!!!</h2>
           <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <p>New to this website? please <Link to='/signup'>Sing up/ Register here</Link></p>
                <Button variant="primary" type="submit">
                    Login here
                </Button>
            </Form>
        </div>
    );
};

export default Login;