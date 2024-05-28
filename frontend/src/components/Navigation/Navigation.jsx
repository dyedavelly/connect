import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation() {
  const sessionUser = useSelector(state => state.session.currentUserId);

  const sessionLinks = sessionUser ? (
    <div className="header-links">
    <ProfileButton user={sessionUser} />
    </div>
  ) : (
    <div className="header-links">
        <NavLink className="nav-links primary" to="/signup">Join now</NavLink>
        <NavLink className="nav-links secondary" to="/login">Sign in</NavLink>
    </div>
  );

  return (
     <div className='header'>
       <NavLink to="/">
         <img className="main-logo" src="/connect-logo.png" alt="logo" />
       </NavLink>
      {sessionLinks}
     </div>
  );
}

export default Navigation;
