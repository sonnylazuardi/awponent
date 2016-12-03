/**
 * Created by ggoma on 2016. 11. 29..
 */
import {
AsyncStorage
} from 'react-native';

import {differenceBetween} from '../helpers/helpers';

// import data from '../components.json';

export const INIT_DATA = 'INIT_DATA';
export const LOADING = 'LOADING';
export const SAVE_TO_LIKED = 'SAVE_TO_LIKED';
export const UNLIKE = 'UNLIKE';
export const SET_CURRENT_FEATURED_INDEX = 'SET_CURRENT_FEATURED_INDEX';

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

async function save(project) {
    try {
        let value = await AsyncStorage.getItem('liked');
        if (value !== null){
            console.log(value);
            let liked = JSON.parse(value);
            liked.push(project);
            console.log('new saved',liked);
            AsyncStorage.setItem('liked', JSON.stringify(liked));
            return liked;
        } else {
            let liked = [];
            liked.push(project);
            console.log('new saved',liked);
            AsyncStorage.setItem('liked', JSON.stringify(liked));
            return liked;
        }
    } catch (error) {
        // Error retrieving data
        console.log(error);
    }
}

async function loadUnlike(project) {
    try {
        let value = await AsyncStorage.getItem('liked');
        if (value !== null){
            let liked = JSON.parse(value);
            let difference = differenceBetween(liked, [project]);
            AsyncStorage.setItem('liked', JSON.stringify(difference));
            return {liked: difference, featured: data};
        } else {
            let liked = [];
            return {liked, featured: data};
        }
    } catch (error) {
        // Error retrieving data
        console.log(error);
    }
}

async function loadLiked() {
    try {
        let value = await AsyncStorage.getItem('liked');
        if (value !== null){
            //retrieve data
            let liked = JSON.parse(value);
            // let featured = differenceBetween(data, liked);
            return {
                liked
            };
        } else {
            return {
                liked: []
            };
        }
    } catch (error) {
        // Error retrieving data
        console.log(error);
    }
}

async function loadFeatured() {
    try {
        let response = await fetch(`https://raw.githubusercontent.com/sonnylazuardi/awponent/master/components.json`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });
        let responseJson = await response.json();

        if (responseJson !== null){
            return {
                featured: responseJson,
                loading: false,
            };
        } else {
            return {
                featured: [],
                loading: false,
            };
        }
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
            return loadFeatured().then((featured) => {
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
        console.log(state);
        let promise = save(project).then((d) => {
            dispatch(saveToLiked(d));
            console.log('data saved', d);
            return Promise.resolve(d);
        })

        return promise;

    }
}

export function unlike(project) {
    return function(dispatch, getState) {
        let state = getState();
        console.log(state);
        let promise = loadUnlike(project).then((d) => {
            dispatch(doUnlike(d));
            console.log('project unliked', d);
            return Promise.resolve(d);
        })

        return promise;

    }
}

export function setCurrentFeaturedIndex(data) {
    console.log('initiating data');
    return {
        type: SET_CURRENT_FEATURED_INDEX,
        payload: data
    }
}