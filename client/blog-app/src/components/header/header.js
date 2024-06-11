import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';
import {useSelector,useDispatch} from 'react-redux';
import { resetState } from '../../redux/slices/userAuthorslice';


function Header() {
  let {loginUserStatus,errMsg,errorOccured,currentUser}=useSelector(state=>state.userAuthoruserAuthorLoginReducer)
let dispatch=useDispatch()
  function signOut(){
    localStorage.removeItem('token')
    dispatch(resetState())
  }
  return (
    
    <nav className="navbar navbar-expand navbar-light ">
      <div className=" container bg-#83f28f">
        <NavLink to="/" className="navbar-brand">
          Blog
        </NavLink>
        <ul className="navbar-nav">
          {loginUserStatus===false?(<>
          {" "}
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/signin" className="nav-link">
              Sign In
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/signup" className="nav-link">
              Sign Up
            </NavLink>
          </li></>):(<>
          <li className='nav-link'>
            <NavLink to="/signin" className="nav-link" onClick={signOut}>
            <span className="lead  fs-3 me-2 fw-1"  style={{ color: "black" ,fontSize:'1rem',textTransform:'capitalize',fontFamily:'fantasy'}}>{currentUser.userName}
                   <sup style={{color:'black',fontSize:'0.6rem'}}>({currentUser.userType})</sup>
                   </span>
                  Signout                                        
            </NavLink>
          </li>
                    </>)}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
