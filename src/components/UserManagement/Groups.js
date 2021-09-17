import React, { useState, useEffect } from 'react'
import CustomTable from '../CustomControls/CustomTable';
import UserManagementService from '../../services/UserManagementService';
import ControlTitle from '../Header/ControlTitle';
import { useHistory } from 'react-router-dom';

function Groups() {
    const history = useHistory();

    const [groups, setGroups] = useState([{
        'description': "",
        'groupId': 0,
        'groupname': ""
    }]);

    const headers = [
        {
            "id": "groupname",
            "label": "Group Name",
            "type": "text"
        },
        {
            "id": "description",
            "label": "Description",
            "type": "text"
        },
        {
            "id": "groupId",
            "label": "Akcija",
            "type": "edit_delete"
        }
    ];


    const getData = () => {
        UserManagementService.getGroups().then((res) => {
            setGroups(res.data);
            console.log(res.data);
        });
    }

    useEffect(() => {
        getData();
    }, []);

    const onEdit = (id) => {
        console.log("onEdit", id);
        history.push("/edit-group/" + id);
    }

    const onDelete = (id) => {
        console.log("delete: " + id);
        UserManagementService.deleteGroup(id).then(() => {
            getData();
        })
    }

    const onAddNew = () => {
        console.log("add New")
        history.push("/edit-group/")
    }
    return (
        <div>
            <div>
                <ControlTitle
                    title="List of Terminal Groups"
                />
            </div>
            <div className="text-right">
                <button type="button" className="btn btn-secondary btn-sm mb-2" onClick={onAddNew}>Add New</button>
            </div>
            <div className="mb-3 row">
                <CustomTable
                    headers={headers}
                    data={groups}
                    edit={onEdit}
                    onDelete={onDelete}
                />
            </div>
        </div>
    )
}

export default Groups
