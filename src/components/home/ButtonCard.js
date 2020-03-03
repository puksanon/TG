//functionless button in card components 
import React        from 'react';

//material css style
import Grid         from '@material-ui/core/Grid';
import Button       from '@material-ui/core/Button';

//component
import DialogCard   from './DialogCardContent';

class ButtonCard extends React.Component {
    render(){
        return (
            <Grid container spacing={2}>
                <Grid container item xs={6} sm={6} md={3} spacing={1}>
                    <Button size="medium" variant="outlined" color="primary" href={this.props.card.webUrl} className="mr-1 mb-1">WEBSITE</Button>
                </Grid>
                <Grid container item xs={6} sm={6} md={3} spacing={1}>
                    <DialogCard CardDetail={this.props.card}/>
                </Grid>
            </Grid>
        );    
    };
};

export default ButtonCard;