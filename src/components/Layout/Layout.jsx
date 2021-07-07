import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CampaignDetails from '../Campaign/CampaignDetails';
import CRMCampaigns from '../Campaign/CRMCampaigns';
import FooterComponent from '../Header/FooterComponent';
import HeaderComponent from '../Header/HeaderComponent';
import TableContent from '../TableContent/TableContent';
import './Layout.css';







class Layout extends Component {
    render() {
        return (
            <div className="appContent">
                <HeaderComponent />

                <div className="container">
                    <Switch>
                        <Route path="/" exact component={CRMCampaigns}></Route>
                        <Route path="/campaigns" component={CRMCampaigns}></Route>
                        <Route path="/campaigns-edit/:id" component={CampaignDetails}></Route>

                        <Route path="/head" component={TableContent}></Route>
                        
                    </Switch>
                </div>
                <FooterComponent />
            </div>
        );
    }
}

export default Layout;