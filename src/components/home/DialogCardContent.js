import React                from 'react';
import PropTypes            from 'prop-types';

//material
import { withStyles }       from '@material-ui/core/styles';
import Button               from '@material-ui/core/Button';
import Dialog               from '@material-ui/core/Dialog';
import MuiDialogTitle       from '@material-ui/core/DialogTitle';
import MuiDialogContent     from '@material-ui/core/DialogContent';
import MuiDialogActions     from '@material-ui/core/DialogActions';
import IconButton           from '@material-ui/core/IconButton';
import CloseIcon            from '@material-ui/icons/Close';
import Typography           from '@material-ui/core/Typography';

import '../css/style_card.css'

const styles = theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    card_dialog : {
      minWidth : 700,
    }
});
  
const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} >
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
            </IconButton>
        ) : null}
        </MuiDialogTitle>
    );
});
  
const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

class DialogCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            open : false
        }
    };
  
    handleClickOpen = () => {
        this.setState({open: !this.state.open })
    };

    handleClose = () => {
        this.setState({open: !this.state.open })
    };

    render(){
        return (
            <div>
                <Button size="medium" variant="outlined" color="primary" onClick={this.handleClickOpen} >Read More</Button>
                <div className="dialog_content">
                    <Dialog onClose={this.handleClose}  aria-labelledby="customized-dialog-title" open={this.state.open}>
                        <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                            {this.props.CardDetail.webTitle}
                        </DialogTitle>
                        <DialogContent dividers>
                            <Typography  variant="h6" component="h2" >
                                Detail
                            </Typography>
                            <Typography >
                                TYPE    : {this.props.CardDetail.type}
                            </Typography>
                            <Typography >
                                SECTION : {this.props.CardDetail.sectionName}
                            </Typography>
                            <Typography >
                                DATE    : {this.props.CardDetail.webPublicationDate}
                            </Typography>
                            <Typography >
                                PILLAR  : {this.props.CardDetail.pillarName}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" href={this.props.CardDetail.webUrl} className="mr-1 mb-1">Go to website</Button>
                            <Button onClick={this.handleClose} color="primary">Close</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        )
    }
}

//set prop type in component 
DialogCard.propTypes = {
    open : PropTypes.bool,
}

export default DialogCard;
