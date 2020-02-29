import React from 'react'
import Card  from '../components/home/Card'

class Index extends React.Component {
	render() {
		return (
            <React.Fragment>
                <div className="content mt-5">
                    <div className="container">
                      <div className="text_title mb-4">
                        <h1>ALL LIST</h1>
                      </div>
              
                      <div className="card_main">    
                          <Card/>
                      </div>
                    </div>
                </div>
            </React.Fragment>
        )
	}
}

export default Index