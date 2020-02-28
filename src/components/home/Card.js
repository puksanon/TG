import React from 'react';
import axios from 'axios';
import './style_card.css'
import { Card , Button } from 'react-bootstrap';
  
class DocumentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            data: [],
            filteredData: []
        }
    }

    async componentDidMount() {
        const response = await axios.get(`https://content.guardianapis.com/search?api-key=1aef8006-f6e2-4e95-aab4-a9c6444b0718`)
            .then(res => {
                const get_data = res.data.response.results;
                console.log(get_data)
                this.setState({ data:get_data })
            }).catch(err => {
                console.error(err);
            })
    }

    handleInputChange = event => {
        const query = event.target.value;
    
        this.setState(prevState => {
          const filteredData = prevState.data.filter(element => {
            return element.name.toLowerCase().includes(query.toLowerCase());
          });
    
          return {
            query,
            filteredData
          };
        });
      };


    render() {
        const { data } = this.state;
        return (
            data.map((card , i) => {
                return (
                    <div className="col-sm-6 mb-4" key={i}> 
                        <Card>
                            <Card.Body>
                                <blockquote className="blockquote mb-0">
                                <p className="text-left"> {card.webTitle}</p>
                                <footer className="blockquote-footer text-left">
                                    <cite title="Source Title">{ card.sectionName }</cite>
                                </footer>
                                </blockquote>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <p>{ card.webPublicationDate }</p>
                                    </div> 
                                    <div className="col-sm-6">
                                        <Button href={card.webUrl}>Go to website</Button>
                                    </div>
                                </div>
                            </Card.Footer>
                        </Card>
                    </div>
                );
            })
        )
    }
}

export default DocumentList;
