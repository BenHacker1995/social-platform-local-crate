import React, { Component } from 'react';
import { compose } from 'redux';

// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { USER_ACTIONS } from '../../redux/actions/userActions';
import axios from 'axios';

// MATERIAL UI - Upload
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import UploadBox from '../UploadBox/UploadBox';

// MATERIAL UI - Card
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import red from '@material-ui/core/colors/red';

//UPLOAD STAGES
import UploadStage1 from '../UploadStage1/UploadStage1';
import UploadStage2 from '../UploadStage2/UploadStage2';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

const styles = theme => ({
  card: {
    maxWidth: 400,
    height: 365,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class UploadCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      imageUrl: '',
      imageData: '', 
      currentUploadStage: 1,
      postTitle: '',
      postContent: '',
    }, 
    {expanded: false};
  }

  handlePostCancel = () => {
    this.setState({ 
      ...this.state,
      open: false,
     });
  };

  handleConfirmImage = () => {
    this.setState({ 
      ...this.state,
      currentUploadStage: 2,
     });
  };

  handleChangeFor = property => event => {
    this.setState({
      ...this.state,
      [property]: event.target.value,
    })
    console.log(this.state);
  }

  handleSubmitPost = () => {
    this.sendPost();
    this.setState({
      open: false,
      imageUrl: '',
      imageData: '',
      currentUploadStage: 1,
    })
  }

  backToImageUpload = () => {
    this.setState({
      ...this.state,
      currentUploadStage: 1,
    })
  }

  handleClickOpen = () => {
    this.setState({
      ...this.state,
      open: true,
    })
  }

  setImage = (imageData) => {
    console.log(`SETTING IMAGE: `, imageData);
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      this.setState({
        ...this.state,
        imageUrl: reader.result,
      })
    }
    reader.readAsDataURL(imageData);
    this.setState({
      ...this.state,
      open: true,
      imageData: imageData,
    })
  }

  sendPost = () => {
    const data = new FormData();
    data.append('title', this.state.postTitle);
    data.append('content', this.state.postContent);
    data.append('userName', this.props.user.userName);
    data.append('file', this.state.imageData);
    axios.post('api/post', data, { headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': this.state.imageData.type,
      }})
      .then(response => {
        console.log('successfully uploaded to the S3: ', response); // do something with the response
      })
      .catch(error => {
        console.log('error uploading file: ', error);
      })
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
};


  render() {
    const { classes } = this.props;

    return (
      
      <div className="upload-card">
        {/* <Card className={classes.card}> */}
          <UploadBox setImage={this.setImage} />
        {/* </Card> */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
        {
          this.state.currentUploadStage === 1 &&
            <UploadStage1 
              imageUrl={this.state.imageUrl} 
              handlePostCancel = {this.handlePostCancel}
              handleConfirmImage = {this.handleConfirmImage}
            />
        }
        {
          this.state.currentUploadStage === 2 &&
            <UploadStage2 
              imageUrl={this.state.imageUrl} 
              backToImageUpload = {this.backToImageUpload}
              handleSubmitPost = {this.handleSubmitPost}
              handleChangeFor = {this.handleChangeFor}
            />
        }
        </Dialog>
      </div>
    );
  }
}

UploadCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles),connect(mapStateToProps))(UploadCard);
