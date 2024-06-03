import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.scss';

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.currentUserId);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Navigate to="/feed" replace={true}/>;

  const handleSubmit = (e) => {
    e.preventDefault();
      setErrors([]);
      return dispatch(sessionActions.signup({ email, password }))
        .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  return (
    <>
     <p className="main-title">Make the most your professional life</p>
      <div className="container">
      <div className="signup-box">
        <form onSubmit={handleSubmit}>
          <ul className="errors">
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
          <label>Email</label>
          <input type="text" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <label>Password (6+ characters) </label>
          <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <p className="terms">
                  By clicking Continue, you agree to connect’s <a href="#">User Agreement</a>, <a href="#">Privacy Policy</a>, and <a href="#">Cookie Policy</a>.
          </p>
          <button type="submit" className="sign-up-button">Agree & Join</button>
        </form>
        <p className="sign-in">Already on connect? <Link to={"/login"}>Sign in</Link></p>
      </div>
    </div> 
    
    </>
  );
}

export default SignupForm;
