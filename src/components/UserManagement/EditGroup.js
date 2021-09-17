import React, { useState, useEffect } from 'react'
import { Paper, Box } from '@material-ui/core';
import ControlTitle from '../Header/ControlTitle';
import UserManagementService from '../../services/UserManagementService';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import CustomTable from '../CustomControls/CustomTable';
import { toast } from 'react-toastify';

function EditGroup() {
    const history = useHistory();
    let { id } = useParams();
    const [newGroup, setNewGroup] = useState(true);
    const [group, setGroup] = useState({
        'description': "",
        'groupId': 0,
        'groupname': ""
    });

    const headers = [
        {
            "id": "rolename",
            "label": "Role",
            "type": "text"
        },
        {
            "id": "description",
            "label": "Description",
            "type": "text"
        },
        {
            "id": "in",
            "label": "Akcija",
            "type": "switch",
            "param": "roleId"
        }
    ];


    const [usedRoles, setUsedRoles] = useState([]);

    const getGroup = (id) => {
        UserManagementService.getGroup(id).then((res) => {
            console.log(res.data);
            setGroup(res.data);
            setUsedRoles(res.data.roles)
            setNewGroup(false);
        });
    }


    const getGroupInit = () => {
        UserManagementService.getGroupInit().then((res) => {
            setUsedRoles(res.data.roles)
            setNewGroup(true);
        });
    }

    const saveGroup = () => {
        let groupForSave = {
            'description': group.description,
            'groupId': group.groupId,
            'groupname': group.groupname,
            'roles': usedRoles
        }
        console.log(groupForSave);

        UserManagementService.saveGroup(groupForSave).then((res) => {
            setGroup(res.data);
            toast.info("Grupa " + group.groupname + " je uspešno sačuvana.")
            history.push("/groups");

        });
    }


    useEffect(() => {
        if (id !== undefined) {
            getGroup(id);
        }
    }, [id]);


    useEffect(() => {
        getGroupInit();
    }, []);

    function handleChange(ev) {
        setGroup({ ...group, [ev.target.id]: ev.target.value });
    }

    const handleSwitchChange = (id) => {
        console.log(id);
        var temp = usedRoles.map(el => el.roleId === id ? { ...el, in: el.in ? false : true } : el);
        setUsedRoles(temp);
    }

    return (
        <div>
            <Paper

            >
                <Box m={5} p={3}>
                    <div>
                        <ControlTitle
                            title={newGroup ? "Add New Group" : "Edit Group"}
                        />
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Group Name:</label>
                        <div className="col-sm-10">
                            <div><input type="text"
                                id="groupname"
                                className="form-control"
                                value={group.groupname}
                                onChange={handleChange} /></div>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Description:</label>
                        <div className="col-sm-10">
                            <div><input type="text"
                                id="description"
                                className="form-control"
                                value={group.description}
                                onChange={handleChange} /></div>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <CustomTable
                            headers={headers}
                            data={usedRoles.sort((a, b) => a.roleId - b.roleId)}
                            edit={setUsedRoles}
                            switchFunction={handleSwitchChange}
                        />
                    </div>
                    <div className="mb-3 row">
                        <div className="col-sm-10">
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-secondary mr-2 mt-2" onClick={saveGroup}>Save</button>
                        </div>
                    </div>
                </Box>
            </Paper>
        </div>
    )
}

export default EditGroup
