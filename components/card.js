/**
 * Created by ggoma on 2016. 11. 28..
 */
import React, {Component} from 'react';
import {
Animated,
View,
AsyncStorage,
Text,
Image,
Dimensions,
Linking,
TouchableOpacity,
StyleSheet
} from 'react-native';

import {cardSize} from '../helpers/screen';
const {width, height} = Dimensions.get('window');
const size = cardSize(height);
import {differenceBetween} from '../helpers/helpers';
import { Ionicons } from '@exponent/vector-icons';
import colors from '../helpers/colors';
import {connect} from 'react-redux';
import {unlike, like} from '../actions/data_action';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state= {
            opacity: new Animated.Value(1),
            loading: true,
        }

        this.liked = this.liked.bind(this);
        this.openExponent = this.openExponent.bind(this);
        this.openGitHub = this.openGitHub.bind(this);
    }

    renderAvatar(author) {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={{uri: author.picture}} style={{width: 30, height: 30, borderRadius: 15, borderWidth: 1}}>

                </Image>
                <Text style={{paddingLeft: 10, fontWeight: '700', color: colors.text}}>{author.username}</Text>
            </View>
        )
    }

    renderHearts() {
        const {liked} = this.props.info;
        return (
            <TouchableOpacity onPress={this.liked} style={{flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name={liked ? 'md-heart' : 'md-heart-outline'} color={liked ? 'red' : 'gray'} size={24}/>
            </TouchableOpacity>
        )
    }

    liked() {
        const {liked} = this.props.info;
        if(!liked) {
            console.log('liking', this.props.info);
            this.props.like(this.props.info);
            return
        }
        
        //delete from liked
        console.log('unliking');
        this.props.unlike(this.props.info);
    }

    openGitHub() {
        let url = this.props.info.repo;
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    openExponent() {
        let url = this.props.info.exponentUrl;
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    loadImage(name, displayPicture, description) {
        return (
            <Image source={{uri: displayPicture}} style={styles.img}>
                <View style={styles.blur}>
                    <Text style={{fontWeight: '800', fontSize: 24, backgroundColor: 'transparent', color: 'white'}}>{name}</Text>
                    <Text style={{color: 'white', fontSize: 12, textAlign: 'center'}}>{description}</Text>

                    <View style={{flexDirection: 'row', backgroundColor: 'transparent', height: 50}}>
                        <TouchableOpacity
                            onPress={this.openGitHub}
                            style={{flex: 1, borderRadius: 5, backgroundColor: 'white', margin: 8,
                                    justifyContent: 'center', alignItems: 'center'}}>
                            <Ionicons name='logo-github' size={24}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.openExponent}
                            style={{flex: 1, borderRadius: 5, backgroundColor: 'white', margin: 8,
                                    justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={require('../assets/images/exponent-icon@3x.png')} style={{width: 24, height: 24, resizeMode: 'contain'}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Image>
        )
    }

    render() {
        
        const {name, author, displayPicture, description} = this.props.info;
        return (
            <View>
                <View style={{flex: 1, width: size.width, height: size.height, borderWidth: 1}}>
                    {this.loadImage(name, displayPicture, description)}
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10}}>
                    {this.renderAvatar(author)}
                    {this.renderHearts()}
                </View>
            </View>
        )
        
    }
}

export default connect(state => ({data: state.data}), {like, unlike})(Card);

const styles = StyleSheet.create({
    img: {
        flex: 1,
        height: null,
        width: null,
        resizeMode: 'stretch'
    },
    blur: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.6)',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 0
    }
})