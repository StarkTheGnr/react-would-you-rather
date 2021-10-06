import { getUsers } from "./users"
import { getQuestions } from "./questions"
import { _getUsers, _getQuestions } from "../utils/_DATA"

export const GET_INITIAL_DATA = "GET_INITIAL_DATA"

export function handleGetUsers()
{
	return (dispatch) => {
		return _getUsers().then((users) => {
				return _getQuestions().then((questions) => {
					dispatch(getUsers(users))
					dispatch(getQuestions(questions))
				})
			})
	}
}