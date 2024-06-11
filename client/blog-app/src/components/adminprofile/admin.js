import { NavLink, Outlet } from "react-router-dom";

function AdminProfile() {
  return (
    <>
      <p className="text-center">Admin profile</p>
      <ul className="nav justify-content-around fs-3">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/admin-profile/articles"
            style={{ color: "var(--dark-green)" }}
          >
            Articles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/admin-profile/users"
            style={{ color: "var(--dark-green)" }}
          >
            Users
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/admin-profile/authors"
            style={{ color: "var(--dark-green)" }}
          >
            Authors
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
}

export default AdminProfile;
