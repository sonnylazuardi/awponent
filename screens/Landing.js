/* @flow */
/* eslint-disable import/no-commonjs */

import React, { Component } from 'react';
import {
    Animated,
    View,
    Image,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';

import colors from '../helpers/colors';
import Featured from './child_screens/featured';
import ButtonBar from '../components/button-bar';

export default class Landing extends Component {
    constructor() {
        super();
        this.state = {
            index: 0
        }

        this.changeIndex = this.changeIndex.bind(this)
    }

    renderChild() {
        const {index} = this.state;
        if(index == 0) {
            return <Featured/>
        } else {
            return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 24, color: colors.text, fontWeight: '300'}}>No new projects yet!</Text>
            </View>
        }
    }

    changeIndex(index) {
        this.setState({index});
    }

    render() {
        return (
            <View style={styles.container}>
                <ButtonBar changeIndex={this.changeIndex} options={['Featured', 'New']}/>
                {this.renderChild()}
            </View>
        )

    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
    },

});
