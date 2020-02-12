import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableHighlight, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { Link } from "react-router-native";
import { RadioButton } from 'react-native-paper';
import axios from 'axios';

const API = "http://172.16.11.136:5000/film/";

export default class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: '',
      pelicula: [],
      sala_peliculas: [],
    };
}

  componentDidMount() {
    axios.get(`${ API }pelicula?id=2`)
    .then(response => {
      this.setState({ pelicula: response.data.datos })
    })
    .catch(error => {
      console.log(error)
    })

    axios.get(`${ API }sala_pelicula?idpelicula=1`)
    .then(response => {
      this.setState({ sala_peliculas: response.data.datos })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    const { pelicula, sala_peliculas, checked } = this.state
    return(
      <ImageBackground style={ styles.container } source={ require('../../assets/bg.jpg') }>
        <View style={ styles.overlayContainer}>
          <View style={ styles.top }>
            <Text style={ styles.header }>DETALLE DE LA PELÍCULA</Text>
          </View>

          <ScrollView vertical={true}>
            { pelicula.map( element => 
              <Card key={ element.id } title={ element.titulo } image={require('../../assets/film_default.jpg')}>
                <Text style={{marginBottom: 10}}>
                  Resumen: { element.resumen }
                </Text>
                <Text style={{marginBottom: 10}}>
                  Categoría: { element.categoria }
                </Text>
                <Text style={{marginBottom: 10}}>
                  Valor de Boleto: { element.valorBoleto }
                </Text>
              </Card>
              )
            }

            <Card title="Horarios Disponibles" >
              { sala_peliculas.map( element => 
                <View key={ element.id }>
                  <Text>Horario: { element.idhorario }</Text>
                  <Text>Sala: { element.idsala }</Text>
                  <RadioButton value={ element.id }
                    status={checked === element.id ? 'checked' : 'unchecked'}
                    onPress={() => { this.setState({ checked: element.id }); }}
                  />
                </View>
                )
              }
            </Card>

            <TouchableHighlight>
              <Link to="/" style={ styles.button }>
                <Text>Volver</Text>
              </Link>
            </TouchableHighlight>
          
            <TouchableHighlight>
              <Link to="/buy_tickets"  style={ styles.button }>
                <Text>Comprar</Text>
              </Link>
            </TouchableHighlight>
          </ScrollView>
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