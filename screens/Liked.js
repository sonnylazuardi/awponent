/**
 * Created by ggoma on 2016. 11. 29..
 */
/* @flow */
/* eslint-disable import/no-commonjs */

import React, { Component } from 'react';
import {
    Animated,
    AsyncStorage,
    View,
    Image,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';
import Card from '../components/card';
import { TabViewAnimated, TabViewPagerPan } from 'react-native-tab-view';
import colors from '../helpers/colors';
import {cardSize} from '../helpers/screen';
import {differenceBetween} from '../helpers/helpers';
const {width, height} = Dimensions.get('window');
const size = cardSize(height);

import { connect } from 'react-redux';
import {setCurrentLikedIndex} from '../actions/data_action';
// const data = require('../components.json');

const initialLayout = {
    height: 0,
    width: width
};

class Liked extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: props.data.currentLikedIndex,
            routes: props.data.liked.map(item => ({ key: item.repo, data: item })),
            loading: false
        }
        this._renderScene = this._renderScene.bind(this);
    }

    componentWillMount() {
        // AsyncStorage.clear();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data != nextProps.data) {
            console.log('props for liked received!', nextProps);
             if (this.state.index > nextProps.data.liked.length - 1) {
                this.setState({index: nextProps.data.liked.length - 1})
            } else if (nextProps.data.liked.length == 1) {
                this.setState({index: 0})
            }
            this.setState({
                loading: false,
                routes: nextProps.data.liked.map(item => ({ key: item.repo, data: item })),
                index: nextProps.data.currentLikedIndex
            })
        }
    }


    _buildCoverFlowStyle = ({ layout, position, route, navigationState }) => {
        const { width } = layout;
        const { routes } = navigationState;
        const currentIndex = routes.indexOf(route);
        // Prepend '-1', so there are always at least 2 items in inputRange
        const inputRange = [ -1, ...routes.map((x, i) => i) ];
        const translateOutputRange = inputRange.map(i => {
            return ((width / 2.5) * (currentIndex - i)) * -1;
        });
        const scaleOutputRange = inputRange.map(i => {
            if (currentIndex === i) {
                return 1;
            } else {
                return 0.7;
            }
        });
        const opacityOutputRange = inputRange.map(i => {
            if (currentIndex === i) {
                return 1;
            } else {
                return 0.3;
            }
        });

        const translateX = position.interpolate({
            inputRange,
            outputRange: translateOutputRange,
        });
        const scale = position.interpolate({
            inputRange,
            outputRange: scaleOutputRange,
        });
        const opacity = position.interpolate({
            inputRange,
            outputRange: opacityOutputRange,
        });

        return {
            transform: [
                { translateX },
                { scale },
            ],
            opacity,
        };
    };

    _handleChangeTab = (index) => {
        this.props.setCurrentLikedIndex(index);
    };

    _renderScene(props) {
        return (
            <Animated.View style={[ styles.page, this._buildCoverFlowStyle(props) ]}>
                <View style={styles.album}>
                    <Card key={props.route.key} info={props.route.data}/>
                </View>
            </Animated.View>
        );
    };

    _renderPager = (props) => {
        return <TabViewPagerPan {...props} />;
    };

    render() {
        const {loading, routes} = this.state;
        if(loading) {
            return <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
                <Text style={{fontSize: 24, color: colors.text, fontWeight: '300'}}>Loading...</Text>
            </View>
        }

        if(routes.length == 0) {
            return <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
                <Text style={{fontSize: 24, color: colors.text, fontWeight: '300'}}>No liked projects yet!</Text>
            </View>
        }

        return (
            <View style={styles.container}>
                <View style={{height: 100, justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Text style={{fontSize: 32, fontWeight: '200'}}>Liked</Text>
                </View>
                <TabViewAnimated
                    style={[{flex: 1}, this.props.style]}
                    navigationState={this.state}
                    renderPager={this._renderPager}
                    renderScene={this._renderScene}
                    onRequestChangeTab={this._handleChangeTab}
                    initialLayout={initialLayout}
                />
            </View>
        );
    }
}

export default connect(state => ({data: state.data}), {setCurrentLikedIndex})(Liked);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    album: {
        width: size.width,
        height: size.height,
        elevation: 12,
    },
    cover: {
        width: size.width,
        height: size.height,
    },
});
