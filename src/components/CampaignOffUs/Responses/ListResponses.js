import React, { useState, useEffect } from 'react'
import CustomTable from '../../CustomControls/CustomTable'
import CampaignService from '../../../services/CampaignService';
import ControlTitle from '../../Header/ControlTitle';
import { useHistory} from 'react-router-dom';



function ListResponses() {
    const history = useHistory();

    const [data, setData] = useState([{
        "responseId": 0,
        "responseCode": "",
        "responseLabel": "",
        "confirmation": false
    }]);
    const headers = [
        {
            "id": "responseId",
            "label": "ID",
            "type": "text"
        },
        {
            "id": "responseCode",
            "label": "Code",
            "type": "text"
        },
        {
            "id": "responseLabel",
            "label": "Text",
            "type": "text"
        },
        {
            "id": "confirmation",
            "label": "Confirmation",
            "type": "bool"
        },
        {
            "id": "responseId",
            "label": "Action",
            "type": "edit"
        }
    ];


    const getResponses = () => {
        CampaignService.getResponses().then((res) => {
            setData(res.data);
        });
    };

    useEffect(() => {
        getResponses();
    }, []);


    const onEdit = (id) => {
        console.log("onEdit", id);
        history.push("/edit-response/" + id);
    }

    const onAddNew = ()=>{
        console.log("add New")
        history.push("/edit-response/")
    }

    return (
        <div>
            <div>
                <ControlTitle
                    title="List of OFF US Responses"
                />
            </div>
            <div className="text-right">
                <button type="button" className="btn btn-secondary btn-sm mb-2" onClick={onAddNew}>Add New</button>
            </div>
            <div>
                <CustomTable
                    headers={headers}
                    data={data}
                    edit={onEdit}
                />
            </div>
        </div>
    )
}

export default ListResponses
