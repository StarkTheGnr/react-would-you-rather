import { _getQuestions, _saveQuestion } from "../utils/_DATA"

export const GET_QUESTIONS = "GET_QUESTIONS"
export const SAVE_QANSWER = "SAVE_QANSWER"
export const NEW_QUESTION = "NEW_QUESTION"

export function getQuestions(questions)
{
	return {
		type: GET_QUESTIONS,
		questions
	}
}

export function saveQAnswer(qid, uid, option)
{
	return {
		type: SAVE_QANSWER,
		qid,
		uid,
		option
	}
}

export function newQuestion(question)
{
	return {
		type: NEW_QUESTION,
		question
	}
}


export function handleGetQuestions()
{
	return (dispatch) => {
		return _getQuestions().then((questions) => {
			dispatch(getQuestions(questions))
		})
	}
}

export function handleNewQuestion(optionOneText, optionTwoText, author)
{
	return (dispatch) => {
		const question = { optionOneText, optionTwoText, author }

		return _saveQuestion(question).then((newQ) => {
			dispatch(newQuestion(newQ))
		})
	}
}