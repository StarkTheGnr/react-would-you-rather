import React, { Component } from "react"
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'

class LeaderboardCard extends Component
{
	render()
	{
		if(!this.props.authorUser)
			return <br/>

		const answered = Object.keys(this.props.authorUser.answers).length
		const created = Object.keys(this.props.questions).filter((q) => (
			this.props.questions[q].author === this.props.authorUser.id
		)).length

		return (
			<Container className="d-flex flex-wrap justify-content-center">
				<div style={{border: "2px solid", padding: "20px"}}>
					<div className="flex-wrap">
						<div style={{marginLeft: "10px", marginTop: "50px", marginBottom: "20px", float: "left"}}>
							<img src={this.props.authorUser.avatarURL} alt="avatar" style={{width: "100px", marginRight: "15px", height: "100px"}}/>
						</div>
						<div style={{width: "400px"}}>
							<h4>{this.props.authorUser.name}</h4>
							<label style={{marginLeft: "-100px", marginTop: "40px"}}>
								Answered: {answered}
							</label>
							<br/>
							<label style={{marginLeft: "-100px"}}>
								Created: {created}
							</label>
						</div>
						<div style={{backgroundColor: "#3dbba2", borderRadius: "50%", float: "right", width: "60px", height:"60px", marginTop: "-55px"}}>
							<h3 className="align-middle" style={{marginTop: "11px"}}>{answered + created}</h3>
						</div>
					</div>
				</div>
			</Container>
	)
	}
}

function mapStateToProps({ users, questions }, { authorUser })
{
	return {
		authorUser: users[authorUser],
		questions
	}
}

export default connect(mapStateToProps)(LeaderboardCard)