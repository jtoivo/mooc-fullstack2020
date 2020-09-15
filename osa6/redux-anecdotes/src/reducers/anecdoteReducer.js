import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      state = action.data
      break
    case 'VOTE_ANECDOTE':
      const id = action.data.id
      const anecdote = state.find(a => a.id === id)
      const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
      state = state.map(a => a.id !== id ? a : votedAnecdote)
      break
    case 'CREATE_ANECDOTE':
      state = state.concat(action.data)
      break
    default:
      break
  }
  return state.sort((a, b) => b.votes - a.votes)
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote.id, anecdote)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(
      {
        type: 'CREATE_ANECDOTE',
        data: newAnecdote
      })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer