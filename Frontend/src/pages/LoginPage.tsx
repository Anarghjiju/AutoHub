import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/loginPage.css';
import logincar from '../assets/logincar.png';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faGoogle, faInstagram } from '@fortawesome/free-brands-svg-icons';

const LoginForm: React.FC = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleLogin = () => {
    console.log('Login clicked:', { email, password, rememberMe });
  };

  const handleSocialLogin = (platform: string) => {
    console.log(`Login with ${platform} clicked`);
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); 
  };

  return (
    <section className="vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow-lg" style={{ width: '80%',height:'80%',borderRadius:'25px' }}>
        <div className="row g-0">
          <div className="col-md-6 d-flex align-items-center">
            <img src={logincar} className="img-fluid rounded-start" alt="Sample" style={{ width: '100%' }} />
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="card-body p-5">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="d-flex flex-row align-items-center justify-content-center">
                  <p className="lead fw-normal mb-0 me-3">Sign in with</p>
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

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example3">Email address</label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example4">Password</label>
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
                    <a href="#!" className="link-danger" onClick={handleRegisterRedirect}>
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
