import React, { Component } from 'react';
import Logo from './Logo'
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import './Header.css';

class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <div className="headerHolder">
        <div className="headerLogo" onClick={() => this.props.history.push('/')}>
          <Logo />
        </div>
        <div className="headerLinks">
          <Menu size={'large'} inverted>
            <Menu.Item
              as={Link}
              to={'/campaigns'}
              name="On US Campaigns"
            />
            <Menu.Item
              as={Link}
              to={'/campaignsOff'}
              name="Off US Campaign"
            />
            <Menu.Item
              as={Link}
              to={'/defaultOff'}
              name="Default Off US Campaign"
            />
            <Menu.Item
              as={Link}
              to={'/terminals'}
              name="Terminals"
            />
            <Menu.Item
              as={Link}
              to={'/terminalGroups'}
              name="Grupe Terminala"
            />
          </Menu>
        </div>
        <div>
        </div>
      </div>

    );
  }
}

export default HeaderComponent;