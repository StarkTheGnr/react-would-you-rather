import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

class Navigation extends Component
{
	render()
	{
		return (
			<Navbar bg="light" expand="lg" style={{marginBottom: "20px"}}>
			  <Container>
			    <Navbar.Brand href="/">Would You Rather...?</Navbar.Brand>
			    <Navbar.Toggle aria-controls="basic-navbar-nav" />
			    <Navbar.Collapse id="basic-navbar-nav">
			      <Nav className="me-auto">
			        <Link className="nav-link" to="/">Home</Link>
			        <Link className="nav-link" to="/newquestion">New Question</Link>
			        <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
			      </Nav>
			      {this.props.authedUser ? 
			      (<Nav className="ms-auto">
			      	<span style={{marginTop: "8px"}}>{this.props.authedUser.name}</span>
			        <Link className="nav-link" style={{float: "right"}} to="/signin">Logout</Link>
			      </Nav>) :
			      <Nav className="ms-auto">
			        <Link className="nav-link" style={{float: "right"}} to="/signin">Login</Link>
			      </Nav>
			  		}
			    </Navbar.Collapse>
			  </Container>
			</Navbar>
		)
	}
}

function mapStateToProps({authedUser, users})
{
	if(!authedUser)
		return {}

	return {
		authedUser: users[authedUser.authedUser]
	}
}

export default connect(mapStateToProps)(Navigation)