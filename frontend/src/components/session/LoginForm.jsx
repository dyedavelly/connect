import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import './LoginForm.scss';

function LoginForm() {
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

  const handleClick = () => {
    const email = 'demo@user.com';
    const password = 'password';
    return dispatch(sessionActions.login({email, password }))
  };

  return (
    <>
    <div className="container">
      <div className="signin-box">
        <h2>Sign In</h2>
        <p>Stay updated on your professional world</p>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
          <input type="text" placeholder="Email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <button type="submit" className="sign-in-button">Sign in</button>
        </form>
      </div>
    </div> 
    <p className="join-now">New to connect? <Link to={"/signup"}>Join now</Link></p>
    <p onClick={handleClick}  className="join-now"><a>Login as Demo User</a></p>
    </>
  );
}

export default LoginForm;
