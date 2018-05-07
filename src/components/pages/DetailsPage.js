import React, { Component } from 'react';
import { withRouter } from 'react-router'
import Flexbox from 'flexbox-react';
import Details from '../connected/Details'
import { Link } from 'react-router-dom'
import { isDeviceConsideredMobile } from '../../utils/appUtils'
import Button from 'material-ui/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import Translate from 'react-translate-component'
import { Div } from 'glamorous'
// import './DetailsPage.css'


class DetailsPage extends Component {

  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="ResultsPageContainer">
        
        { isDeviceConsideredMobile() && (
          <Div marginBottom="10px">
            <Button
              variant="raised"
              onClick={(e) => this.props.history.goBack()}
            >
              <KeyboardArrowLeft />
              <Translate content="navigation.goBack" />
            </Button>
          </Div>
        )}

        <Details />

      </Flexbox>
    )
  }
}

export default withRouter(DetailsPage)
