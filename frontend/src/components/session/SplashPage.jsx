import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import './SplashPage.css';

function SplashPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.currentUserId);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
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
  }

  return (
    <>
    <div className="main-container">
    <p className="home-page-heading">Welcome to your professional community</p>
      <div className="sign-in-container">
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
          <label>Email</label>
          <input type="text" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <label>Password</label>
          <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <button type="submit" className="sign-in-button">Sign in</button>
        </form>
        <p className="join-now"><Link to={"/signup"}>New to connect? Join now</Link></p>
      </div>
    </div> 
    
    </>
  );
}

export default SplashPage;
