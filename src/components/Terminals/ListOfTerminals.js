import React, { useState, useEffect } from 'react'
import CustomTable from '../CustomControls/CustomTable';
import ControlTitle from '../Header/ControlTitle';
import TerminalsService from '../../services/TerminalsService';
import { useHistory } from 'react-router-dom';



function ListOfTerminals() {
    const history = useHistory();    
    const [terminals, setTerminals] = useState([]);

    const headers = [
        {
            "id": "tid",
            "label": "TID",
            "type": "text"
        },
        {
            "id": "location",
            "label": "Location",
            "type": "text"
        },
        {
            "id": "cityName",
            "label": "City",
            "type": "text"
        },
        {
            "id": "description",
            "label": "Description",
            "type": "text"
        },
        {
            "id": "terminalId",
            "label": "Akcija",
            "type": "edit"
        }
    ];

    const getData = () => {
        TerminalsService.getTerminals().then((res) => {
            setTerminals(res.data);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    const onEdit = (id) => {
        console.log("onEdit", id);
        history.push("/edit-terminal/" + id);
    }

    const onAddNew = () => {
        console.log("add New")
        history.push("/edit-terminal/")
    }

    return (
        <div>
            <div>
                <ControlTitle
                    title="List of Terminals"
                />
            </div>
            <div className="text-right">
                <button type="button" className="btn btn-secondary btn-sm mb-2" onClick={onAddNew}>Add New</button>
            </div>
            <div className="mb-3 row">
                <CustomTable
                    headers={headers}
                    data={terminals}
                    edit={onEdit}
                />
            </div>

        </div>
    )
}

export default ListOfTerminals
