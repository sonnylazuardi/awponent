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
import NewRelease from './child_screens/newrelease';
import ButtonBar from '../components/button-bar';
import { connect } from 'react-redux';
import { loadData } from '../actions/data_action';

class Landing extends Component {
    constructor() {
        super();
        this.state = {
            index: 0,
            routes: [],
            loading: true
        }

        this.changeIndex = this.changeIndex.bind(this)
    }

    componentDidMount() {
        this.props.loadData();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data != nextProps.data) {
            this.setState({
                routes: nextProps.data.featured.map(item => ({ key: item.repo, data: item })),
                liked: nextProps.data.liked
            })
        }
    }

    renderChild() {
        const {index, routes, liked} = this.state;
        if(routes.length == 0) {
            return <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
                <Text style={{fontSize: 24, color: colors.text, fontWeight: '300'}}>Loading...</Text>
            </View>
        }

        if(index == 0) {
            var data = routes.sort((a, b) => {
                if (a.data.tag == 'featured' && b.data.tag != 'featured') {
                    return -1;
                } else if (a.data.tag != 'featured' && b.data.tag == 'featured') {
                    return 1;
                }  else {
                    return 0;
                }
            });
            console.log('DATA FEATURED', data);
            return <Featured routes={data} liked={liked}/>
        } else {
            var data = routes.sort((a, b) => {
                return parseInt(a.data.timestamp) - parseInt(b.data.timestamp);
            });
            console.log('DATA NEW', data);
            return <NewRelease routes={data} liked={liked}/>
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
