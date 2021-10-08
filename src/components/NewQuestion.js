import React, { Component } from "react"
import { Redirect, withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { handleNewQuestion } from "../actions/questions"
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

class NewQuestion extends Component
{
	handleCreate = (e) => {
		e.preventDefault()

		if(this.props.authedUser && this.state.q1 && this.state.q2)
		{
			this.props.dispatch(handleNewQuestion(this.state.q1, this.state.q2, this.props.authedUser))
			e.target.disabled = true

			this.props.history.push("/")
		}
	}

	render()
	{
		if (!this.props.authedUser)
			return (
				<Redirect to={{
				pathname: "/signin",
				state: { referrer: "newquestion"}
			}} />
			)
		
		return (
			<Container className="d-flex flex-wrap justify-content-center">
				<Card style={{ width: '33rem'}}>
				  <Card.Body>
				  	<div className="d-flex flex-wrap border" style={{margin: "-17px", marginBottom: "20px", padding: "20px"}}>
				    	<Card.Title className="" style={{marginBottom: "0px"}}>Create New Question</Card.Title>
				    </div>
				  	<div className="d-flex flex-wrap" style={{margin: "-17px", marginBottom: "2px", padding: "10px 20px"}}>
				    	<Card.Subtitle className="mb-2 text-muted">Complete the question:</Card.Subtitle>
				    </div>
				  	<div className="d-flex flex-wrap" style={{margin: "-17px", marginBottom: "2px", padding: "10px 20px"}}>
					    <Card.Text className="h2">
					      Would you rather...
					    </Card.Text>
				    </div>
				  	<Stack gap="3" className="d-flex flex-wrap" style={{padding: "10px 10px"}}>
				  		<Form.Control onChange={(e) => this.setState({q1: e.target.value})} type="text" placeholder="Option One"/>
				  		<div className="d-flex flex-wrap justify-content-center" style={{padding: "10px 20px"}}>
						    <Card.Text className="h2">
						      OR
						    </Card.Text>
				    	</div>
				  		<Form.Control onChange={(e) => this.setState({q2: e.target.value})} type="text" placeholder="Option Two"/>
				  		<Button onClick={this.handleCreate}>Create</Button>
				  	</Stack>
				  </Card.Body>
				</Card>
			</Container>
		)
	}
}

function mapStateToProps({authedUser})
{
	return {
		...authedUser
	}
}

export default withRouter(connect(mapStateToProps)(NewQuestion))