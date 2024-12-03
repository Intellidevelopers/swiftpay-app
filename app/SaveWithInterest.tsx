import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'

const SaveWithInterest = () => {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
        <Image source={require('../assets/interestmockup.png')} style={styles.mock} />
      <View style={styles.highlight}>
      <Text style={styles.headerTitle}>Save With Interest</Text>
      <View style={styles.row}>
        <Image source={require('../assets/icons/security-safe.png')} style={styles.icon} />
        <Text>Safe and Secured way to save your money</Text>
      </View>

      <View style={styles.row}>
        <Image source={require('../assets/icons/lock2.png')} style={styles.icon} />
        <Text>Lock your savings whenever you want</Text>
      </View>

      <View style={styles.row}>
        <Image source={require('../assets/icons/card-send.png')} style={styles.icon} />
        <Text>Get high interest on your savings today</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/SaveNow')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default SaveWithInterest

const styles = StyleSheet.create({
    container:{
        padding: 15,
    },
    icon:{
        width: 20,
        height: 20
    },
    highlight:{
        marginVertical: '20%',
        alignSelf: "center"
    },
    row:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 20
    },
    button:{
        backgroundColor: "#0000ff",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 20
    },
    buttonText:{
        color: "#fff",
        fontSize: 16
    },
    headerTitle:{
        fontSize: 18,
        fontWeight: "700",
        alignSelf: "center",
        marginBottom: 20
    },
    mock:{
        width: 250,
        height: 250,
        marginTop: 80,
        alignSelf: "center",
        resizeMode: "contain"
    },
      backButton: {
        padding: 15,
        backgroundColor: '#ddd',
        borderRadius: 100,
        alignSelf: "flex-start",
        marginTop: 40
      },
})