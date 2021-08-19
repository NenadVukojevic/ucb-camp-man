import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CRMCampaigns from '../Campaign/CRMCampaigns';
import EditCampaign from '../Campaign/EditCampaign';
import FooterComponent from '../Header/FooterComponent';
import HeaderComponent from '../Header/HeaderComponent';
import TableContent from '../TableContent/TableContent';
import "bootstrap/dist/css/bootstrap.min.css"
import './Layout.css';
import Login from '../Login/Login';
import Logout from '../Login/Logout';
import ListResponses from '../CampaignOffUs/Responses/ListResponses';
import EditResponse from '../CampaignOffUs/Responses/EditResponse';
import EditOffCampaign from '../CampaignOffUs/EditOffCampaign';
import ListOffCampaigns from '../CampaignOffUs/ListOffCampaigns';
import Header from '../Header/Header';






class Layout extends Component {
    render() {
        const isLoggedIn = Boolean(localStorage.getItem("loggedIn")==='true');
        console.log("layout", isLoggedIn);

        if (isLoggedIn === false) {
            console.log("Login branch");
            return (<Login />)
        }
        else {

            return (<div className="appContent">
                <Header />

                <div className="container">
                    <Switch>
                        <Route path="/" exact component={CRMCampaigns}></Route>
                        <Route path="/logout" component={Logout}></Route>
                        <Route path="/campaigns" component={CRMCampaigns}></Route>
                        <Route path="/campaigns-edit/:id" component={EditCampaign}></Route>
                        <Route path="/campaignsOff/" component={ListOffCampaigns} />
                        <Route path="/edit-campaignsOff/" exact component={EditOffCampaign} />
                        <Route path="/edit-campaignsOff/:id" component={EditOffCampaign} />
                        <Route path="/responses" component={ListResponses} />
                        <Route path="/edit-response/" exact component={EditResponse} />
                        <Route path="/edit-response/:id" component={EditResponse} />
                        <Route path="/head" component={TableContent}></Route>

                    </Switch>
                </div>
                <FooterComponent />
            </div>
            )
        };
    }
}

export default Layout;