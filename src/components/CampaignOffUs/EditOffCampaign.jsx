import React, { useState, useEffect } from 'react'
import { Paper, Box } from '@material-ui/core';
import ControlTitle from '../Header/ControlTitle';

import { useParams } from 'react-router-dom';
import GeneralInfo from './GeneralInfo';
import Definition1 from '../Campaign/Definition1';
import Definition2 from '../Campaign/Definition2';
import CampaignService from '../../services/CampaignService';
import BinRangeService from '../../services/BinRangeService';
import TerminalService from '../../services/TerminalsService';

import CustomMultiSelectPair from '../CustomControls/CustomMultiSelectPair';


function EditCampaign() {
    const [newCampaign, setNewCampaign] = useState(true);
    const [responses, setResponses] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [binRangesGroup, setBinRangesGroup] = useState([]);
    const [terminalGroups, setTerminalGroups] = useState([]);

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

    const [usedBinRangeGroups, setUsedBinRangesGroup] = useState([]);
    const [usedTerminalGroups, setUsedTerminalGroups] = useState([]);


    useEffect(() => {
        if (id !== undefined) {
            CampaignService.getCampaign(id).then((res) => {
                setData(res.data);
                console.log("campaign", res.data);
                setUsedBinRangesGroup(res.data.binRangesGroups);
                setUsedTerminalGroups(res.data.terminalGroups);
            });
            console.log("EditCampaign", id);
            setNewCampaign(false);
        }
    }, [id]);

    useEffect(() => {
        CampaignService.getResponsesDTO().then((res) => {
            setResponses(res.data);
            console.log("responses", res.data);
        }).catch((err) => {
            console.log("err", err);
        });
        CampaignService.getStatuses().then((res) => {
            setStatuses(res.data);
        });
        BinRangeService.getBinRangeGroups().then((res) => {
            setBinRangesGroup(res.data);
            console.log("Bin Ranges Group", res.data);
        });
        TerminalService.getTerminalGroups().then((res) => {
            setTerminalGroups(res.data);
            console.log("Terminals Group", res.data);
        })

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
            , binRangesGroups: usedBinRangeGroups
            , terminalGroups: usedTerminalGroups
        }
        console.log(campaignForSave);
        CampaignService.insertCampaign(campaignForSave).then((res) => {
            console.log('after shave', res.data);
            setData(res.data);
            setNewCampaign(false);
        });
    }

    const setData = (data) => {
        console.log("setData: ", data);
        setCampaign(data);

        data.definitions.forEach(def => {
            if (def.resolutionId === '1' || def.resolutionId === 1) {
                setDefinition1(def);
            }
            else if (def.resolutionId === '2' || def.resolutionId === 2) {
                setDefinition2(def);
            }
        })
    }


    const resetForm = () => {

    }
    return (
        <div>
            <Paper      >
                <Box m={3} p={3}>
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
                        <li className="nav-item">
                            <div className={showTab === 4 ? "nav-link active" : "nav-link"} onClick={() => { setShowTab(4) }}>Bin Range Groups</div>
                        </li>
                        <li className="nav-item">
                            <div className={showTab === 5 ? "nav-link active" : "nav-link"} onClick={() => { setShowTab(5) }}>Terminal Groups</div>
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
                        <div className={showTab === 4 ? "tab-pane fade show active" : "tab-pane fade"}>
                            <div className="row">
                                {<CustomMultiSelectPair
                                    data={binRangesGroup}
                                    usedList={usedBinRangeGroups}
                                    setUsed={setUsedBinRangesGroup}
                                    id="binRangeGroupId"
                                    label="binRangeName"
                                />}
                            </div>
                        </div>
                        <div className={showTab === 5 ? "tab-pane fade show active" : "tab-pane fade"}>
                            <div className="row">
                                {<CustomMultiSelectPair
                                    data={terminalGroups}
                                    usedList={usedTerminalGroups}
                                    setUsed={setUsedTerminalGroups}
                                    id="terminalGroupId"
                                    label="terminalGroupName"
                                />}
                            </div>
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
