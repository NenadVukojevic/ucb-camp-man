import React, { useState, useEffect } from 'react'
import CustomTable from '../CustomControls/CustomTable'
import CampaignService from '../../services/CampaignService';
import ControlTitle from '../Header/ControlTitle';
import { useHistory } from 'react-router-dom';

function ListOffCampaigns() {
    const history = useHistory();

    const [data, setData] = useState([{
        "campaignId": "",
        "campaignName": "",
        "campaignDescription": "",
        "campaignStart": "",
        "campaignEnd": "",
        "contactCollecting": false,
        "campaignStatus": "1",
    }]);
    const headers = [
        {
            "id": "campaignId",
            "label": "ID",
            "type": "text"
        },
        {
            "id": "campaignName",
            "label": "Name",
            "type": "text"
        },
        {
            "id": "campaignDescription",
            "label": "Description",
            "type": "text"
        },
        {
            "id": "campaignStart",
            "label": "Start",
            "type": "text"
        },
        {
            "id": "campaignEnd",
            "label": "End",
            "type": "text"
        },
        {
            "id": "contactCollecting",
            "label": "Collecting",
            "type": "bool"
        },
        {
            "id": "campaignStatus",
            "label": "Status",
            "type": "light"
        },
        {
            "id": "campaignId",
            "label": "Action",
            "type": "edit"
        }
    ];


    const getCampaigns = () => {
        CampaignService.getCampaigns().then((res) => {
            setData(res.data);
        });
    };

    useEffect(() => {
        getCampaigns();
    }, []);


    const onEdit = (id) => {
        console.log("onEdit", id);
        history.push("/edit-campaignsOff/" + id);
    }

    const onAddNew = () => {
        console.log("add New")
        history.push("/edit-campaignsOff/")
    }
    return (
        <div>
            <div>
                <ControlTitle
                    title="List of OFF US Campaigns"
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

export default ListOffCampaigns
