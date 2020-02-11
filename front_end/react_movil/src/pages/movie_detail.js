import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableHighlight, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { Link } from "react-router-native";
import axios from 'axios';

const API = "http://192.168.1.11:5000/film/";

export default class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { pelicula, sala_peliculas } = this.state
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

            { sala_peliculas.map( element => 
              <Card key={ element.id } title="Horarios Disponibles" >
                <Text> { element.idhorario } </Text>
              </Card>
              )
            }

            <Card>
              <TouchableHighlight>
                <Link to="/" style={ styles.button }>
                  <Text>Volver</Text>
                </Link>
              </TouchableHighlight>
            
              <TouchableHighlight>
                <Link to="/rooms_schedule"  style={ styles.button }>
                  <Text>Comprar</Text>
                </Link>
              </TouchableHighlight>
            </Card>
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
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
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