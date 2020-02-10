import React, { Component } from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';

import GetMovies from './get_movies'

export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: [],
        };
    }

    render() {
    return(
        <ImageBackground style={ styles.container } source={ require('../../assets/bg.jpg') }>
            <View style={ styles.overlayContainer}>
                <View style={ styles.top }>
                    <Text style={ styles.header }>CARTELERA</Text>
                </View>

                <View style={ styles.menuContainer }>
                    <GetMovies itemImage={ require('../../assets/film_default.jpg') } />
                </View>

                {/* <Link to="/test">
                    <Text>Topics</Text>
                </Link> */}

            </View>
        </ImageBackground>
    )}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlayContainer: {
        flex: 1,
        backgroundColor: 'rgba(47,163,218, .4)',
    },
    top: {
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        color: '#fff',
        fontSize: 28,
        borderColor: '#fff',
        borderWidth: 2,
        padding: 20,
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: 'rgba(255,255,255, .1)',
    },
    menuContainer: {
        height: '40%',
        // flexDirection: 'row',
        // flexWrap: 'wrap',
    }
})