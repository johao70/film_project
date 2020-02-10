import React, { Component } from 'react';
import { Text, View, StyleSheet,ImageBackground,TouchableHighlight } from 'react-native';
import { Link } from "react-router-native";

export default class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        
    }

    render() {
  return(
    <ImageBackground style={ styles.container } source={ require('../../assets/bg.jpg') }>
      <View style={ styles.overlayContainer}>
        <View style={ styles.top }>
          <Text style={ styles.header }>DETALLE DE LA PELÍCULA</Text>
        </View>

        <View style={ styles.menuContainer }>
            <TouchableHighlight style={ styles.button }>
              <Link to="/">
                <Text>Volver</Text>
              </Link>
            </TouchableHighlight>

            <TouchableHighlight style={ styles.button }>
              <Link to="/buy_tickets">
                <Text>Comprar</Text>
              </Link>
            </TouchableHighlight>
        </View>
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
      textAlign: 'center'
  },
  menuContainer: {
      height: '40%',
      // flexDirection: 'row',
      // flexWrap: 'wrap',
  },
  button: {
    position: 'relative',
    width: '25%',
    marginBottom: 20,
    left: '50%',
    color: '#000',
    borderRadius: 100,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})