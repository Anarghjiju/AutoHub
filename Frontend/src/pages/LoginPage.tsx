import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/loginPage.css';
import logincar from '../assets/logincar.png';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedinIn, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { auth } from '../firebase';
import { setPersistence, browserSessionPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { useUserContext } from '../UserContext'; // Import your custom hook

const LoginForm: React.FC = () => {
  const navigate = useNavigate(); 
  const { setUser } = useUserContext(); // Get setUser from UserContext
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      // Set session persistence
      await setPersistence(auth, browserSessionPersistence).then(() => {
        // Now sign in
        return signInWithEmailAndPassword(auth, email, password);
      });

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data from your endpoint
      const response = await axios.get(`http://localhost:3003/api/users/${user.uid}`);
      const userData = response.data;

      // Check if user is admin
      if (!userData.isAdmin) {
        setUser(userData); // Set the user data in context
        navigate('/'); // Redirect to the home page
      } else {
        setError('You do not have admin access.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid email or password.');
    }
  };

  const handleSocialLogin = (platform: string) => {
    console.log(`Login with ${platform} clicked`);
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); 
  };

  return (
    <section className="d-flex justify-content-center align-items-center">
      <div className="row g-0">
        <div className="col-md-6 d-flex align-items-center">
          <img src={logincar} className="img-fluid rounded-start" alt="Sample" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div className="col-md-6">
          <div className="card-body p-5">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="d-flex flex-row align-items-center justify-content-center">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                <div className='signin-btn'>
                  <button type="button" className="btn btn-floating mx-1" onClick={() => handleSocialLogin('Google')}>
                    <FontAwesomeIcon icon={faGoogle} />
                  </button>
                  <button type="button" className="btn btn-floating mx-1" onClick={() => handleSocialLogin('Twitter')}>
                    <FontAwesomeIcon icon={faTwitter} />
                  </button>
                  <button type="button" className="btn btn-floating mx-1" onClick={() => handleSocialLogin('LinkedIn')}>
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </button>
                </div>
              </div>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>

              <h3 id="loginText" className="text-center fw-bold mb-4">Login</h3>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3">Email address</label>
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form3Example4">Password</label>
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    id="form2Example3"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="form2Example3">Remember me</label>
                </div>
                <a href="#!" className="text-body">Forgot password?</a>
              </div>

              <div className="text-center mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                  onClick={handleLogin}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{' '}
                  <a className="link-danger" onClick={handleRegisterRedirect}>
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
