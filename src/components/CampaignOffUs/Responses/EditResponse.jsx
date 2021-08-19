import React, { useState, useEffect } from 'react'
import { Paper, Box, Switch } from '@material-ui/core';
import ControlTitle from '../../Header/ControlTitle';
import CampaignService from '../../../services/CampaignService';
import { useParams } from 'react-router-dom';


function EditResponse() {
    const [newResponse, setNewResponse] = useState(true);
    
    let {id} = useParams();
    
    const [response, setResponse] = useState({
        "responseId": 0,
        "responseCode": "",
        "responseLabel": "",
        "confirmation": true
    });

    useEffect(() => {
        if(id !== undefined)
        {
            console.log("EditResponse", id)
            CampaignService.getResponse(id).then((res)=>{
                setResponse(res.data);
                setNewResponse(false);
            });
        }
    }, [id])

    const changeResponse = (ev) => {
        setResponse({ ...response, [ev.target.id]: ev.target.value });
    }

    const toggleChecked = (ev) => {
        let checked = true;
        if (response.confirmation === true) {
            checked = false
        }
        setResponse({ ...response, confirmation: checked });
    }

    const saveResponse = (ev) => {
        let responseToSave = {
            "responseId": response.responseId,
            "responseCode": response.responseCode,
            "responseLabel": response.responseLabel,
            "confirmation": response.confirmation
        };
        console.log("save response", responseToSave);

        if(newResponse){
            CampaignService.addResponse(responseToSave).then((res)=>{
                console.log(res);
            })
        }
        else
        {
            CampaignService.updateResponse(responseToSave).then((res)=>{
                console.log(res);
            })
        }
    }

    return (
        <div>
            <Paper

            >
                <Box m={5} p={3}>
                    <div>
                        <ControlTitle
                            title={newResponse ? "Add New OFF US Response" : "Edit OFF US Response"}
                        />
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Response Code:</label>
                        <div className="col-sm-10">
                            <div><input type="text"
                                id="responseCode"
                                className="form-control"
                                value={response.responseCode}
                                onChange={changeResponse} /></div>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Response Text:</label>
                        <div className="col-sm-10">
                            <div><input type="text"
                                id="responseLabel"
                                className="form-control"
                                value={response.responseLabel}
                                onChange={changeResponse} /></div>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Confirmation:</label>
                        <div className="col-sm-10">
                            <div><Switch
                                checked={response.confirmation}
                                color="default"
                                onChange={toggleChecked} /></div>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="btn-toolbar float-right">
                            <button type="button" className="btn btn-secondary mr-2 mt-2" onClick={saveResponse}>Save</button>
                        </div>
                    </div>
                </Box>
            </Paper>
        </div>
    )
}

export default EditResponse
