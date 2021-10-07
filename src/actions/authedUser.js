export const LOGIN_USER = "LOGIN_USER"
export const LOGOUT = "LOGOUT"

export function loginUser(users, id)
{
	return {
		type: LOGIN_USER,
		user: id
	}
}

export function logout()
{
	return {
		type: LOGOUT
	}
}