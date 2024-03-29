import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { weatherConditions } from '../utils/WeatherConditions'
import PropTypes from 'prop-types'

const Weather = ({ weather, temperature }) => {
    return (
        <View style={[styles.weatherContainer, { backgroundColor: weatherConditions[weather].color }]}>
            <View style={styles.headerContainer}>
                <Icon size={72} name={weatherConditions[weather].icon} color="#fff" />
                <Text style={styles.tempText}>{Math.round(temperature)}˚</Text>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>{weatherConditions[weather].title}</Text>
                <Text style={styles.subtitle}>{weatherConditions[weather].subtitle}</Text>
            </View>
        </View>
    )
}

Weather.propTypes = {
    temperature: PropTypes.number.isRequired,
    weather: PropTypes.string
}

const styles = StyleSheet.create({
    weatherContainer: {
        flex: 1,
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    tempText: {
        fontSize: 72,
        color: '#fff',
    },
    bodyContainer: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 25,
        marginBottom: 40
    },
    title: {
        fontSize: 60,
        color: '#fff',
    },
    subtitle: {
        fontSize: 24,
        color: '#fff'
    },
})

export default Weather
