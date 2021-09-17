import React, { useState, useEffect } from 'react'
import CustomTable from '../CustomControls/CustomTable';
import UserManagementService from '../../services/UserManagementService';
import ControlTitle from '../Header/ControlTitle';
import { useHistory } from 'react-router-dom';

function Users() {
    const history = useHistory();

    const [users, setUsers] = useState([{
        'fullName': "",
        'userId': 0,
        'username': "",
        'email': ""
    }]);

    const headers = [
        {
            "id": "fullName",
            "label": "Full Name",
            "type": "text"
        },
        {
            "id": "username",
            "label": "Username",
            "type": "text"
        },
        {
            "id": "email",
            "label": "E-mail",
            "type": "text"
        },
        {
            "id": "userId",
            "label": "Akcija",
            "type": "edit_delete"
        },
    ];


    function getData(){
         UserManagementService.getUsers().then((res) => {
            setUsers(res.data);
            console.log(res.data);
        });
    }

    useEffect(() => {
       getData();
    }, []);

    const onEdit = (id) => {
        console.log("onEdit", id);
        history.push("/edit-user/" + id);
    }

    const onAddNew = () => {
        console.log("add New")
        history.push("/edit-user/")
    }

    const onDelete = (id) =>{
        console.log("delete: " + id);
        UserManagementService.deleteUser(id).then(()=>{
            getData();
        })
    }

    return (
        <div>
             <div>
                <ControlTitle
                    title="List of users"
                />
                <div>{localStorage.getItem('jwt')}</div>
            </div>
            <div className="text-right">
                <button type="button" className="btn btn-secondary btn-sm mb-2" onClick={onAddNew}>Add New</button>
            </div>
            <div className="mb-3 row">
                <CustomTable
                    headers={headers}
                    data={users}
                    edit={onEdit}
                    onDelete={onDelete}
                />
            </div>
        </div>
    )
}

export default Users
