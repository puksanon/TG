import React          from 'react'
import Card           from '../components/home/Card'
import Container      from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  content: {
    marginTop: 100,
  },

}));

function Index (){
  const classes = useStyles();

		return (
            <React.Fragment>
                <div className={ classes.content} >
                      <div className="card_main_content mt-5"> 
                        <Container>   
                          <Card/>
                        </Container>
                      </div>
                </div>
            </React.Fragment>
        )
}

export default Index;