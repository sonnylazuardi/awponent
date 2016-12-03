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
import Search from './child_screens/search';
import NewRelease from './child_screens/newrelease';
import ButtonBar from '../components/button-bar';
import { connect } from 'react-redux';
import { loadData } from '../actions/data_action';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }

        this.changeIndex = this.changeIndex.bind(this)
    }

    componentDidMount() {
        this.props.loadData();
    }

    componentWillReceiveProps(nextProps) {

    }

    renderChild() {
        const {index} = this.state;
        const {searchActive} = this.props.data;
        if (searchActive) {
            return <Search />
        } else {
            if (index == 0) {
                return <Featured />
            } else {
                return <NewRelease />
            }
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

export default connect(state => ({data: state.data}), {loadData})(Landing);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
    },

});
