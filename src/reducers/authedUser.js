import { LOGIN_USER, LOGOUT } from "../actions/authedUser"

export default function autherUser(state = null, action)
{
	switch (action.type)
	{
		case LOGIN_USER:
			return {
				authedUser: action.user
			}
		case LOGOUT:
			return null
		default:
			return state
	}
}