import React, { Component } from "react"
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import Stack from 'react-bootstrap/Stack'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import CollapsedQuestion from "./CollapsedQuestion"

class Home extends Component
{
	componentDidMount = () =>
	{
	}

	render()
	{		
		if (!this.props.authedUser)
			return (
				<Redirect to={{
				pathname: "/signin",
				state: { referrer: ""}
			}} />
			)

		if(!this.props.questions || !this.props.authedUser)
			return <span>loading</span>

		const answered = Object.keys(this.props.questions).filter((key) => (
			Object.keys(this.props.users[this.props.authedUser].answers).includes(key)
		))
		const unanswered = Object.keys(this.props.questions).filter((key) => (
			!(Object.keys(this.props.users[this.props.authedUser].answers).includes(key))
		))

		return(
			<Tabs defaultActiveKey="unanswered" className="mb-3">
				<Tab eventKey="unanswered" title="Unanswered">
					<Stack gap="4">
						{
							unanswered.sort((a, b) => this.props.questions[b].timestamp - this.props.questions[a].timestamp).map((q) => (
								<CollapsedQuestion key={q} question={this.props.questions[q]} />
							))
						}
					</Stack>
				</Tab>
				<Tab eventKey="answered" title="Answered">
					<Stack gap="4">
						{
							answered.sort((a, b) => this.props.questions[b].timestamp - this.props.questions[a].timestamp).map((q) => (
								<CollapsedQuestion key={q} question={this.props.questions[q]} />
							))
						}
					</Stack>
				</Tab>
			</Tabs>
		)
	}
}

function mapStateToProps({ questions, authedUser, users })
{
	return ({
		questions: questions,
		...authedUser,
		users
	})
}

export default connect(mapStateToProps)(Home)