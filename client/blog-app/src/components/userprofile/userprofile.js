
import { NavLink, Outlet } from "react-router-dom";

function UserProfile() {
  return (
    <>
    <p>User profile</p>
     <NavLink to="/user-profile/articles" className='fs-4 text-primary nav-link mt-4'>Articles</NavLink>
      <Outlet />
    </>
  );
}

export default UserProfile;