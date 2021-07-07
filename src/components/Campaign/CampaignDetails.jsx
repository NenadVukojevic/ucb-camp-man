import React from 'react';
import { useState, useEffect } from "react";
import CRMCampaignsService from '../../services/CRMCampaignsService';
import './CampaignDetails.css';
import ControlTitle from '../Header/ControlTitle';
const CampaignDetails = ({ history, match }) => {
    const [responses, setResponses] = useState([]);
    const [crmCampaign, setCRMCampaign] = useState({ campaignName: '' });
    const [thCampaign, setTHCampaign] = useState({
        campaignId: '',
        campaignName: '',
        campaignDescription: '',
        campaignStart: '',
        campaignEnd: '',
        campaignText: '',
        f1: '',
        f2: '',
        f3: '',
        f4: '',
        f5: '',
        f6: '',
        f7: '',
        f8: '',
        imageId: ''
    });
    const [atm_background, setAtmBackground] = useState(null);
    const [campaignImgUrl, setImageUrl] = useState('');
    const [campaignText, setCampaignText] = useState('');

    const [f1, setF1] = useState('');
    const [f2, setF2] = useState('');
    const [f3, setF3] = useState('');
    const [f4, setF4] = useState('');
    const [f5, setF5] = useState('');
    const [f6, setF6] = useState('');
    const [f7, setF7] = useState('');
    const [f8, setF8] = useState('');


    useEffect(() => {
        const getCampaignByID = () => {
            CRMCampaignsService.getCampaignDetails(match.params.id).then((res) => {
                console.log(res.data.thCampaign);
                console.log(res.data.responses);
                setResponses(res.data.responses);
                setCRMCampaign(res.data.crmCampaign);
                setTHCampaign(res.data.thCampaign);

               /* console.log(thCampaign);
                setF1(res.data.thCampaign.f1);
                setF2(res.data.thCampaign.f2);
                setF3(res.data.thCampaign.f3);
                setF4(res.data.thCampaign.f4);
                setF5(res.data.thCampaign.f5);
                setF6(res.data.thCampaign.f6);
                setF7(res.data.thCampaign.f7);
                setF8(res.data.thCampaign.f8);
                setCampaignText(res.data.thCampaign.campaignText);
                setAtmBackground(res.data.thCampaign.imageId);
*/
                if (res.data.thCampaign.imageId !== null && res.data.thCampaign.imageId !== '') {
                    setImageUrl(`http://localhost:8080/api/v1/campaigns/image/${res.data.thCampaign.imageId}`);
                }
            })
        };
        getCampaignByID();

    }, [match.params.id]);



    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function removeButton(ev) {
        ev.preventDefault();
        setTHCampaign({...thCampaign, [ev.target.id]: ''});
    }

    function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");

        //ev.target.appendChild(document.getElementById(data));
        setTHCampaign({...thCampaign, [ev.target.id]: data});
//        setButtonValues(ev.target.id, data);
    }

    function setButtonValues(buttonId, data) {
        switch (buttonId) {
            case 'F1':
                setF1(data);
                break;
            case 'F2':
                setF2(data);
                break;
            case 'F3':
                setF3(data);
                break;
            case 'F4':
                setF4(data);
                break;
            case 'F5':
                setF5(data);
                break;
            case 'F6':
                setF6(data);
                break;
            case 'F7':
                setF7(data);
                break;
            case 'F8':
                setF8(data);
                break;
            default:
                break;
        }
    }

    function loadFile(event) {
        event.preventDefault();
        setImageUrl(URL.createObjectURL(event.target.files[0]));
    }


    function getLabel(id) {
        if (id === null) {
            return '';
        }
        let response = responses.filter(r => { return r.responseId === id });
        let label = '';
        console.log(id);
        if (response !== null) {
            label = response[0].responseName;
        }
        return label;
    }


    return (
        <div>
            {<ControlTitle title={crmCampaign !== null && ("Edit ON US Campaign: " + crmCampaign.campaignName)}></ControlTitle>}
            <div className="details_preview">
                <div className="details_responses">
                    <div className="atm_button_group">

                        {responses.map((response, index) => (
                            <div key={index} id={response.responseId} className="atm_button" draggable="true" onDragStart={drag}>{response.responseName}</div>
                        )
                        )}
                    </div>
                </div>
                <div className="details_background">
                    <div className="form-group">
                        <label>Background Url:</label>
                        <input type="file" name="backgroundFile" onChange={loadFile} />
                    </div>
                    <div className="form-group">
                        <label>Ad Text:</label>
                        <textarea id="campaignText"
                            rows="3"
                            cols="50"
                            type="text"
                            value={campaignText}
                            onChange={(event) => { setCampaignText(event.currentTarget.value) }} />
                    </div>

                    <div className="atm_screen">
                        <div>
                            {
                                campaignImgUrl && (<img className="atm_background" src={campaignImgUrl} alt="" />)
                            }

                            <div className="camp_message" style={{ alignContent: 'center' }}>
                                <h3>
                                    {thCampaign.campaignText}
                                </h3>
                            </div>
                            {(thCampaign.f1 === '' || thCampaign.f1 === null) ?
                                (
                                    <div className="holder F1" id="f1" onDrop={drop} onDragOver={allowDrop}></div>
                                )
                                :
                                (
                                    <div className="holder_button F1" id="f1" onDoubleClick={removeButton}>
                                        {getLabel(thCampaign.f1)}
                                    </div>
                                )
                            }
                            {(thCampaign.f2 === '' || thCampaign.f2 === null) ?
                                (
                                    <div className="holder F2" id="f2" onDrop={drop} onDragOver={allowDrop}></div>
                                )
                                :
                                (
                                    <div className="holder_button F2" id="f2" onDoubleClick={removeButton}>
                                        {getLabel(thCampaign.f2)}
                                    </div>
                                )
                            }
                            {(thCampaign.f3 === '' || thCampaign.f3 === null) ?
                                (
                                    <div className="holder F3" id="f3" onDrop={drop} onDragOver={allowDrop}></div>
                                )
                                :
                                (
                                    <div className="holder_button F3" id="f3" onDoubleClick={removeButton}>
                                        {getLabel(thCampaign.f3)}
                                    </div>
                                )
                            }
                            {(thCampaign.f4 === '' || thCampaign.f4 === null) ?
                                (
                                    <div className="holder F4" id="f4" onDrop={drop} onDragOver={allowDrop}></div>
                                )
                                :
                                (
                                    <div className="holder_button F4" id="f4" onDoubleClick={removeButton}>
                                        {getLabel(thCampaign.f4)}
                                    </div>
                                )
                            }
                            {(thCampaign.f5 === '' || thCampaign.f5 === null) ?
                                (
                                    <div className="holder F5" id="f5" onDrop={drop} onDragOver={allowDrop}></div>
                                )
                                :
                                (
                                    <div className="holder_button F5" id="f5" onDoubleClick={removeButton}>
                                        {getLabel(thCampaign.f5)}
                                    </div>
                                )
                            }
                            {(thCampaign.f6 === '' || thCampaign.f6 === null) ?
                                (
                                    <div className="holder F6" id="f6" onDrop={drop} onDragOver={allowDrop}></div>
                                )
                                :
                                (
                                    <div className="holder_button F6" id="f6" onDoubleClick={removeButton}>
                                        {getLabel(thCampaign.f6)}
                                    </div>
                                )
                            }
                            {(thCampaign.f7 === '' || thCampaign.f7 === null) ?
                                (
                                    <div className="holder F7" id="f7" onDrop={drop} onDragOver={allowDrop}></div>
                                )
                                :
                                (
                                    <div className="holder_button F7" id="f7" onDoubleClick={removeButton}>
                                        {getLabel(thCampaign.f7)}
                                    </div>
                                )
                            }
                            {(thCampaign.f8 === '' || thCampaign.f8 === null) ?
                                (
                                    <div className="holder F8" id="f8" onDrop={drop} onDragOver={allowDrop}></div>
                                )
                                :
                                (
                                    <div className="holder_button F8" id="f8" onDoubleClick={removeButton}>
                                        {getLabel(thCampaign.f8)}
                                    </div>
                                )
                            }

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );

}
export default CampaignDetails;