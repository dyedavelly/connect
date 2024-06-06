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
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [nameScreen, setNameScreen] = useState(false);
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Navigate to="/feed" replace={true}/>;

  const agreeButton = (e) => {
       e.preventDefault();
       setNameScreen(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
      setErrors([]);
      return dispatch(sessionActions.signup({ email, password, first_name, last_name }))
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
          <ul className="errors">
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
         {!nameScreen && ( 
          <>
          <form onSubmit={agreeButton}>
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
        </>
         )} 
          {nameScreen && ( 
          <form onSubmit={handleSubmit}>
          <label>First name</label>
          <input type="text" className="input-field" value={first_name} onChange={(e) => setFirstname(e.target.value)} required/>
          <label>Last name</label>
          <input type="text" className="input-field" value={last_name} onChange={(e) => setLastname(e.target.value)} required/>
          <button type="submit" className="sign-up-button">Continue</button>
        </form>
         )} 
      </div>
    </div> 
    
    </>
  );
}

export default SignupForm;
