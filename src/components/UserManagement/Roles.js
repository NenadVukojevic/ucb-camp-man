import React, { useState, useEffect } from 'react'
import CustomTable from '../CustomControls/CustomTable';
import UserManagementService from '../../services/UserManagementService';
import ControlTitle from '../Header/ControlTitle';
import { useHistory } from 'react-router-dom';

function Roles() {
    const history = useHistory();

    const [roles, setRoles] = useState([{
        'description': "",
        'roleId': 0,
        'rolename': ""
    }]);

    const headers = [
        {
            "id": "rolename",
            "label": "Role Name",
            "type": "text"
        },
        {
            "id": "description",
            "label": "Description",
            "type": "text"
        },
        {
            "id": "roleId",
            "label": "Akcija",
            "type": "edit_delete"
        },
    ];


    function getRolesData(){
         UserManagementService.getRoles().then((res) => {
            setRoles(res.data);
            console.log(res.data);
        });
    }

    useEffect(() => {
       getRolesData();
    }, []);

    const onEdit = (id) => {
        console.log("onEdit", id);
        history.push("/edit-role/" + id);
    }

    const onAddNew = () => {
        console.log("add New")
        history.push("/edit-role/")
    }

    const onDelete = (id) =>{
        console.log("delete: " + id);
        UserManagementService.deleteRole(id).then(()=>{
            getRolesData();
        })
    }

    return (
        <div>
             <div>
                <ControlTitle
                    title="List of Roles"
                />
            </div>
            <div className="text-right">
                <button type="button" className="btn btn-secondary btn-sm mb-2" onClick={onAddNew}>Add New</button>
            </div>
            <div className="mb-3 row">
                <CustomTable
                    headers={headers}
                    data={roles}
                    edit={onEdit}
                    onDelete={onDelete}
                />
            </div>
        </div>
    )
}

export default Roles
