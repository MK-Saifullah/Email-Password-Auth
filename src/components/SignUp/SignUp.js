import React, { useState } from 'react';
import './SignUp.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification} from  'firebase/auth'
import app from '../../firebase/firebase.init';

const auth = getAuth(app);


const SignUp = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSignUp = (e) => {
        
        setSuccess(false);
        setError('');
        
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        // Regular expression
        if(!/(?=.*?[A-Z])/.test(password)){
            setError('Please provide at least one uppercase');
            return;
        }
        if(!/(?=.*?[0-9])/.test(password)){
            setError('Please provide at least one digit');
            return;
        }
        if(!/(?=.*?[#?!@$%^&*-])/.test(password)){
            setError('Please provide at least one special character')
            return;
        }
// createUserWithEmailAndPassword
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log(user)
            setUser(user)
            setSuccess(true);
            form.reset();
            verifyEmail();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            setError(errorMessage)
          });

//sendEmailVerification
        const verifyEmail = () => {
            sendEmailVerification(auth.currentUser)
            .then( () => {
                alert('Please check your mail and verify it')
                // you may use toast
            })
        }
    }
    return (
        <div className='container w-50 mx-auto'>
           <div className='signup-form mt-5 rounded p-3 t-left'>
            <h2 className='text-success'>Please SignUp here !! </h2>
            <h6><small>Email: {user.email}</small></h6>
           <Form onSubmit={handleSignUp}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter Your Name" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required/>
                </Form.Group>
                
                <p className='text-danger'>{error}</p>
                {success ===true && <p className='text-success'>User Successfully Created</p>}
                
                <Button variant="primary" type="submit">
                    SignUp/ Register
                </Button>
            </Form>
            {/* <p className='mt-2'>New to this website?, please <Link to="/register">Register</Link></p>
             */}
              <p><small>Already have an account? please <Link to='/login'>Login</Link></small></p>
           </div>
        </div>
    );
};

export default SignUp;