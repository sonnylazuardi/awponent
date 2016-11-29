/**
 * Created by ggoma on 2016. 11. 29..
 */
import {
AsyncStorage
} from 'react-native';

import {differenceBetween} from '../helpers/helpers';


let data = require('../components.json');

export const INIT_DATA = 'INIT_DATA';
export const LOADING = 'LOADING';

export function initData(data) {
    console.log('initiating data');
    return {
        type: INIT_DATA,
        payload: data
    }
}

function loadingChangedAction(isLoading) {
    return {
        type: LOADING,
        isLoading: isLoading
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

            dispatch(loadingChangedAction(false));
            dispatch(initData(d));
            console.log('data reducer', d);
            return Promise.resolve(d);
        })

        return promise;

    }
}