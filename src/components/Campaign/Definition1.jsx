import React from 'react';
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';

import './Definition1.css';
import AvailableButtons from './AvailableButtons';
import CRMCampaignsService from '../../services/CRMCampaignsService';
const Definition1 = (props) => {
    const { definition, thCampaign, setTHCampaign, setDefinition, onSave, onReset, idType } = props;
    const [newImgFile, setNewImgFile] = useState(false);
    const [campaignImgUrl, setImageUrl] = useState('');
    const [file, setFile] = useState('');
    const [used, setUsed] = useState(new Set());

    // used for mapping definition buttons - non array data
    const buttons = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8'];

    useEffect(() => {

        if (definition.imageId !== null && definition.imageId !== 0) {
            setImageUrl(`http://localhost:8080/api/v1/campaigns/image/${definition.imageId}`);
        }
        setUsed(new Set());
        addUsed(definition.f1);
        addUsed(definition.f2);
        addUsed(definition.f3);
        addUsed(definition.f4);
        addUsed(definition.f5);
        addUsed(definition.f6);
        addUsed(definition.f7);
        addUsed(definition.f8);

        console.log('used size:', used.size, definition);
    }, [definition]);

    const addUsed = (value) => {
        if (value !== '') {
            setUsed(prev => new Set(prev.add(value)));
        }
    };

    const removeUsed = (value) => {
        let nUsed = new Set();
        for (let val of used) {
            console.log('removeUsed', val + ' ' + value)
            if (val !== value) {
                nUsed.add(val);
            }

        }
        setUsed(nUsed);
    };




    function allowDrop(ev) {
        ev.preventDefault();
        ev.target.style.background = 'red';
    }

    function restoreStyle(ev) {
        ev.target.style.background = 'rgba(200, 200, 200, 0.3)';
    }

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);

    }

    function removeButton(ev) {
        ev.preventDefault();
        ev.target.style.background = 'rgba(200, 200, 200, 0.3)';
        console.log("removeButton", definition[ev.target.id]);
        removeUsed(definition[ev.target.id]);
        if(idType==="number"){
            setDefinition({ ...definition, [ev.target.id]: 0 });
        }
        else
        {
            setDefinition({ ...definition, [ev.target.id]: '' });
        }
    }

    function drop(ev) {
        ev.preventDefault();
        ev.target.style.background = 'rgba(200, 200, 200)';
        console.log('drop', ev.target);
        var data = idType==="number"? parseInt(ev.dataTransfer.getData("text")) : ev.dataTransfer.getData("text");

        setDefinition({ ...definition, [ev.target.id]: data });
        addUsed(data);
    }


    function loadFile(event) {
        console.log('load File:', event.target.files.length, 'something')
        if (event.target.files === null || event.target.files.length === 0) {
            return;
        }
        event.preventDefault();
        setImageUrl(URL.createObjectURL(event.target.files[0]));
        setNewImgFile(true);
        setFile(event.target.files[0]);
    }

    function checkFile({ target: img }) {
        console.log('checkFIle called', img);
        console.log('natural', img.naturalHeight, img.naturalWidth);
        console.log('offset', img.offsetHeight, img.offsetWidth);
        if (newImgFile && img.offsetHeight > 0 && img.offsetWidth > 0) {
            if (img.offsetHeight !== 600 || img.offsetWidth !== 800) {
                setImageUrl('');
                toast.error('Slika nije unutar predvidjenih dimenzija 800 x 600. Dimenzije su ' + img.naturalWidth + ' x ' + img.naturalHeight, { position: toast.POSITION.TOP_RIGHT });
                setNewImgFile(false);
                setDefinition({ ...definition, imageId: 0 });
            }
            else {
                console.log('valid img file!')
                CRMCampaignsService.uploadFile(file).then((res) => {
                    console.log('imgage id:', res.data.imageId);
                    setDefinition({ ...definition, imageId: res.data.imageId });

                    setNewImgFile(false);
                });
            }
        }
    }

    function getLabel(id) {
        if (id === null || id === 0) {
            return '';
        }
        let response = props.responses.filter(r => { return r.responseId === id });
        let label = '';
        console.log(id, response);
        if (response.length !== 0) {
            console.log(response);
            label = response[0].responseName;
        }
        return label;
    }

    function getResponse(id) {
        if (id === null || id === 0) {
            return '';
        }
        let response = props.responses.filter(r => { return r.responseId === id });
        return response;
    }


    const saveCampaign = (event) => {
        event.preventDefault();
        onSave();
    }

    return (
        <div>
            <div>
                <h4>Screen definition for 800x600</h4>
            </div>
            <div className="details_preview">
                <div className="details_responses">
                    <AvailableButtons
                        responses={props.responses}
                        used={used}
                        drag={drag} />
                </div>
                <div className="details_background">
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Background Url:</label>
                        <div className="col-sm-10">
                            <input type="file" accept="image/*" className="form-control-plaintext" onChange={loadFile}  />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Add Text:</label>
                        <div className="col-sm-10"><textarea id="campaignText"
                            rows="3"
                            cols="50"
                            type="text"
                            value={thCampaign.campaignText}
                            onChange={(event) => { setTHCampaign({ ...thCampaign, campaignText: event.currentTarget.value }) }} />
                        </div>
                    </div>
                    <div className="atm_screen">
                        <div className="atm_background">
                            {
                                campaignImgUrl !== '' && (<img src={campaignImgUrl} alt="" onLoad={checkFile} />)

                            }

                            <div className="camp_message" style={{ alignContent: 'center' }}>
                                <h3>
                                    {thCampaign.campaignText}
                                </h3>
                            </div>
                            {
                                buttons.map((button) => {
                                    return (definition[button] === '' || definition[button] === null || definition[button] === 0) ?
                                        <div key={button}
                                            style={{background:'rgba(200, 200, 200, 0.3)'}}
                                            className={`holder ${button}`}
                                            id={button}
                                            onDrop={drop}
                                            onDragOver={allowDrop}
                                            onDragLeave={restoreStyle}                                            
                                        ></div>
                                        :

                                        <div key={button} 
                                             style={{background:'rgba(200, 200, 200)'}}
                                             className={`holder_button ${button}`} 
                                             id={button} 
                                             onDoubleClick={removeButton}>
                                            {getLabel(definition[button])}
                                        </div>
                                }
                                )
                            }
                        </div>

                    </div>
                    {/* <div>
                        <div className="btn-toolbar float-right">
                            <button type="button" className="btn btn-secondary mr-2" onClick={saveCampaign}>Save</button>
                            <button type="button" className="btn btn-secondary" onClick={onReset}>Reset</button>
                        </div>

                    </div> */}
                </div>
            </div>
        </div>
    );

}
export default Definition1;