import React, { useState, useEffect } from 'react';
import CRMCampaignsService from '../../services/CRMCampaignsService';
import ControlTitle from '../Header/ControlTitle';

const CRMCampaigns = () => {

    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        CRMCampaignsService.getCampaigns().then((res) => {
            setCampaigns(res.data);
            console.log(res.data)
        });
    }, []);


    return (
        <div>

            <div>
                <ControlTitle title="On US Campaigns"/>
            </div>
            <div>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Campaign Id</th>
                            <th>Naziv</th>
                            <th>Start</th>
                            <th>End</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            campaigns.map(
                                campaign =>
                                    <tr key={campaign.campaignId}>
                                        <td>{campaign.campaignId}</td>
                                        <td>{campaign.campaignName}</td>
                                        <td>{campaign.startDate}</td>
                                        <td>{campaign.endDate}</td>
                                    </tr>
                            )

                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default CRMCampaigns;