import React, { useState } from 'react';
import '../styles/register.css';
import RegisterCar from '../assets/RegisterCar.png';
import { auth } from '../firebase'; // Import your Firebase config
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase registration function
import axios from 'axios'; // Import Axios for HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null); // State for error messages

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // Register the user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Prepare user data to send to MongoDB
      const userData = {
        uid: user.uid, // Firebase UID
        name,
        email,
      };
      console.log(userData);

      // Save user data to MongoDB via API
      await axios.post('http://localhost:3003/api/users/register', userData);
      
      // Redirect to home page or any other page after successful registration
      navigate('/login');
    } catch (error) {
      setError("Registration failed! Please try again."); // Set error message for UI
      console.error('Error during registration:', error);
    }
  };

  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <h3 id="registerText" className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</h3>

                  {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}

                  <form className="mx-1 mx-md-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          id="form3Example1c"
                          className="form-control"
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          id="form3Example3c"
                          className="form-control"
                          placeholder="Your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="password"
                          id="form3Example4c"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="password"
                          id="form3Example4cd"
                          className="form-control"
                          placeholder="Repeat your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3c"
                      />
                      <label className="form-check-label" htmlFor="form2Example3c">
                        I agree to all statements in <a href="#!">Terms of service</a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="button" className="btn btn-primary btn-lg" onClick={handleRegister}>
                        Register
                      </button>
                    </div>
                  </form>
                </div>

                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img
                    src={RegisterCar}
                    className="img-fluid"
                    alt="Sample"
                    style={{ width: '100%', maxHeight: '500px' }} // Set max-height or height as needed
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
  );
};

export default Signup;
