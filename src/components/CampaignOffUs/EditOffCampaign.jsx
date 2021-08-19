import React, { useState, useEffect } from 'react'
import { Paper, Box, Switch } from '@material-ui/core';
import ControlTitle from '../Header/ControlTitle';

import { useParams } from 'react-router-dom';
import GeneralInfo from './GeneralInfo';
import Definition1 from '../Campaign/Definition1';
import Definition2 from '../Campaign/Definition2';
import CampaignService from '../../services/CampaignService';

function EditCampaign() {
    const [newCampaign, setNewCampaign] = useState(true);
    const [responses, setResponses] = useState([]);
    const [statuses, setStatuses] = useState([]);
    let { id } = useParams();

    const [showTab, setShowTab] = useState(1)
    const [campaign, setCampaign] = useState(
        {
            "campaignId": "",
            "campaignName": "",
            "campaignDescription": "",
            "campaignStart": "",
            "campaignEnd": "",
            "campaignStatus": false,
            "campaignText": "",
            "contactCollecting": false,
            "collectingText": "",
        }
    );

    const [definition1, setDefinition1] = useState({
        f1: 0,
        f2: 0,
        f3: 0,
        f4: 0,
        f5: 0,
        f6: 0,
        f7: 0,
        f8: 0,
        imageId: 0,
        resolutionId: 1,
        campaignId: '',
        campaignText: '',
        definitionId: 0
    });

    const [definition2, setDefinition2] = useState({
        f1: 0,
        f2: 0,
        f3: 0,
        f4: 0,
        f5: 0,
        f6: 0,
        f7: 0,
        f8: 0,
        imageId: 0,
        resolutionId: 2,
        campaignId: '',
        campaignText: '',
        definitionId: 0
    });

    useEffect(() => {
        if (id !== undefined) {
            CampaignService.getCampaign(id).then((res)=>{
                setData(res.data);
            });
            console.log("EditCampaign", id);
            setNewCampaign(false);
        }
    }, [id]);

    useEffect(() => {
        CampaignService.getResponsesDTO().then((res) => {
            setResponses(res.data);
            console.log("responses", res.data);
        }).catch((err)=>{
            console.log("err", err);
        });
        CampaignService.getStatuses().then((res) => {
            setStatuses(res.data);
        });
    }, [])

    const saveCampaign = () => {
        let defs = [definition1, definition2]
        let campaignForSave = {
            campaignDescription: campaign.campaignDescription
            , campaignStart: campaign.campaignStart
            , campaignEnd: campaign.campaignEnd
            , campaignId: campaign.campaignId
            , campaignName: campaign.campaignName
            , campaignText: campaign.campaignText
            , contactCollecting: campaign.contactCollecting
            , collectingText: campaign.collectingText
            , campaignStatus: campaign.campaignStatus
            , definitions: defs
        }
        console.log(campaignForSave);
        CampaignService.insertCampaign(campaignForSave).then((res)=>{
             console.log('after shave', res.data);
             setData(res.data);
             setNewCampaign(false);
        });
    }

    const setData = (data) =>{
        console.log("setData: ", data);
        setCampaign(data);

        data.definitions.forEach(def => {
            if (def.resolutionId == '1') {
                setDefinition1(def);
            }
            else if (def.resolutionId == '2') {
                setDefinition2(def);
            }
        })
    }


    const resetForm = () => {

    }
    return (
        <div>
            <Paper      >
                <Box m={5} p={3}>
                    <div>
                        <ControlTitle
                            title={newCampaign ? "Add New OFF US Campaign" : "Edit OFF US Campaign"}
                        />
                    </div>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <div className={showTab === 1 ? "nav-link active" : "nav-link"} onClick={() => { setShowTab(1) }} >General</div>
                        </li>
                        <li className="nav-item">
                            <div className={showTab === 2 ? "nav-link active" : "nav-link"} onClick={() => { setShowTab(2) }}>Screen 800x600</div>
                        </li>
                        <li className="nav-item">
                            <div className={showTab === 3 ? "nav-link active" : "nav-link"} onClick={() => { setShowTab(3) }}>Screen 1024x1080</div>
                        </li>
                    </ul>
                    <div className="tab-content tab-padded">
                        <div className={showTab === 1 ? "tab-pane fade show active" : "tab-pane fade"}>
                            <GeneralInfo
                                campaign={campaign}
                                setCampaign={setCampaign}
                                statuses={statuses}
                            />
                        </div>
                        <div className={showTab === 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                            {<Definition1
                                responses={responses}
                                definition={definition1}
                                thCampaign={campaign}
                                setTHCampaign={setCampaign}
                                setDefinition={setDefinition1}
                                onSave={saveCampaign}
                                onReset={resetForm}
                                idType="number"
                            />}
                        </div>
                        <div className={showTab === 3 ? "tab-pane fade show active" : "tab-pane fade"}>
                            {<Definition2
                                responses={responses}
                                definition={definition2}
                                thCampaign={campaign}
                                setTHCampaign={setCampaign}
                                setDefinition={setDefinition2}
                                onSave={saveCampaign}
                                onReset={resetForm}
                                idType="number"
                            />}
                        </div>
                    </div>
                    <div>
                        <div className="btn-toolbar float-right">
                            <button type="button" className="btn btn-secondary mr-2 mt-2" onClick={saveCampaign}>Save</button>
                        </div>
                    </div>
                </Box>
            </Paper>
        </div>
    )
}

export default EditCampaign
