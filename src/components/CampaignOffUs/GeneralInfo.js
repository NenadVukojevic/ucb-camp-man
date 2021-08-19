import React from 'react';



function GeneralInfo(props) {
    const { campaign, setCampaign, statuses } = props;

    function handleChange(ev) {
        setCampaign({ ...campaign, [ev.target.id]: ev.target.value });
    }

    function handleContactCollectingChange(ev) {
        let val = false;
        if (ev.target.value == "1") {
            val = true;
        }
        setCampaign({ ...campaign, contactCollecting: val });
    }

    return (
        <div>
            <form autoComplete="off">
                <div className="mb-3 row">
                    <label className="col-md-3 control-label">Campaign Name:</label>
                    <div className="col-md-5">
                        <input
                            id="campaignName"
                            className="form-control"
                            value={campaign.campaignName}
                            onChange={handleChange} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-md-3 control-label">Campaign Description:</label>
                    <div className="col-md-9">
                        <textarea
                            id="campaignDescription"
                            className="form-control"
                            value={campaign.campaignDescription}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-md-3 control-label">Campaign Start Date:</label>
                    <div className="col-md-3">
                        <input
                            type="date"
                            id="campaignStart"
                            className="form-control"
                            value={campaign.campaignStart}
                            onChange={handleChange} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-md-3 col-form-label">Campaign End Date:</label>
                    <div className="col-md-3">
                        <input
                            type="date"
                            id="campaignEnd"
                            className="form-control"
                            value={campaign.campaignEnd}
                            onChange={handleChange} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-md-3 col-form-label">Campaign text:</label>
                    <div className="col-md-9">

                        <div><input type="text"
                            id="campaignText"
                            className="form-control"
                            value={campaign.campaignText}
                            onChange={handleChange} /></div>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-md-3 col-form-label">Contact Collecting:</label>
                    <div className="col-md-2">

                        <div><select className="form-control"
                            placeholder="Izaberite opciju"
                            value={campaign.contactCollecting ? "1" : "0"}
                            onChange={handleContactCollectingChange}
                        >
                            <option key="0" value="0">No</option>
                            <option key="1" value="1">Yes</option>
                        </select>

                        </div>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-md-3 col-form-label">Collecting text:</label>
                    <div className="col-md-9">

                        <div><input type="text"
                            id="collectingText"
                            className="form-control"
                            value={campaign.collectingText}
                            onChange={handleChange} /></div>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-md-3 col-form-label">Status:</label>
                    <div className="col-md-9">
                        <div><select
                            id="campaignStatus"
                            className="form-control"
                            placeholder="izaberite status"
                            value={campaign.campaignStatus}
                            onChange={handleChange}>
                            {statuses.map((status, index) => {
                                return <option key={index} value={status.statusId}>{status.statusName}</option>
                            })}
                        </select>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default GeneralInfo
