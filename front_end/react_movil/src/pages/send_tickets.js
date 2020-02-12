import React, { Component } from 'react';
import { Text, View, StyleSheet,ImageBackground,TouchableHighlight, TextInput } from 'react-native';
import { Card } from 'react-native-elements';
import { Link } from "react-router-native";

export default class SendTickets extends Component {
  constructor(props) {
      super(props);
      this.state = {

      };
  }

  render() {
    return(
      <ImageBackground style={ styles.container } source={ require('../../assets/bg.jpg') }>
        <View style={ styles.overlayContainer}>
          <View style={ styles.top }>
            <Text style={ styles.header }>Enviar Boletos</Text>
          </View>

          <Card title="Dirección de Correo Electrónico">
            <TextInput 
              placeholder="user@gmail.com"  
              underlineColorAndroid='transparent'  
              style={styles.TextInputStyle}  
              keyboardType={'default'}
            />
          </Card>

            <TouchableHighlight>
              <Link to="/" style={ styles.button }>
                <Text>Cartelera</Text>
              </Link>
            </TouchableHighlight>

            <TouchableHighlight>
              <Link to="/buy_tickets" style={ styles.button }>
                <Text>Volver</Text>
              </Link>
            </TouchableHighlight>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width: '100%', 
    height: '100%',
    justifyContent:'center',
    backgroundColor: 'red',
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
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: 'rgba(255,255,255, .1)',
    textAlign: 'center'
  },
  button: {
    position: 'relative',
    bottom: '0%',
    marginBottom: 20,
    borderRadius: 100,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})