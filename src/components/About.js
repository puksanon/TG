import React from 'react'

function Hello(props) {
    return <h1>Ahoy! {props.name}</h1>
  }

class About extends React.Component {
	render() {
		return (
            <React.Fragment>
                <Hello name="about" />
            </React.Fragment>
        )
	}
}

export default About