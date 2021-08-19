import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import ControlTitle from '../Header/ControlTitle'
import CRMCampaignsService from '../../services/CRMCampaignsService';
import Definition1 from './Definition1';
import Definition2 from './Definition2';
import GeneralInfo from './GeneralInfo';

function EditCampaign({ history, match }) {
    const [responses, setResponses] = useState([]);
    const [crmCampaign, setCRMCampaign] = useState({ campaignName: '' });
    const [thCampaign, setTHCampaign] = useState({
        campaignId: '',
        campaignName: '',
        campaignDescription: '',
        campaignStart: '',
        campaignEnd: '',
        campaignText: '',
        contactCollecting: false,
        externalId:''
     /*   f1: '',
        f2: '',
        f3: '',
        f4: '',
        f5: '',
        f6: '',
        f7: '',
        f8: '',
        imageId: 0*/
    });
    const [definition1, setDefinition1] = useState({
        f1: '',
        f2: '',
        f3: '',
        f4: '',
        f5: '',
        f6: '',
        f7: '',
        f8: '',
        imageId: 0,
        resolutionId: 1,
        campaignId: '',
        campaignText: '',
        definitionId:0
    });

    const [definition2, setDefinition2] = useState({
        f1: '',
        f2: '',
        f3: '',
        f4: '',
        f5: '',
        f6: '',
        f7: '',
        f8: '',
        imageId: 0,
        resolutionId: 2,
        campaignId: '',
        campaignText: '',
        definitionId:0
    });

    const [showTab, setShowTab] = useState(1)
    const getCampaignByID = (id) => {
        CRMCampaignsService.getCampaignDetails(id).then((res) => {
            console.log(res.data);
            //setCRMCampaign(res.data.crmCampaign);
            setTHCampaign(res.data);

            res.data.definitions.forEach(def => {
                if (def.resolutionId == '1') {
                    setDefinition1(def);
                }
                else if (def.resolutionId == '2') {
                    setDefinition2(def);
                }
            })
        })

        CRMCampaignsService.getCampaingResponses(id).then((res) => {
            setResponses(res.data);
        })
    };
    useEffect(() => {
        getCampaignByID(match.params.id);
    }, [match.params.id]);

    const saveCampaign = () => {
        let defs = [definition1, definition2]
        let campaignForSave = {
            campaignDescription: thCampaign.campaignDescription
            , campaignStart: thCampaign.campaignStart
            , campaignEnd: thCampaign.campaignEnd
            , campaignId: thCampaign.campaignId
            , campaignName: thCampaign.campaignName
            , campaignText: thCampaign.campaignText
            , contactCollecting: thCampaign.contactCollecting
            , externalId : thCampaign.externalId
            , definitions: defs
        }
        console.log(campaignForSave);
        CRMCampaignsService.saveCampaign(campaignForSave, thCampaign.externalId).then(
            (res) => {
                console.log(res);
                toast.info('Kampanja ' + crmCampaign.campaignName + ' je uspešno snimljena!', { position: toast.POSITION.TOP_RIGHT });

            }
        );
    }

    const resetForm = () => {
        getCampaignByID(crmCampaign.campaignId);
    }

    return (
        <div >
            {<ControlTitle title={crmCampaign !== null && ("Edit ON US Campaign: " + crmCampaign.campaignName)}></ControlTitle>}

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
                        thCampaign={thCampaign}
                        setTHCampaign={setTHCampaign}
                    />
                </div>
                <div className={showTab === 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                    <Definition1
                        responses={responses}
                        definition={definition1}
                        thCampaign={thCampaign}
                        setTHCampaign={setTHCampaign}
                        setDefinition={setDefinition1}
                        onSave={saveCampaign}
                        onReset={resetForm}
                        idType="text"
                    />
                </div>
                <div className={showTab === 3 ? "tab-pane fade show active" : "tab-pane fade"}>
                    <Definition2
                        responses={responses}
                        definition={definition2}
                        thCampaign={thCampaign}
                        setTHCampaign={setTHCampaign}
                        setDefinition={setDefinition2}
                        onSave={saveCampaign}
                        onReset={resetForm}
                        idType="text"
                    />
                </div>
            </div>
            <div>
                <div className="btn-toolbar float-right">
                    <button type="button" className="btn btn-secondary mr-2 mt-2" onClick={saveCampaign}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default EditCampaign
