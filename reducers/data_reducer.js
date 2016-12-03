/**
 * Created by ggoma on 2016. 11. 29..
 */
import {INIT_DATA, LOADING, SAVE_TO_LIKED, UNLIKE, SET_CURRENT_FEATURED_INDEX, SET_CURRENT_LIKED_INDEX, SET_CURRENT_NEWRELEASE_INDEX} from '../actions/data_action';
import {unique, without} from '../helpers/helpers';
import {
    AsyncStorage
} from 'react-native';

const initial_state = {
    repos: [],
    likedIds: [],
    routes: [],
    f_routes: [],
    loading: true,
    currentFeaturedIndex: 0,
    currentLikedIndex: 0,
    currentNewReleaseIndex: 0,
}

export default function data_reducer(state = initial_state, action = {}) {
    switch (action.type) {
        case INIT_DATA:
            var {likedIds, repos} = action.payload;
            console.log(action.payload);
            return {
                ...state,
                ...action.payload,
                likedIds,
                repos
            }
        case LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case SAVE_TO_LIKED:
            var likedIds = unique([...state.likedIds, action.payload.repo]);
            AsyncStorage.setItem('liked', JSON.stringify(likedIds));
            return {
                ...state,
                likedIds
            }
        case UNLIKE:
            var likedIds = without(state.likedIds, action.payload.repo);
            AsyncStorage.setItem('liked', JSON.stringify(likedIds));
            return {
                ...state,
                likedIds
            }
        case SET_CURRENT_FEATURED_INDEX:
            return {
                ...state,
                currentFeaturedIndex: action.payload
            }
        case SET_CURRENT_LIKED_INDEX:
            return {
                ...state,
                currentLikedIndex: action.payload
            }
        case SET_CURRENT_NEWRELEASE_INDEX:
            return {
                ...state,
                currentNewReleaseIndex: action.payload
            }
        default:
            return state
    }
}