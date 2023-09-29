import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import '../styles/SignupPage.css';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const navigate = useNavigate();

  const handleSignup = async () => {
        // Validation
        let validationErrors = [];

        if (!name.trim()) {
            validationErrors.push("Full Name is required!");
        }
    
        if (!email.trim()) {
            validationErrors.push("Email is required!");
        }
    
        if (!password.trim()) {
            validationErrors.push("Password is required!");
        }
    
        // If validation errors exist, update the message state
        if (validationErrors.length > 0) {
            setMessage(validationErrors.join(' '));
            setIsSuccessful(false); // set as not successful to show the alert as an error
            return;
        }

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccessful(true);
        setMessage('Signup successful! You will be redirected to login.');

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setIsSuccessful(false);
        setMessage(data.error);
      }
    } catch (error) {
      setIsSuccessful(false);
      setMessage('An error occurred. Please try again later.');
      console.error('There was an error signing up:', error);
    }
  };

  return (
    <div className="container-fluid bg-dark vh-100">
        <div className="row justify-content-center align-items-center h-100">
            <div className="col-md-6 col-sm-10">
                <div className="card text-white bg-dark mb-3">
                    <div className="card-body text-center">
                        <img src="../logo@2x.png" style={{ width: '185px' }} alt="logo" />
                        <h5 className="mt-1 mb-5 pb-1">Find your favorite movies</h5>
                        <p className="mb-4">Sign up to create your free account</p>

                        <input 
                            disabled={isSuccessful}
                            type='text' 
                            className="form-control mb-4 bg-secondary text-white" 
                            placeholder='Full Name' 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input 
                            disabled={isSuccessful}
                            type='email' 
                            className="form-control mb-4 bg-secondary text-white" 
                            placeholder='Email address' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input 
                            disabled={isSuccessful}
                            type='password' 
                            className="form-control mb-4 bg-secondary text-white" 
                            placeholder='Password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button 
                            className="btn btn-primary w-100 mb-2 btn-signup" 
                            onClick={handleSignup}
                        >
                            Sign up
                        </button>
                        <p>or</p>
                        <button className="btn btn-light w-100 mb-4">Sign up with Google</button>

                        <div className="d-flex justify-content-center mb-4">
                            <p className="mb-0 me-2">Already have an account?</p>
                            <Link to="/login" className="btn btn-outline-danger login-btn">
                                Log in
                            </Link>
                        </div>

                        <div className={isSuccessful ? "alert alert-success" : "alert alert-danger"}>
                            {message}
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
    </div>
);

}

export default SignupPage;
