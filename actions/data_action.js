/**
 * Created by ggoma on 2016. 11. 29..
 */
import {
    AsyncStorage
} from 'react-native';

import {differenceBetween, featuredWithLiked} from '../helpers/helpers';

// import data from '../components.json';

export const INIT_DATA = 'INIT_DATA';
export const LOADING = 'LOADING';
export const SAVE_TO_LIKED = 'SAVE_TO_LIKED';
export const UNLIKE = 'UNLIKE';
export const SET_CURRENT_FEATURED_INDEX = 'SET_CURRENT_FEATURED_INDEX';
export const SET_CURRENT_LIKED_INDEX = 'SET_CURRENT_LIKED_INDEX';
export const SET_CURRENT_NEWRELEASE_INDEX = 'SET_CURRENT_NEWRELEASE_INDEX';


export function initData(data) {
    console.log('initiating data');
    return {
        type: INIT_DATA,
        payload: data
    }
}

export function saveToLiked(project) {
    return {
        type: SAVE_TO_LIKED,
        payload: project
    }
}

export function doUnlike(project) {
    return {
        type: UNLIKE,
        payload: project
    }
}

async function loadLiked() {
    try {
        let value = await AsyncStorage.getItem('liked');
        if (value !== null){
            let liked = JSON.parse(value);
            return {
                liked
            };
        } else {
            return {
                liked: []
            };
        }
    } catch (error) {
        console.log(error);
    }
}

async function loadFeatured() {
    try {
        let response = await fetch(`https://rawgit.com/sonnylazuardi/awponent/master/components.json`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });
        let responseJson = await response.json();
        var featured = responseJson
        return {
            featured,
            loading: false,
        };
    } catch (error) {
        // Error retrieving data
        console.log(error);
    }
}

export function loadData() {
    return function(dispatch, getState) {
        let state = getState();
        console.log(state);
        let promise = loadLiked().then((liked) => {
            return loadFeatured(liked.liked).then((featured) => {
                //preprocess the featured data with the liked data use repo as the key
                var data = {...liked, ...featured};
                dispatch(initData(data));
                return Promise.resolve(data);
            })
        })
        return promise;
    }
}

export function like(project) {
    return function(dispatch, getState) {
        let state = getState();
        dispatch(saveToLiked(project));
        // AsyncStorage.setItem('liked', JSON.stringify(state.liked));
        return Promise.resolve();
    }
}

export function unlike(project) {
    return function(dispatch, getState) {
        let state = getState();
        dispatch(doUnlike(project));
        return Promise.resolve();
    }
}

export function setCurrentFeaturedIndex(data) {
    return {
        type: SET_CURRENT_FEATURED_INDEX,
        payload: data
    }
}

export function setCurrentLikedIndex(data) {
    return {
        type: SET_CURRENT_LIKED_INDEX,
        payload: data
    }
}

export function setCurrentNewReleaseIndex(data) {
    return {
        type: SET_CURRENT_NEWRELEASE_INDEX,
        payload: data
    }
}