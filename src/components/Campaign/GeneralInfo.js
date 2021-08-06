import React from 'react'

function GeneralInfo(props) {
    const { thCampaign, setTHCampaign } = props;

    function handleCampaignTextChange(ev) {
        setTHCampaign({ ...thCampaign, campaignText: ev.target.value });
    }

    function handleContactCollectingChange(ev){
        let val = false;
        if(ev.target.value == "1")
        {
            val = true;
        }
        setTHCampaign({ ...thCampaign, contactCollecting: val});
    }

    return (
        <div>
            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Id:</label>
                <div className="col-sm-10">
                    <div>{thCampaign.campaignId}</div>
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Campaign Name:</label>
                <div className="col-sm-10">
                    <div>{thCampaign.campaignName}</div>
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Campaign Description:</label>
                <div className="col-sm-10">
                    <div>{thCampaign.campaignDescription}</div>
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Campaign Start Date:</label>
                <div className="col-sm-10">
                    <div>{thCampaign.campaignStart}</div>
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Campaign End Date:</label>
                <div className="col-sm-10">
                    <div>{thCampaign.campaignEnd}</div>
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Campaign text:</label>
                <div className="col-sm-10">

                    <div><input type="text"
                        className="form-control"
                        value={thCampaign.campaignText}
                        onChange={handleCampaignTextChange} /></div>
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Contact Collecting:</label>
                <div className="col-sm-10">

                    <div><select className="form-control"
                        placeholder="Izaberite opciju"
                        value={thCampaign.contactCollecting? "1" : "0"}
                        onChange={handleContactCollectingChange}
                    >
                        <option key="0" value="0">Ne</option>
                        <option key="1" value="1">Da</option>
                    </select>

                    </div>
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Status:</label>
                <div className="col-sm-10">
                    <div>{thCampaign.campaignStatus}</div>
                </div>
            </div>
        </div>
    )
}

export default GeneralInfo