import React, { Component } from "react"
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Button from "react-bootstrap/Button"
import { withRouter } from "react-router-dom"

class CollapsedQuestion extends Component
{
	handleSubmit = (e) => {
		e.preventDefault()

		if (this.props.question)
		{
			this.props.history.push("/questions/" + this.props.question.id)
			e.target.disabled = true
		}
	}

	render()
	{
		const question = this.props.question
		if(!question)
			return <span>No Question</span>

		return(
			<Container className="d-flex flex-wrap justify-content-center">
				<div style={{border: "2px solid", padding: "20px"}}>
					<div style={{marginLeft: "-420px", marginTop: "-15px", marginBottom: "20px"}}>
						<span>{this.props.authorUser.name}</span>
					</div>
					<div className="d-flex flex-wrap">
						<img src={this.props.authorUser.avatarURL} alt="avatar" style={{width: "100px", marginRight: "15px", height: "100px"}}/>
						<div style={{width: "400px"}}>
							<h4>Would you rather...?</h4>
							<Button onClick={this.handleSubmit}>Show Details</Button>
						</div>
					</div>
				</div>
			</Container>
		)
	}
}

function mapStateToProps({ authedUser, users }, {question})
{
	const authorUser = users[question.author]
	return {
		authorUser,
		authedUser: users[authedUser.authedUser]
	}
}

export default withRouter(connect(mapStateToProps)(CollapsedQuestion))