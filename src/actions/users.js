import { _getUsers, _saveQuestionAnswer } from "../utils/_DATA"
import { saveQAnswer } from "./questions"

export const GET_USERS = "GET_USERS"
export const SAVE_ANSWER = "SAVE_ANSWER"

function getUsers(users)
{
	return {
		type: GET_USERS,
		users
	}
}

export function saveAnswer(authedUser, question, option)
{
	return {
		type: SAVE_ANSWER,
		authedUser: authedUser,
		question: question,
		option
	}
}

export function handleGetUsers()
{
	return (dispatch) => {
		return _getUsers().then((users) => {
			dispatch(getUsers(users))
		})
	}
}

export function handleSaveAnswer(authedUser, question, option)
{
	return (dispatch) => {
		return _saveQuestionAnswer({authedUser: authedUser.id, qid: question.id, answer: option}).then(() => {
			dispatch(saveAnswer(authedUser, question, option))
			dispatch(saveQAnswer(question.id, authedUser.id, option))
		})
	}
}