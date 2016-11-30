/**
 * Created by ggoma on 2016. 11. 29..
 */
import {
AsyncStorage
} from 'react-native';

import {differenceBetween} from '../helpers/helpers';


import data from '../components.js';

export const INIT_DATA = 'INIT_DATA';
export const LOADING = 'LOADING';
export const SAVE_TO_LIKED = 'SAVE_TO_LIKED';
export const UNLIKE = 'UNLIKE';

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
            console.log(value);
            let liked = JSON.parse(value);
            let index = liked.indexOf(project);
            liked.splice(index, 1);
            console.log('new saved',liked);
            AsyncStorage.setItem('liked', JSON.stringify(liked));
            return liked;
        } else {
            let liked = [];
            return liked;
        }
    } catch (error) {
        // Error retrieving data
        console.log(error);
    }
}

async function load() {
    try {
        let value = await AsyncStorage.getItem('liked');
        if (value !== null){
            //retrieve data
            let liked = JSON.parse(value);
            // let featured = differenceBetween(data, liked);
            return {
                featured: data,
                liked,
                loading: false,
            };
        } else {
            return {
                featured: data,
                liked: [],
                loading: false

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
        let promise = load().then((d) => {

            dispatch(initData(d));
            console.log('data reducer', d);
            return Promise.resolve(d);
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