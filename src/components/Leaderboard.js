import React, { Component } from "react"
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import LeaderboardCard from "./LeaderboardCard"
import Stack from 'react-bootstrap/Stack'

class Leaderboard extends Component
{
	render()
	{
		if (!this.props.authedUser)
			return (
				<Redirect to={{
				pathname: "/signin",
				state: { referrer: "leaderboard"}
			}} />
			)

		return (
			<Stack gap="3" className="d-flex flex-wrap justify-content-center">
			{
				Object.keys(this.props.users).sort((a, b) => {
					const answered = Object.keys(this.props.users[b].answers).length - Object.keys(this.props.users[a].answers).length
					const created1 = Object.keys(this.props.questions).filter((q) => (
						this.props.questions[q].author === this.props.users[a].id
					)).length
					const created2 = Object.keys(this.props.questions).filter((q) => (
						this.props.questions[q].author === this.props.users[b].id
					)).length

					return answered + (created2 - created1)
				}).map((k) => (
					<LeaderboardCard key={k} authorUser={this.props.users[k].id} />
				))
			}
			</Stack>
		)
	}
}

function mapStateToProps({ users, authedUser, questions })
{
	return {
		users,
		questions,
		...authedUser
	}
}

export default connect(mapStateToProps)(Leaderboard)