import React from 'react'
import { StyleSheet, View, PermissionsAndroid, Platform } from 'react-native'
import { API_KEY } from './src/utils/WeatherAPIKey'
import Fetching from './src/components/Fetching'
import Weather from './src/components/Weather'

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: 'Haze',
    error: null
  }
  
  fetchWeather(lat = 25, lon = 25) {
    console.log('fetching...')
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=imperial`)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: false,
          error: null
        })
      })
      .catch(err => {
        console.log('ERR FETCHING', err)
        this.setState({error: 'Error fetching weather'})
      })
  }

  componentDidMount() {
    console.log('comp did mount <<<<<<<<<<<')
    console.log('perms', PermissionsAndroid.RESULTS.GRANTED)
    var that = this;
    //Checking for the permission just after component loaded
    if (Platform.OS === 'ios') {
      console.log('we are on ios<<<<<<<<')
      this.callLocation(that);
    } else {
      console.log('we are on android<<<<<<<<')
      async function requestCameraPermission() {
        try {
          if (PermissionsAndroid.RESULTS.GRANTED === 'granted') {
            console.log('already have perm, lets fetch some weather')
            that.callLocation(that);
          } else {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                'title': 'Location Access Required',
                'message': 'This App needs to Access your location'
              }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //To Check, If Permission is granted
              that.callLocation(that);
            } else {
              alert("Permission Denied");
            }  
          }
        } catch (err) {
          console.warn(err)
          this.setState({error: 'Error getting permission'})
        }
      }
      requestCameraPermission();
    }
  }

  callLocation(that) {
    console.log('in call location<<<<<<<<<<<<<<<<<<<')
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude)
      },
      error => {
        this.setState({
          error: 'Error getting weather conditions'
        })
        console.log('ERROR in navigator', error)
      }
    )
  }

  render() {
    const { isLoading, weatherCondition, temperature, error } = this.state

    return (
      <View style={styles.container}>
          {isLoading ?
            <Fetching errorMsg={error} />
            :
            <Weather weather={weatherCondition} temperature={temperature} />
          }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
