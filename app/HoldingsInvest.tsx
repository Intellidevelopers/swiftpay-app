import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import Card from '../components/Card'
import Cryptos from '@/components/Cryptos'

const HoldingsInvest = () => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)')}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <Card/>
      <Text style={styles.headerLabel}>My Holdings</Text>
      <Cryptos/>
    </View>
  )
}

export default HoldingsInvest

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 100,
    top: 40,
    marginBottom: 60
  },
  headerLabel:{
    fontSize: 18,
    fontWeight: "700",
    marginTop: 40,
    marginBottom: 20
  }
})