import React from 'react';
import './UserList.css'

function UserItem(props) {
    const {name, email, isGoldClient, salary, image, id, deleteUser} = props;

    return (
        <div className="userItem">
            <h3> { name }</h3>
            <p>Email: { email }</p>
            { salary
                ? <p>Salariu: { salary } USD</p>
                : <p>Neinregistrat.</p>
            }          
            { isGoldClient
                ? <h3>GOLD Client</h3>
                : null
            }
            
            { image
                ? <img id="profilePhoto" src={ image } alt={name}/>
                : <p>fotografie lipsa.</p>
            }  
            <button onClick={() => deleteUser(id)}>sterge user</button>
 
        </div>
    );
}

export default UserItem;