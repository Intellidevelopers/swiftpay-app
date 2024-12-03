import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { router } from 'expo-router'

const ComingSoon = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming Soon</Text>
      <Button style={styles.btn} onPress={() => router.back()}>
        <Text style={styles.btnText}>Go Back Home</Text>
      </Button>
    </View>
  )
}

export default ComingSoon

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#fff",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text:{
        fontSize: 20,
    },
    btn:{
        backgroundColor: "#0000ff",
        
    },
    btnText:{
        color: "#fff"
    }
})