import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'

const GroupSavings = () => {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
        <Image source={require('../assets/mock.png')} style={styles.mock} />
      <View style={styles.highlight}>
      <Text style={styles.headerTitle}>Group Savings</Text>
      <View style={styles.row}>
        <Image source={require('../assets/icons/security-safe.png')} style={styles.icon} />
        <Text>Safe and Secured way to save your money</Text>
      </View>

      <View style={styles.row}>
        <Image source={require('../assets/icons/lock2.png')} style={styles.icon} />
        <Text>Create a shared Savings wallet for any purpose in mind</Text>
      </View>

      <View style={styles.row}>
        <Image source={require('../assets/icons/card-send.png')} style={styles.icon} />
        <Text>Add members and view saving activities</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/GroupDashboard')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default GroupSavings

const styles = StyleSheet.create({
    container:{
        padding: 20,
    },
    icon:{
        width: 20,
        height: 20
    },
    highlight:{
        marginVertical: 20,
        alignSelf: "center"
    },
    row:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 10,
        padding: 10
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
        width: 300,
        height: 300,
        marginTop: 50,
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