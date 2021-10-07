import React, { Component } from "react"
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { handleSaveAnswer } from "../actions/users"

class Question extends Component
{
	handleSubmit = (e) => {
		e.preventDefault()

		const option = this.state && this.state.option
		console.log("button clicked", this.props)
		if (option)
		{
			this.props.dispatch(handleSaveAnswer(this.props.authedUser, this.props.question, option))
			e.target.disabled = true
		}
	}

	render()
	{
		if (!this.props.authedUser)
			return (
				<Redirect to="/signin" />
			)

		console.log("here")
		const question = this.props.question
		if(!question)
			return <span>No Question</span>

		if(this.props.authedUser.answers[question.id])
		{
			const optionOneSelected = this.props.authedUser.answers[question.id] === "optionOne"
			const votes1 = this.props.question.optionOne.votes.length
			const votes2 = this.props.question.optionTwo.votes.length
			const totalVotes = votes1 + votes2

			console.log(this.props)

			return (
				<Container className="d-flex flex-wrap justify-content-center">
					<div style={{border: "2px solid", padding: "20px"}}>
						
						<div className="flex-wrap">
							<div style={{marginLeft: "10px", marginTop: "50px", marginBottom: "20px", float: "left"}}>
								<span>{this.props.authorUser.name}</span>
								<br/>
								<img src={this.props.authorUser.avatarURL} alt="avatar" style={{width: "100px", marginRight: "15px", height: "100px"}}/>
							</div>
							<div className="d-flex flex-wrap">
								<div style={{width: "400px"}}>
									<Card style={{ width: '18rem', marginLeft: "30px", backgroundColor: optionOneSelected ? "#e1f8f7" : "white", color: optionOneSelected ? "#31bea7" : "black" }}>
									  <Card.Body>
									    <Card.Title>{this.props.question.optionOne.text}</Card.Title>
									    <Card.Subtitle className="mb-2 text-muted">{optionOneSelected ? "selected" : ""}</Card.Subtitle>
									    <Card.Text className="h2">
									      {(votes1/totalVotes * 100).toFixed(1)}%
									    </Card.Text>
									  </Card.Body>
									</Card>
								</div>
							</div>
							<div style={{width: "400px", marginLeft: "115px", marginTop: "20px"}}>
								<Card style={{ width: '18rem', marginLeft: "30px", backgroundColor: !optionOneSelected ? "#e1f8f7" : "white", color: !optionOneSelected ? "#31bea7" : "black" }}>
								  <Card.Body>
								    <Card.Title>{this.props.question.optionTwo.text}</Card.Title>
								    <Card.Subtitle className="mb-2 text-muted">{!optionOneSelected ? "selected" : ""}</Card.Subtitle>
								    <Card.Text className="h2">
								      {(votes2/totalVotes * 100).toFixed(1)}%
								    </Card.Text>
								  </Card.Body>
								</Card>
							</div>
						</div>
					</div>
				</Container>
			)
		}
		else
		{
			return(
				<Container className="d-flex flex-wrap justify-content-center">
					<div style={{border: "2px solid", padding: "20px"}}>
						<div style={{marginLeft: "-420px", marginTop: "-15px", marginBottom: "20px"}}>
							<span>{this.props.authorUser.name}</span>
						</div>
						<div className="d-flex flex-wrap">
							<img src={this.props.authorUser.avatarURL} alt="avatar" style={{width: "100px", marginRight: "15px", height: "100px"}}/>
							<div style={{width: "400px"}}>
								<h4>Would You Rather...</h4>
								<div>
									<input type="radio" name="radios" id="optionOne" onChange={() => this.setState({option: "optionOne"})}/>
									<label htmlFor="optionOne" style={{marginLeft: "10px"}}>
										{this.props.question.optionOne.text}
									</label>
								</div>
								<div>
									<input type="radio" name="radios" id="optionTwo" onChange={() => this.setState({option: "optionTwo"})}/>
									<label htmlFor="optionTwo" style={{marginLeft: "10px"}}>
										{this.props.question.optionTwo.text}
									</label>
								</div>
								<Button onClick={this.handleSubmit}>Submit</Button>
							</div>
						</div>
					</div>
				</Container>
			)
		}
	}
}

function mapStateToProps({ authedUser, users, questions }, props)
{
	if(authedUser && users && questions && Object.keys(questions).length > 0 && props.match.params.qid)
	{
		console.log("QUESTION FROM LINK:", questions)
		const authorUser = users[questions[props.match.params.qid].author]
		return {
			authorUser,
			authedUser: users[authedUser.authedUser],
			question: questions[props.match.params.qid]
		}
	}

	return {

	}
}

export default connect(mapStateToProps)(Question)