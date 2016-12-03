/**
 * Created by ggoma on 2016. 11. 29..
 */
import {INIT_DATA, LOADING, SAVE_TO_LIKED, UNLIKE, SET_CURRENT_FEATURED_INDEX, SET_CURRENT_LIKED_INDEX, SET_CURRENT_NEWRELEASE_INDEX} from '../actions/data_action';
import {featuredWithLiked, uniqueLiked} from '../helpers/helpers';
import {
    AsyncStorage
} from 'react-native';

const initial_state = {
    featured: [],
    liked: [],
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
            var {liked, featured} = action.payload;
            liked = liked.map(item => ({...item, liked: true}));
            AsyncStorage.setItem('liked', JSON.stringify(liked));
            return {
                ...state,
                ...action.payload,
                liked,
                featured: featuredWithLiked(featured, liked)
            }
        case LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case SAVE_TO_LIKED:
            var liked = uniqueLiked([...state.liked, {...action.payload, liked: true}]);
            AsyncStorage.setItem('liked', JSON.stringify(liked));
            return {
                ...state,
                liked,
                featured: featuredWithLiked(state.featured, liked)
            }
        case UNLIKE:
            var liked = state.liked.filter(item => item.repo !== action.payload.repo);
            AsyncStorage.setItem('liked', JSON.stringify(liked));
            return {
                ...state,
                liked, 
                featured: featuredWithLiked(state.featured, liked)
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