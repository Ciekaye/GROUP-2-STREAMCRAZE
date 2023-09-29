import React, { useState } from 'react';
import '../styles/LoginPage.css'; // Consider renaming this to LoginPage.css
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';  // Import Link and useNavigate for navigation

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleLogin = async () => {
    let validationErrors = [];
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    if (!email.trim() || !emailRegex.test(email)) {
        validationErrors.push("Enter a valid Email address!");
    }
  
    if (!password.trim() || password.length < 4) {
        validationErrors.push("Password must be at least 8 characters!");
    }
  
    // If validation errors exist, update the message state
    if (validationErrors.length > 0) {
        setMessage(validationErrors.join(' '));
        setIsSuccessful(false); // set as not successful to show the alert as an error
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: 'include',  // Important to include session cookies
        });
        
        const data = await response.json();
  
        if (data.success) {
          navigate("/dashboard");  // Redirect to dashboard on success
        } else {
          setMessage(data.error);
          navigate("/login");  // Optionally, redirect to login, but this might be redundant since the user is already on the login page.
        }
      } catch (error) {
        setMessage('An unexpected error occurred. Please try again.');
      }
  };
  
  
  return (
         <div className="container-fluid bg-dark vh-100">
        <div className="row justify-content-center align-items-center h-100">
            <div className="col-md-6 col-sm-10 card">
                <div className="card text-white mb-3">
                    <div className="card-body text-center">
                        <img src="../logo@2x.png" style={{ width: '185px' }} alt="logo" />
                        <h5 className="mt-1 mb-5 pb-1">Find your favorite movies</h5>
                        <p className="mb-4">Please login to your account</p>

                        <input 
                            type='email' 
                            className="form-control mb-4 bg-secondary text-white" 
                            placeholder='Email address' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input 
                            type='password' 
                            className="form-control mb-4 bg-secondary text-white" 
                            placeholder='Password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button 
                            className="btn btn-primary w-100 mb-2 btn-signin" 
                            onClick={handleLogin}
                        >
                            Sign in
                        </button>
                        
                        <a className="text-muted d-block my-2 forgot-pass" href="#!">Forgot password?</a>

                        <div className="d-flex justify-content-center mb-4">
                            <p className="mb-0 me-2">Don't have an account?</p>
                            <Link to="/signup" className="btn btn-outline-danger signup-btn btn-signup2">
                                Sign up
                            </Link>
                        </div>

                        {message && (
                            <div className={isSuccessful ? "alert alert-success" : "alert alert-danger"}>
                                {message}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    </div>
);
    
}

export default LoginPage;
