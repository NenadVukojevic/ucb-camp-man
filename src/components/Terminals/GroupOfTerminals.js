import React, { useState, useEffect } from 'react'
import CustomTable from '../CustomControls/CustomTable';
import TerminalsService from '../../services/TerminalsService';
import ControlTitle from '../Header/ControlTitle';
import { useHistory } from 'react-router-dom';

function GroupOfTerminals() {
    const history = useHistory();

    const [data, setData] = useState([{
        "terminalGroupId": 0,
        "terminalGroupName": ""
    }]);

    const headers = [
        {
            "id": "terminalGroupId",
            "label": "ID",
            "type": "text"
        },
        {
            "id": "terminalGroupName",
            "label": "Group Name",
            "type": "text"
        },
        {
            "id": "terminalGroupId",
            "label": "Akcija",
            "type": "edit"
        }
    ];


    const getData = () => {
        TerminalsService.getTerminalGroups().then((res) => {
            setData(res.data);
        });
    };

    useEffect(() => {
        getData();
    }, []);


    const onEdit = (id) => {
        console.log("onEdit", id);
        history.push("/edit-terminalGroup/" + id);
    }

    const onAddNew = () => {
        console.log("add New")
        history.push("/edit-terminalGroup/")
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
                    data={data}
                    edit={onEdit}
                />
            </div>

        </div>
    )
}

export default GroupOfTerminals
