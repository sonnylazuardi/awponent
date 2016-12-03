/**
 * Created by ggoma on 2016. 11. 29..
 */
import {INIT_DATA, LOADING, SAVE_TO_LIKED, UNLIKE, SET_CURRENT_FEATURED_INDEX} from '../actions/data_action';

const initial_state = {
    featured: [],
    liked: [],
    routes: [],
    f_routes: [],
    loading: true,
    currentFeaturedIndex: 0
}

export default function data_reducer(state = initial_state, action = {}) {
    switch (action.type) {
        case INIT_DATA:
            return {
                ...state,
                ...action.payload
            }
        case LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case SAVE_TO_LIKED:
            return {
                ...state,
                liked: action.payload
            }
        case UNLIKE:
            return {
                ...state,
                ...action.payload
            }
        case SET_CURRENT_FEATURED_INDEX:
            return {
                ...state,
                currentFeaturedIndex: action.payload
            }
        default:
            return state
    }
}