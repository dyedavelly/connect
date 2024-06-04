import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import './ProfileButton.scss';


function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);
  
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setShowMenu(false);
        }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);


  return (
    <div className='profile-button-container'>
      <button onClick={toggleMenu} className='profile-button'>
        <FaUserCircle />
      </button>
      {showMenu && (
        <ul className="profile-dropdown" ref={dropdownRef}>
          <li>
            <button onClick={logout}>Sign Out</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;