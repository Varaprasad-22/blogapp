import { useState, useEffect } from 'react';
import { axiosWithToken } from '../../axiosWithToken.js';
import { useNavigate, Outlet } from 'react-router-dom';

function Users() {
  const [UsersList, setUsersList] = useState([]);
  const navigate = useNavigate();

  const getUsersList = async () => {
    try {
      let res = await axiosWithToken.get('http://localhost:4000/admin-api/usercollection');
      setUsersList(res.data.payload);
    } catch (error) {
      console.error('Error fetching users list:', error);
    }
  };

  const deleteUser = async (userName) => {
    let user = UsersList.find(user => user.userName === userName);
    delete user._id;
    let res = await axiosWithToken.put(`http://localhost:4000/admin-api/user/${userName}`, user);
    console.log(res);
    if (res.data.message === "deleted") {
      setUsersList(UsersList.map(u => u.userName === userName ? { ...u, status: res.data.payload } : u));
      window.alert("User deleted");
      navigate('/admin-profile');
    }
  };

  const restoreUser = async (userName) => {
    let user = UsersList.find(user => user.userName === userName);
    delete user._id;
    let res = await axiosWithToken.put(`http://localhost:4000/admin-api/user/${userName}`, user);
    console.log(res);
    if (res.data.message === "restored") {
      setUsersList(UsersList.map(u => u.userName === userName ? { ...u, status: res.data.payload } : u));
      window.alert("User restored");
      navigate('/admin-profile');
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
        {UsersList.map((user) => (
          <div className="col" key={user.userName}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{user.userName}</h5>
                <p className="card-text">
                  {user.userType}
                </p>
                {user.status === true ?
                  (<button className="custom-btn btn-4" onClick={() => deleteUser(user.userName)}>
                    <span>Delete</span>
                  </button>) :
                  (<button className="custom-btn btn-4" onClick={() => restoreUser(user.userName)}>
                    <span>Restore</span>
                  </button>)}
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">
                  Press on Delete to delete the user and cannot be restored
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  )
}

export default Users;
