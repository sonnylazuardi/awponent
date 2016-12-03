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
import Card from '../../components/card';
import { TabViewAnimated, TabViewPagerPan } from 'react-native-tab-view';
import colors from '../../helpers/colors';
import {cardSize} from '../../helpers/screen';
import {includes} from '../../helpers/helpers';
const {width, height} = Dimensions.get('window');
const size = cardSize(height);


import {loadData, setCurrentFeaturedIndex} from '../../actions/data_action';
import { connect } from 'react-redux';


const initialLayout = {
    height: 0,
    width: width
};

class Featured extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: props.data.currentFeaturedIndex,
            routes: props.routes,
            liked: props.liked,
            loading: props.loading,
        }
        this._renderScene = this._renderScene.bind(this);
        this._buildCoverFlowStyle = this._buildCoverFlowStyle.bind(this);
        this._handleChangeTab = this._handleChangeTab.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.routes != nextProps.routes) {
            console.log('new routes:', nextProps.routes);
            this.setState({routes: nextProps.routes, liked: nextProps.liked});
        }
        if (this.props.data.currentFeaturedIndex != nextProps.data.currentFeaturedIndex) {
            this.setState({index: nextProps.data.currentFeaturedIndex});
        }
    }

    _buildCoverFlowStyle ({ layout, position, route, navigationState }) {
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

    _handleChangeTab(index) {
        this.props.setCurrentFeaturedIndex(index);
    };

    _renderScene(props) {
        if (Math.abs(this.state.index - this.state.routes.indexOf(props.route)) > 2) {
            return null;
        }
        return (
            <Animated.View style={[ styles.page, this._buildCoverFlowStyle(props) ]}>
                <View style={styles.album}>
                    <Card key={props.route.key}
                          liked={includes(this.state.liked, props.route.data)}
                          deleted={this.deleted} info={props.route.data}/>
                </View>
            </Animated.View>
        );
    };

    _renderPager = (props) => {
        return <TabViewPagerPan {...props} />;
    };

    render() {

        const {loading, routes} = this.state;
        // if(loading) {
        //     return <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        //         <Text style={{fontSize: 24, color: colors.text, fontWeight: '300'}}>Loading...</Text>
        //     </View>
        // }
        //
        // if(routes.length == 0) {
        //     return <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        //         <Text style={{fontSize: 24, color: colors.text, fontWeight: '300'}}>No projects to display</Text>
        //     </View>
        // }
        return (
            <View style={styles.container}>
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

export default connect(state => ({data: state.data}), {setCurrentFeaturedIndex})(Featured);

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
