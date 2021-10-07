import React, { Component } from "react"
import { connect } from 'react-redux'
import { loginUser } from "../actions/authedUser"
import { withRouter } from "react-router-dom"
import { logout } from "../actions/authedUser"
import Container from 'react-bootstrap/Container'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

class Login extends Component
{
	componentDidMount = () =>
	{
		this.props.dispatch(logout())
	}

	handleSelectChange = (e) =>
	{
		for (let node of e.target.children) 
		{
		    if (node.value === e.target.value) 
		    {
		    	const id = node.getAttribute("data-id")
		    	
		      	this.setState({selectedId: id, avatarURL: this.props.users[id].avatarURL})
		      	return;
		    }
		}
	}

	handleLogin = (e) =>
	{
		e.preventDefault()

		if (this.state && this.state.selectedId)
		{
			this.props.dispatch(loginUser(this.props.users, this.state.selectedId))
			this.props.history.push("/")
		}
	}

	render() 
	{
		const avatarURL = this.state && this.state.avatarURL


		return (
			<Container className="d-flex flex-wrap justify-content-center">
				<Form style={{width: "40%", border: "2px solid", marginTop: "100px"}}>
					<Form.Group className="mb-3" style={{backgroundColor: "#f8f8f8"}}>
						<Form.Label>Welcome to the Would You Rather App!</Form.Label>
						<br/>
						<Form.Text className="text-muted">Please sign in to continue</Form.Text>
					</Form.Group>
					<Form.Group className="mb-3" style={{}}>
						<img src={avatarURL || "/avatars/avatar3.png"} alt="avatar" style={{width: "100px"}}/>
						<br/><br/><br/>
						<Form.Label className="h2">Sign in</Form.Label>
						<br/><br/>
						<Form.Select style={{width: "80%", marginLeft: "40px"}} onChange={this.handleSelectChange}>
								<option key={null} data-id={null}>
									None
								</option>
							{
								Object.keys(this.props.users).map((key) => (
									<option key={this.props.users[key].id} data-id={this.props.users[key].id}>
										{this.props.users[key].name}
									</option>
								))
							}
						</Form.Select>
						<br/>
						<Button onClick={this.handleLogin}>Login</Button>
					</Form.Group>
				</Form>
			</Container>
		)
	}
}


function mapStateToProps({ users })
{
	console.log(users)
	return {
	 users
	}
}

export default withRouter(connect(mapStateToProps)(Login))