import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const Fetching = ({ errorMsg }) => {
    return (
        <View style={styles.fetchContainer}>
            {errorMsg ?
                <Text style={styles.err}>{errorMsg}</Text>
            :
                <Text style={styles.fetchText}>Looking out the window...</Text>
            }
        </View>
    )
}

Fetching.propTypes = {
    errorMsg: PropTypes.string
}

const styles = StyleSheet.create({
    fetchContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 15,
      },
      fetchText: {
        color: 'skyblue',
        fontSize: 72,
      },
      err: {
        color: 'red',
        fontSize: 28,
      }
})

export default Fetching
