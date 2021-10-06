import React from 'react';
import UserItem from './UserItem';
import './UserList.css'

function UserList(props) {
    const { users, deleteUser } = props;

    return (
        <div className="showUsers">
            <h2 className="listTitle">Lista utilizatori:</h2>
                <div className="userList">
                { users.map((user, index) => {
                    return <UserItem
                        id={ user.id }
                        name={ user.name }
                        email={ user.email }
                        salary={user.salary}
                        image={user.image}
                        isGoldClient={ user.isGoldClient }
                        key={ index }
                        deleteUser = { deleteUser }
                />
            })}
                </div>
        </div>
    );
}

export default UserList;