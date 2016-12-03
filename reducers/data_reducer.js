/**
 * Created by ggoma on 2016. 11. 29..
 */
import {INIT_DATA, LOADING, SAVE_TO_LIKED, UNLIKE, SET_CURRENT_FEATURED_INDEX} from '../actions/data_action';
import {featuredWithLiked, uniqueLiked} from '../helpers/helpers';

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
            var {liked, featured} = action.payload;
            liked = liked.map(item => ({...item, liked: true}));
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
            return {
                ...state,
                liked,
                featured: featuredWithLiked(state.featured, liked)
            }
        case UNLIKE:
            var liked = state.liked.filter(item => item.repo !== action.payload.repo);
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
        default:
            return state
    }
}