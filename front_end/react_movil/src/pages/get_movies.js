import React, { Component } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { Link } from "react-router-native";
import axios from 'axios';

const API = "http://192.168.1.11:5000/film/pelicula";

export default class GetMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: [],
        };
    }

    componentDidMount() {
        axios.get(API)
        .then(response => {
            this.setState({ peliculas: response.data.datos })
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
    const { peliculas } = this.state
    return(
        <View>
            { peliculas.map(element => 
                <View key={ element.id } style={ styles.menuItem }>
                    <Link to="/movie_detail" >
                        <View>
                            <Image source={ this.props.itemImage } style={ styles.image } />
                            <Text style={ styles.text }> { element.titulo } </Text>
                        </View>
                    </Link>
                </View>
            ) }
        </View>
    )}
}

const styles = StyleSheet.create({
    menuItem: {
        width: '33.33%',
        height: '50%',
        padding: 20,
        borderColor: '#000',
        paddingBottom: 30,
    },
    image: {
    	width: '100%',
        height: '100%',
        left: '50%',
    	opacity: 0.8,
    	borderColor: '#fff',
    	borderWidth: 3,
    },
    text: {
        color: '#fff',
        left: '50%',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})