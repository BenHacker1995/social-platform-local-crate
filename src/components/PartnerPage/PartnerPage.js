import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PartnerGrid from './PartnerGrid/PartnerGrid';
import { PARTNER_ACTIONS } from '../../redux/actions/partnerActions';

import Nav from '../Nav/Nav';
import NewCard from '../Newsfeed/NewCard/NewCard';
import UploadCard from '../UploadCard/UploadCard';
import UpdatePartnerPicture from '../UpdatePartnerPicture/UpdatePartnerPicture';

// Material UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  wrapper: {
    maxWidth: 400,
  },
  paper: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
  },
});

const mapStateToProps = state => ({
  user: state.user,
  partner: state.partner,
  post: state.post
});

class PartnerPage extends Component {
  
  constructor(props){
    super(props);
      this.state = {
        partner: {
          id: 0,
          name: '',
          location: '', 
          website: '', 
          // img
          bio: 'Edit your profile photo and bio by clicking on the edit icon'
        } 
      }
  }

  componentDidMount() {
   let partner_id = window.location.hash.split('/')[2];
    this.props.dispatch({type: PARTNER_ACTIONS.GET_PARTNER, payload: partner_id });
  }

  render() {
    const { classes } = this.props;
    // const { spacing } = this.state;
    const posts = this.props && this.props.post && this.props.post.posts || [];       
    let partnerInfo = this.props && this.props.partner && this.props.partner.partner && this.props.partner.partner;
    return (
      <div>
        <Nav />
        <div className="partner-page-header-container">
          <Paper className={classes.root} elevation={1}>
            <div className="partner-page-header">
              <img id="partnerPagePhoto"
                src="/images/background.jpg"
                alt="Profile-Photo" />
            <UpdatePartnerPicture />
            </div>
            <div className="partner-page-header">
              <Typography variant="headline" component="h3">
                <h4>{partnerInfo.name}</h4>
              </Typography>
              <Typography component="p">
                <h4>{partnerInfo.city + ', ' + partnerInfo.state}</h4>
              </Typography>
            </div>
          </Paper>          
        </div>
        <PartnerGrid />
      </div>
    );
    }
  }

PartnerPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

// this allows us to use <App /> in index.js
export default compose(withStyles(styles),connect(mapStateToProps))(PartnerPage);

