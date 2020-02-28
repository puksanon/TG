import React from 'react'
import Card  from '../components/home/Card'

class Index extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          input: ""
      }
    }

  myChangeHandler = (event) => {
    this.setState({input: event.target.value});
  }

	render() {
		return (
            <React.Fragment>
                <div className="content mt-5">
                    <div className="container">
                      <div className="text_title mb-4">
                        <h1>ALL LIST</h1>
                          <h1>{ this.state.input }</h1>
                      </div>
                      <div className="search_input mb-4">
                        <form>
                              <p>Enter your key:</p>
                          <input
                              type='text'
                              onChange={this.myChangeHandler}
                          />
                        </form>
                      </div>
                      <div className="card_main">    
                          <Card input={this.state.input}/>
                      </div>
                    </div>
                </div>
            </React.Fragment>
        )
	}
}

export default Index