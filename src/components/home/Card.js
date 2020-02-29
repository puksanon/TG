import React , {useState , setState} from 'react';
import axios from 'axios';
import './style_card.css'
import { Card , Button } from 'react-bootstrap';

//main component card_list documents
class CardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input_search_value: "",
            data: [],
            filteredData: [],
            sort : true
        }
    }

    custom_sort_new(a, b) {
        return new Date(a.webPublicationDate).getTime() - new Date(b.webPublicationDate).getTime();
    }

    custom_sort_old(a, b) {
        return new Date(b.webPublicationDate).getTime() - new Date(a.webPublicationDate).getTime();
    }

    async SortData () {
        this.setState({sort: !this.state.sort })
        if(this.state.sort){
            const sortdate =  await this.state.filteredData.sort(this.custom_sort_new);
            this.setState({ filteredData : sortdate })
        }else{
            const sortdate =  await this.state.filteredData.sort(this.custom_sort_old);
            this.setState({ filteredData : sortdate })
        }
    }

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
    
    async GetDataFromAPI(){
        const response = await axios.get(`https://content.guardianapis.com/search?api-key=1aef8006-f6e2-4e95-aab4-a9c6444b0718`)
        .then(data  => {
            const get_data = data .data.response.results;
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
    // call function get_data()
    componentDidMount() {
        this.GetDataFromAPI();
    }

    render() {
        return (
            <div className="searchForm">
                <div className="row">
                    <div className="search_input mb-4">
                        <form>
                            <input
                                placeholder="Search for tltle"
                                value={this.state.input_search_value}
                                onChange={this.handleInputChange}
                            />
                        </form>
                    </div>   
                    <div className="search_btn mb-4 ml-2">
                        <Button variant="info" className="mr-1 mb-1" onClick={(e) => this.SortData()}>Sort By Date</Button>
                    </div>
                </div>   

                <div className="row">
                    { this.state.filteredData.lenght >= 0 ? 
                        <p>not found</p>
                        :(
                            this.state.filteredData.map((card,i) => {
                                return (
                                    <div className="col-sm-6 mb-4" key={i}> 
                                        <CardComponents card={card}/>
                                    </div>  
                                )   
                            })
                        )  
                    }
                </div>
            </div>
        );
    }
}

//functionless card components
function CardComponents (props){
    return(
        <Card className="card_doc">
            <Card.Body>
                <blockquote className="blockquote mb-0">
                <p className="text-left"> {props.card.webTitle}</p>
                <footer className="blockquote-footer text-left">
                    <cite title="Source Title">{ props.card.sectionName }</cite>
                </footer>
                </blockquote>
            </Card.Body>
            <Card.Footer className="text-muted">
                    <div className="row">
                        <div className="col-sm-6">
                            <p>{ props.card.webPublicationDate }</p>
                        </div> 
                        <div className="col-sm-6">                                                         
                                <ButtonCard card={props.card}/>
                        </div>
                </div>
            </Card.Footer>
        </Card>
    )
}

//functionless button in card components 
class ButtonCard extends React.Component {
    handleDataonclick(card){
        console.log(card)
    }

    render(){
        return (
            <div className="row">
                <Button variant="danger" href={this.props.card.webUrl} className="mr-1 mb-1">Go to website</Button>
                <Button variant="info" className="mr-1 mb-1" onClick={(e) => this.handleDataonclick(this.props.card)} >Read more</Button>
            </div>
        )    
    }
}

export default CardList ;
