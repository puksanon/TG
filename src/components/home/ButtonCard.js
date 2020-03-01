//functionless button in card components 
import React from 'react';
import Button from '@material-ui/core/Button';
import DialogCard from './DialogCardConotent'

class ButtonCard extends React.Component {
    render(){
        return (
            <div className="dialog_btn">
                <div className="row">
                <Button  href={this.props.card.webUrl} className="mr-1 mb-1">Go to website</Button>
                <DialogCard CardDetail={this.props.card}/>
                </div>
            </div>
        )    
    }
}

export default ButtonCard;