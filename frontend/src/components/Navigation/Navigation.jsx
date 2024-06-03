import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.scss';
import { Navigate } from 'react-router-dom';


function Navigation() {
  const sessionUser = useSelector(state => state.session.currentUserId);
  if (!sessionUser) return <Navigate to="/" replace={true} />;

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

  const headerClass = sessionUser ? 'header logged-in' : 'header logged-out';
  
  return (
     <div className={headerClass}>
       <NavLink to="/">
         <img className="main-logo" src="/connect-logo.png" alt="logo" />
       </NavLink>
      {sessionLinks}
     </div>
  );
}

export default Navigation;
