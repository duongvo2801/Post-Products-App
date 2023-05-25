import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Avatar = ({ source }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.user} source={source} />
        </View>
    )
}

export default Avatar

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        position: 'relative'
    },
    user: {
        width: 40,
        height: 40,
        borderRadius: 10
    }
})