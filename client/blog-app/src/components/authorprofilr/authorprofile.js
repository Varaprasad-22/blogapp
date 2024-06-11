import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthorProfile() {
  const { currentUser } = useSelector(state => state.userAuthoruserAuthorLoginReducer);

  return (
    <div className="author-profile p-3">
      <p>AuthorProfile</p>
      <ul className="nav justify-content-around fs-3">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to={`/author-profile/articles-by-author/${currentUser.userName}`}
            style={{ color: "var(--dark-green)" }}
          >
            Articles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/author-profile/add-article"
            style={{ color: "var(--dark-green)" }}
          >
            Add new
          </NavLink>
        </li>
        <Outlet />
      </ul>
    </div>
  );
}

export default AuthorProfile;
