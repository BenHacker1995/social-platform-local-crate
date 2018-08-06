import React, { Component } from 'react';
import PostDialog from '../../PostDialog/PostDialog';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';



const styles = theme => ({
    card: {
      maxWidth: 400,
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

class NewCard extends Component {

    state = { expanded: false };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    handleCardClick = () => {
        return <PostDialog post={this.props.post}/>
    }

    dateConvert = ( date ) => {
        return moment().utc( date ).format("MMM Do YYYY");
    }

    render() {
        const { classes } = this.props;

        return (
            <div style={{display:'inline-block', margin:'10px'}}>
                <Card className={classes.card}>
                <CardHeader
                    avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                        R
                    </Avatar>
                    }
                    action={
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                    }
   
                    title={this.props.post.name}
                    subheader={String(this.dateConvert(this.props.post.date_created))}
                />
                {/* <CardMedia
                    className={classes.media}
                    image={this.props.post.media_url}
                    title="Contemplative Reptile"
                    onClick={this.handleCardClick}
                /> */}
                <PostDialog post={this.props.post} dateConvert={this.dateConvert}/>
                <CardContent>
                <Typography component="p">
                    {this.props.post.title}
                    </Typography>
                    <hr/>
                    <Typography component="p">
                    {this.props.post.content}
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        // onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                        >
                    <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                    <Typography paragraph variant="body2">
                        This is the extended copy for the post. Bacon ipsum dolor amet beef ribs ham hock jerky pig hamburger, alcatra doner. Ham hock corned beef swine, kevin pork loin chicken pork chop. Pork fatback buffalo, doner cupim meatloaf alcatra. Shank bacon drumstick, boudin brisket hamburger cupim ground round ribeye pork loin. Prosciutto ribeye corned beef hamburger pork pork belly burgdoggen ham hock salami pastrami strip steak. Alcatra shoulder porchetta capicola corned beef, short loin t-bone short ribs. Picanha sirloin tenderloin biltong porchetta ribeye.
                    </Typography>
                    </CardContent>
                </Collapse>
                </Card>
            </div>
        );
    }
}

NewCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(NewCard);