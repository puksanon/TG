import React from 'react';
import axios from 'axios';
import './style_card.css'
import { Card , Button } from 'react-bootstrap';


class CardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            search_data: [ ]
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

    render() {
            return (
                <div className="row">
                    {this.state.search_data.length > 0 ? 
                        (
                            this.state.search_data.map((card , i) => {
                                return (
                                    <div className="col-sm-6 mb-4" key={i}> 
                                        <Card className="card_doc">
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
                                                        <div className="row">
                                                            <Button variant="danger" href={card.webUrl} className="mr-1 mb-1">Go to website</Button>
                                                            <Button variant="info"  className="mr-1 mb-1 ">Read more</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card.Footer>
                                        </Card>
                                    </div>
                                );
                            })
                        ):
                        (
                            this.state.data.map((card , i) => {
                                return (
                                    <div className="col-sm-6 mb-4" key={i}> 
                                        <Card className="card_doc">
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
                                                        <div className="row">
                                                            <Button variant="danger" href={card.webUrl} className="mr-1 mb-1">Go to website</Button>
                                                            <Button variant="info"  className="mr-1 mb-1 ">Read more</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card.Footer>
                                        </Card>
                                    </div>
                                );
                            })
                        )
                    }
                </div>    
            )
    }
}

export default CardList ;
