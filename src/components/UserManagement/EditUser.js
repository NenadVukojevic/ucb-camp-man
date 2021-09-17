import React, { useState, useEffect } from 'react'
import { Paper, Box } from '@material-ui/core';
import ControlTitle from '../Header/ControlTitle';
import UserManagementService from '../../services/UserManagementService';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import CustomTable from '../CustomControls/CustomTable';
import { toast } from 'react-toastify';
import AntSwitch from '../CustomControls/AntSwitch';


function EditUser() {
    const history = useHistory();
    let { id } = useParams();
    const [newUser, setNewUser] = useState(true);
    const [user, setUser] = useState({
        'email': "",
        'fullName': "",
        'isApproved': false,
        'password': "",
        'userId': 0,
        'username': ""
    });

    const headers = [
        {
            "id": "groupname",
            "label": "Group",
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
            "param": "groupId"
        }
    ];


    const [usedGroups, setUsedGroups] = useState([{
        'groupName': "",
        'description': "",
        'groupId': "",
        'in': false
    }
    ]);

    const getUser = (id) => {
        UserManagementService.getUser(id).then((res) => {
            console.log(res.data);
            setUser(res.data);
            setUsedGroups(res.data.groups)
            setNewUser(false);
        });
    }

    const getUserInit = () => {
        UserManagementService.getUserInit().then((res) => {
            console.log(res.data);
            setUsedGroups(res.data.groups)
            setNewUser(true);
        });
    }

    const saveUser = () => {
        let userForSave = {
            'email': user.email,
            'fullName': user.fullName,
            'isApproved': user.isApproved,
            'password': user.password,
            'userId': user.userId,
            'username': user.username,
            'groups': usedGroups
        }
        console.log(userForSave);
        
                UserManagementService.saveUser(userForSave).then((res) => {
                    setUser(res.data);
                    toast.info("Korisnik " + user.fullName + " je uspešno sačuvan.")
                    history.push("/users");
        
                });
    }


    useEffect(() => {
        if (id !== undefined) {
            getUser(id);
        }
    }, [id]);

    useEffect(()=>{
        getUserInit();
    }, []);

    function handleChange(ev) {
        setUser({ ...user, [ev.target.id]: ev.target.value });
    }

    const handleSwitchChange = (id) => {
        console.log(id);
        var temp = usedGroups.map(el => el.groupId === id ? { ...el, in: el.in ? false : true } : el);
        setUsedGroups(temp);
    }

    const handleSwitch = () => {
        setUser({ ...user, "isApproved": !user.isApproved })
    }

    return (
        <div>
            <Paper

            >
                <Box m={5} p={3}>
                    <form autoComplete={"off"}>
                        <div>
                            <ControlTitle
                                title={newUser ? "Add New User" : "Edit User"}
                            />
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Full Name:</label>
                            <div className="col-sm-10">
                                <div><input type="text"
                                    id="fullName"
                                    autoComplete="none"
                                    className="form-control"
                                    value={user.fullName}
                                    onChange={handleChange} /></div>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Username:</label>
                            <div className="col-sm-10">
                                <div><input type="text"
                                    id="username"
                                    autoComplete="none"
                                    className="form-control"
                                    value={user.username}
                                    onChange={handleChange} /></div>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Password:</label>
                            <div className="col-sm-10">
                                <div><input type="password"
                                    id="password"
                                    autoComplete="none"
                                    className="form-control"
                                    value={user.password}
                                    onChange={handleChange} /></div>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">E-mail:</label>
                            <div className="col-sm-10">
                                <div><input type="text"
                                    id="email"
                                    autoComplete="none"
                                    className="form-control"
                                    value={user.email}
                                    onChange={handleChange} /></div>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Is Approved:</label>
                            <div className="col-sm-10">
                                <div>
                                    <AntSwitch checked={user.isApproved}
                                        onChange={handleSwitch}
                                    ></AntSwitch>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <CustomTable
                                headers={headers}
                                data={usedGroups.sort((a, b) => a.groupId - b.groupId)}
                                edit={setUsedGroups}
                                switchFunction={handleSwitchChange}
                            />
                        </div>
                        <div className="mb-3 row">
                            <div className="col-sm-10">
                            </div>
                            <div className="col-sm-2">
                                <button type="button" className="btn btn-secondary mr-2 mt-2" onClick={saveUser}>Save</button>
                            </div>
                        </div>
                    </form>
                </Box>
            </Paper>
        </div>
    )
}

export default EditUser
