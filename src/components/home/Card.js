import React            from 'react';
import axios            from 'axios';

//api-key 
import key              from '../../key/ApiKey';

//material
import Card             from '@material-ui/core/Card';
import CardActionArea   from '@material-ui/core/CardActionArea';
import CardActions      from '@material-ui/core/CardActions';
import CardContent      from '@material-ui/core/CardContent';
import Button           from '@material-ui/core/Button';
import Typography       from '@material-ui/core/Typography';
import Grid             from '@material-ui/core/Grid';
import TextField        from '@material-ui/core/TextField';

//component
import ButtonCard       from './ButtonCard';
import PropTypes from 'prop-types';

//stylesheet
import '../css/style_card.css';

//main component card_list documents
class CardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input_search_value: "",
            data: [],
            filteredData: [],
            sort : true
        };
    };
    //sort date time 
    custom_sort_new(a, b) {
        return new Date(a.webPublicationDate).getTime() - new Date(b.webPublicationDate).getTime();
    };
    custom_sort_old(a, b) {
        return new Date(b.webPublicationDate).getTime() - new Date(a.webPublicationDate).getTime();
    };

    //sort data from new-Date,old-date 
    async SortData () {
        this.setState({sort: !this.state.sort })
        if(this.state.sort){
            const sortdate =  await this.state.filteredData.sort(this.custom_sort_new);
            this.setState({ filteredData : sortdate })
        }else{
            const sortdate =  await this.state.filteredData.sort(this.custom_sort_old);
            this.setState({ filteredData : sortdate })
        }
    };

    //handle data search globel in guardien
    SearcHGlobal = e => {
        const global_search      =  e.target.value;
        const api_key            =  key();
        const http               = `https://content.guardianapis.com`;
        const url                = `${http}/search?q=${global_search}&api-key=${api_key}`
        //set input search value and send to query in api function
        this.GetDataFromAPI(global_search , url)
    };

    //watch input_tag and find data in old data form data[] and set item to filterdata[]
    handleInputChange = event => {
        const input_search_value = event.target.value;
        this.setState(prevState => {
            const filteredData = prevState.data.filter(element => {
                return element.webTitle.toLowerCase().includes(input_search_value.toLowerCase());
            });
        
            return {
                input_search_value,
                filteredData
                };
            });
    };

    //fetch data from api / searching
    async GetDataFromAPI(global_search, url){
        const input_search_value =  global_search;
        const api_key            =  key();
        const http               = `https://content.guardianapis.com`;
        const Url                =  url;

        if (!input_search_value){
            // eslint-disable-next-line
            const response = await axios.get(`${http}/search?api-key=${api_key}`)
            .then(data  => {
                const get_data = data.data.response.results;
                const { input_search_value } = this.state;
                const filteredData = get_data.filter(element => {
                    return element.webTitle.toLowerCase().includes(input_search_value.toLowerCase());
                });  
                this.setState({
                    data :get_data,
                    filteredData: filteredData
                });
            }).catch(err => {
                console.error(err);
            })
        }else{
            // eslint-disable-next-line
            const response = await axios.get(`${Url}`)
            .then(data  => {
                const get_data = data.data.response.results;
                const { input_search_value } = this.state;
                const filteredData = get_data.filter(element => {
                    return element.webTitle.toLowerCase().includes(input_search_value.toLowerCase());
                });  
    
                this.setState({
                    data :get_data,
                    filteredData: filteredData
                });
            }).catch(err => {
                console.error(err);
            })
        }

    };

    // call function get_data()
    componentDidMount() {
        this.GetDataFromAPI();
    };

    render() {
        return (
            <Grid className="searchForm mt-5">
                <Grid className="search_input" container>
                    <Grid item xs={12} sm={5}>
                        <form className=" mr-2 mb-2">
                            <TextField 
                                className="text_input"
                                id="outlined-basic" 
                                label="Search For Global" 
                                variant="outlined"
                                placeholder="Input your Keyword"
                                onChange={this.SearcHGlobal}
                            />
                        </form>
                    </Grid>   
                    <Grid item xs={12} sm={5} >
                        <form className="mr-2 mb-2">
                            <TextField 
                                id="outlined-basic" 
                                className="text_input"
                                label="Input text Title" 
                                variant="outlined"
                                placeholder="Search for tltle"
                                onChange={this.handleInputChange}
                            />
                        </form>
                    </Grid>   
                    <Grid  item xs={12} sm={2}>
                        <Button className="btn mr-2 mb-2" variant="outlined" color="primary" onClick={(e) => this.SortData()}>Sort By Date</Button>
                    </Grid>
                </Grid>   

                <Grid container spacing={3}>
                    <Grid  item xs={12} >
                        <h1>The Guardian List</h1>
                    </Grid>
                    { this.state.filteredData.lenght >= 0 ? 
                        <p>not found</p>
                        :(
                            this.state.filteredData.map((card,i) => {
                                return (
                                    <Grid item xs={12} sm={6} key={i}> 
                                        <CardComponents card={card}/>
                                    </Grid>  
                                )   
                            })
                        )  
                    }
                </Grid>
            </Grid>
        );
    };
};

//functionless card components
function CardComponents (props){
    return(
        <Card className="card_doc" >
            <CardActionArea>
                <CardContent>
                    <Typography className="card_content" variant="h6" component="h2">
                            {props.card.webTitle}
                    </Typography>    
                    <Typography className="blockquote-footer text-left" color="textSecondary">
                        <cite title="Source Title">{ props.card.sectionName }</cite>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className="card_footer">                             
                <ButtonCard card={props.card}/>  
            </CardActions>
        </Card>
    );
};

//set prop type in component 
CardList.propTypes = {
    input_search_value : PropTypes.string,
    data               : PropTypes.object,
    filteredData       : PropTypes.object,
    sort               : PropTypes.bool,
    global_search      : PropTypes.string,
}

export default CardList ;
