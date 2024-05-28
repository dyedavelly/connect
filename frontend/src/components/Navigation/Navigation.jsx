import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';


function Navigation() {
  const sessionUser = useSelector(state => state.session.currentUserId);

  const sessionLinks = sessionUser ? (
    <li>
    <ProfileButton user={sessionUser} />
    </li>
  ) : null;

  return (
     <ul>
       <NavLink to="/">
         <img src="" alt="logo" />
       </NavLink>
      {sessionLinks}
     </ul>
  );
}

export default Navigation;
