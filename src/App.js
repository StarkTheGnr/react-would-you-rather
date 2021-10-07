import './App.css';
import React, { Component } from "react"
import Login from "./components/Login"
import Home from "./components/Home"
import Question from "./components/Question"
import NewQuestion from "./components/NewQuestion"
import Leaderboard from "./components/Leaderboard"
import Navigation from "./components/Navigation"
import NotFound from "./components/NotFound"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { connect } from "react-redux"
import { handleGetUsers } from "./actions/users"
import { handleGetQuestions } from "./actions/questions"

class App extends Component
{
  componentDidMount()
  {
    console.log("dispatching")
    this.props.dispatch(handleGetUsers())
    this.props.dispatch(handleGetQuestions())
  }

  render()
  {
    return (
      <Router>
        <div className="App">
          <Navigation />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/newquestion" component={NewQuestion} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/signin" component={Login} />
            <Route path="/question/:qid" component={Question} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ users, authedUser })
{
  return {
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(App);
