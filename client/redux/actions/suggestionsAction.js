import {GLOBAL_TYPES} from './globalTypes';
import {getDataAPI } from '../../utils/fetchData'


export const SUGGESTIONS_TYPES = {
    LOADING : 'LOADING_SUGGESTIONS',
    GET_USERS : 'GET_USERS_SUGGESTIONS'
}

export const getSuggestions = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI('suggestionsUser', token)
       
        dispatch({
            type: SUGGESTIONS_TYPES.GET_USERS,
            payload: res.data.users
        })
    } catch (err) {
        console.log(err)
    }
}