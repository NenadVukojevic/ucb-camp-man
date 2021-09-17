import React, { useState, useEffect } from 'react'
import { Paper, Box } from '@material-ui/core';
import ControlTitle from '../Header/ControlTitle';
import UserManagementService from '../../services/UserManagementService';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';


function EditRole() {
    const history = useHistory();
    let { id } = useParams();
    const [newRole, setNewRole] = useState(true);
    const [role, setRole] = useState({
        'description': "",
        'roleId': 0,
        'rolename': ""
    });

    const getRole = (id) => {
        UserManagementService.getRole(id).then((res) => {
            console.log(res.data);
            setRole(res.data);
            setNewRole(false);
        });
    }

    useEffect(() => {
        if (id !== undefined) {
            getRole(id);
        }
    }, [id]);


    const saveRole = () => {
        let roleForSave = {
            'description': role.description,
            'roleId': role.roleId,
            'rolename': role.rolename
        }
        console.log(roleForSave);

        UserManagementService.saveRole(roleForSave).then((res) => {
            setRole(res.data);
            toast.info("Rola " + role.rolename + " je uspešno sačuvana.")
            history.push("/roles");

        });
    }


    function handleChange(ev) {
        setRole({ ...role, [ev.target.id]: ev.target.value });
    }

    return (
        <div>
<Paper

>
    <Box m={5} p={3}>
        <div>
            <ControlTitle
                title={newRole ? "Add New Role" : "Edit Role"}
            />
        </div>
        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Role Name:</label>
            <div className="col-sm-10">
                <div><input type="text"
                    id="rolename"
                    className="form-control"
                    value={role.rolename}
                    onChange={handleChange} /></div>
            </div>
        </div>
        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Description:</label>
            <div className="col-sm-10">
                <div><input type="text"
                    id="description"
                    className="form-control"
                    value={role.description}
                    onChange={handleChange} /></div>
            </div>
        </div>
       
        <div className="mb-3 row">
            <div className="col-sm-10">
            </div>
            <div className="col-sm-2">
                <button type="button" className="btn btn-secondary mr-2 mt-2" onClick={saveRole}>Save</button>
            </div>
        </div>
    </Box>
</Paper>            
        </div>
    )
}

export default EditRole
