import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import app from '../../firebase/firebase.init';
import './Login.css'

const auth = getAuth(app);

const Login = () => {
    const [user, setUser] = useState({});
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [email, setEMail] = useState('');

    const handleSubmit = (e) => {

        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        form.reset();
        setSuccess(false)
        setError('');
        

        if(!/(?=.*?[#?!@$%^&*-])/.test(password)){
            setError('Please provide at least one special character')
            return;
        }
// signInWithEmailAndPassword
        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user;
            console.log(user)
            setUser(user)
            setSuccess(true)
        })
        .catch(error => {
            const errorMessage = error.code
            console.error(errorMessage);
            setError(errorMessage)
        });
    }

    const handleEmailBlur = (e) => {
        const email = e.target.value;
        setEMail(email);
    }
//Password Reset
    const handlePasswordReset = () => {
        if(!email){
            toast('Enter your email address')
            return;
        }
        sendPasswordResetEmail(auth, email )
        .then(() => {
            // alert('Check your main to get your password reset')
            toast('Check your email to get your password reset')
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage)
        })
    }
    return (
        <div className='container w-50 mx-auto rounded p-4 login-container'>
            <h2>Welcome to Our Login Page!!!</h2>
            <p>{user.email}</p>
           <Form onSubmit = {handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={handleEmailBlur} type="email" name="email" placeholder="Enter email" required/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required/>
                </Form.Group>

               <p className='text-danger'>{error}</p> 
                {success && <p className='text-success'>Logged in Successfully</p>}

                <Button variant="primary" type="submit">
                    Login here
                </Button>
                <ToastContainer></ToastContainer>
                <p className='mt-3'><small>New to this website? Please <Link to='/signup'>Sing up/ Register here</Link></small></p>
                <p className='mt-3'><small>Forget your password? Please Enter Email and <button onClick = {handlePasswordReset} type="button" className='btn btn-link'>Reset Password</button></small></p>
            </Form>
        </div>
    );
};

export default Login;