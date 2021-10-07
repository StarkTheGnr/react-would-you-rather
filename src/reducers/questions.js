import { GET_QUESTIONS, SAVE_QANSWER, NEW_QUESTION } from "../actions/questions"

export default function questions (state = {}, action)
{
	console.log("action", action)

	switch(action.type)
	{
		case GET_QUESTIONS:
			return ({
				...state,
				...action.questions
			})
		case SAVE_QANSWER:
			return ({
				...state,
				[action.qid]: {
					...state[action.qid],
					[action.option]: {
						...state[action.qid][action.option],
						votes: [
							...state[action.qid][action.option].votes,
							action.uid 
							]
					}
					}
			})
		case NEW_QUESTION:
			return {
				...state,
				[action.question.id]: action.question
			}
		default:
			return state
	}
}