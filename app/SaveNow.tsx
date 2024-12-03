import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Overlay } from '@rneui/themed';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';

const SaveNow = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Welcome Message */}
      <Text style={styles.username}>Hi, Jerome! 👋</Text>
      <Text style={styles.subtext}>Don't forget to save your money!</Text>

      {/* Total Savings Card with Gradient Background */}
      <ImageBackground style={styles.savingsCard}>
        <LinearGradient
          colors={['#ffffff', '#e6e6ff', '#0000ff']}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={styles.savingsInfo}>
          <Text style={styles.savingsTitle}>Total Savings</Text>
          <Text style={styles.amount}>0.00</Text>
          <Text style={styles.interest}>Total Interest</Text>
          <Text style={styles.percent}>50%</Text>
          <TouchableOpacity style={styles.createButton} onPress={() => router.push('/CreateSavings')}>
            <Text style={styles.createButtonText}>Create Savings</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../assets/icons/coin.png')}
          style={styles.coinsImage}
        />
      </ImageBackground>

      {/* Savings Section */}
      <View>
        <View style={styles.viewHiistroryHeader}>
        <Text style={styles.sectionTitle}>Savings</Text>
        <TouchableOpacity onPress={() => router.push('/Transactions')}>
          <Text style={styles.history}>History</Text>
        </TouchableOpacity>
        </View>

        {/* Savings Card 1 */}
        <TouchableOpacity style={styles.savingsItem} onPress={() => router.push('/SavingsDetails')}>
          <View style={styles.savingsContent}>
            <Image source={require('../assets/icons/logo.png')} style={styles.savingsLogo} />
            <View>
              <Text style={styles.savingsTitleText}>New York Road Trip</Text>
              <Text style={styles.savingsSubText}>
                60% <Text style={{ color: "#0000ff", fontSize: 15 }}>•</Text> <Text style={{ color: "#666", fontWeight: "500" }}>20 days left</Text>
              </Text>
              <View style={styles.unlock}>
                <Text style={styles.unlockText}></Text>
              </View>
            </View>
          </View>
          <Text style={styles.balance}>$1,460.15</Text>
        </TouchableOpacity>

        {/* Savings Card 2 */}
        <TouchableOpacity style={styles.savingsItem} onPress={() => router.push('/SavingsDetails')}>
          <View style={styles.savingsContent}>
            <Image source={require('../assets/icons/logo.png')} style={styles.savingsLogo} />
            <View>
              <Text style={styles.savingsTitleText}>New York Road Trip</Text>
              <Text style={styles.savingsSubText}>
                60% <Text style={{ color: "#0000ff", fontSize: 15 }}>•</Text> <Text style={{ color: "#666", fontWeight: "500" }}>20 days left</Text>
              </Text>
              <View style={styles.unlock}>
                <Text style={styles.unlockText}>Unlocked</Text>
                <AntDesign style={{ left: 50 }} name='arrowright' size={30} color={'#0000ff'} />
              </View>
            </View>
          </View>
          <Text style={styles.balance}>$1,460.15</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SaveNow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  username: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 40
  },
  subtext: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  savingsCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    elevation: 5,
    overflow: 'hidden',
    width: '98%',
    alignSelf: 'center',
  },
  savingsInfo: {
    flex: 1,
  },
  savingsTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#666',
  },
  amount: {
    fontSize: 30,
    fontWeight: '700',
    marginVertical: 10,
  },
  interest: {
    fontSize: 14,
    color: '#666',
  },
  percent: {
    color: '#32CD32',
  },
  createButton: {
    backgroundColor: '#0000ff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
    left: 80,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  coinsImage: {
    width: 150,
    height: 150,
    top: -20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  savingsItem: {
    backgroundColor: '#0000ff',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 40,
    height: 150,
    elevation: 5,
  },
  savingsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    paddingHorizontal: 10,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  savingsLogo: {
    width: 60,
    height: 60,
    marginRight: 30,
  },
  savingsTitleText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  savingsSubText: {
    fontSize: 16,
    color: '#32CD32',
    fontWeight: '700',
    alignItems: 'center',
  },
  balance: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginTop: 10,
    alignSelf: 'center',
  },
  unlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  unlockText: {
    fontSize: 18,
    fontWeight: '700',
  },
  viewHiistroryHeader:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10
  },
  history:{
    fontSize: 16,
    fontWeight: '700',
    color: '#0000ff'
  }
});
