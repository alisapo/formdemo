import React from 'react';

const UserCard = ({ obj }) => {
  return (
    <div>
      {
        Array.from(obj).map(user => (
          <div className="user-card" key={user.id}>
            <div className="user-id">{user.id}</div>
            <div className="user-name">{user.username}</div>
            <div className="user-join">{user.date_joined}</div>
            <div className="user-login">{user.last_login}</div>
            {user.is_active ? <div className="user-active">Active</div> : <div className="user-activestaff">Inactive</div>}
            {user.is_staff ? <div className="user-staff">Staff</div> : <div className="user-staff">No staff</div>}
            {user.is_superuser ? <div className="user-super">Superuser</div> : <div className="user-super">User</div>}
          </div>
        ))}
    </div>
  )
}

export default UserCard;
