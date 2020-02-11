import React, { Component } from 'react';
import { Text, View, StyleSheet,ImageBackground,TouchableHighlight } from 'react-native';
import { Link } from "react-router-native";

export default class BuyTickets extends Component {
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
            <Text style={ styles.header }>COMPRAR</Text>
          </View>

          <View style={ styles.menuContainer }>
              <TouchableHighlight style={ styles.button }>
                <Link to="/">
                  <Text>Cartelera</Text>
                </Link>
              </TouchableHighlight>

              <TouchableHighlight style={ styles.button }>
                <Link to="/rooms_schedule">
                  <Text>Volver</Text>
                </Link>
              </TouchableHighlight>

              <TouchableHighlight style={ styles.button }>
                <Link to="/send_tickets">
                  <Text>Confirmar</Text>
                </Link>
              </TouchableHighlight>
          </View>
        </View>
      </ImageBackground>
    )
  }
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
    height: '20%',
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
    top: '50%',
    width: '25%',
    left: '25%',
    marginBottom: 20,
    borderRadius: 100,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})