import React from 'react'

function GeneralInfo(props) {
    const { thCampaign, setTHCampaign } = props;

    function handleCampaignTextChange(ev) {
        setTHCampaign({ ...thCampaign, campaignText: ev.target.value });
    }

    function handleContactCollectingChange(ev) {
        let val = false;
        if (ev.target.value == "1") {
            val = true;
        }
        setTHCampaign({ ...thCampaign, contactCollecting: val });
    }

    return (
        <div>
            <div className="mb-3 row">
                <label className="col-md-3 col-form-label">CRM Id:</label>
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        value={thCampaign.externalId}
                        disabled />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-md-3 col-form-label">Campaign Name:</label>
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        value={thCampaign.campaignName}
                        disabled />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-md-3 col-form-label">Campaign Description:</label>
                <div className="col-md-9">
                    <textarea
                        className="form-control"
                        disabled
                        value={thCampaign.campaignDescription} />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-md-3 col-form-label">Campaign Start Date:</label>
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        value={thCampaign.campaignStart}
                        disabled />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-md-3 col-form-label">Campaign End Date:</label>
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        value={thCampaign.campaignEnd}
                        disabled />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-md-3 col-form-label">Campaign text:</label>
                <div className="col-md-9">

                    <div><input type="text"
                        className="form-control"
                        value={thCampaign.campaignText}
                        onChange={handleCampaignTextChange} /></div>
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-md-3 col-form-label">Contact Collecting:</label>
                <div className="col-md-9">

                    <div><select className="form-control"
                        placeholder="Izaberite opciju"
                        value={thCampaign.contactCollecting ? "1" : "0"}
                        onChange={handleContactCollectingChange}
                    >
                        <option key="0" value="0">Ne</option>
                        <option key="1" value="1">Da</option>
                    </select>

                    </div>
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-md-3 col-form-label">Status:</label>
                <div className="col-md-9">
                    <div>{thCampaign.campaignStatus}</div>
                </div>
            </div>
        </div>
    )
}

export default GeneralInfo
