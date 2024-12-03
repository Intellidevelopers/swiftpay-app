import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { Overlay } from '@rneui/themed';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';

const GroupDashboard = () => {
  const [visible, setVisible] = useState(true); // Modal visibility state
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animation reference for opacity

  // Open modal with fade-in animation when navigating to the tab
  useFocusEffect(
    React.useCallback(() => {
      setVisible(true); // Ensure the modal remains visible when navigating back
      fadeIn();
      return () => fadeOut(); // Fade out when navigating away
    }, [])
  );

  // Fade-in animation
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fully visible
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Fade-out animation
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0, // Fully invisible
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    fadeOut(); 
    setVisible(false)
  };

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Message */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name='left' size={25}/>
      </TouchableOpacity>

      {/* Total Savings Card */}
      <ImageBackground source={require('../assets/cards/cardbg.png')} 
      style={styles.savingsCard}
      imageStyle={{
        resizeMode: 'contain',
        height: 200,
        width: '100%',
        top: 5,
        left: 30
      }}
      >
        <View style={styles.savingsInfo}>
          <Text style={styles.savingsTitle}>Total Group Savings</Text>
          <Text style={styles.amount}>0.00</Text>
          <Text style={styles.interest}>Total Members</Text>
          <Text style={styles.percent}>50+ Members</Text>
          <TouchableOpacity style={styles.createButton} onPress={() => router.push('/CreateGroupSavings')}>
            <Text style={styles.createButtonText}>Create Savings</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View>
        <View style={styles.joinContainer}>
            <Text style={styles.sectionTitle}>Group Savings</Text>
            <TouchableOpacity style={styles.joinButton} onPress={() => router.push('/JoinGroup')}>
                <AntDesign name='pluscircleo' size={20} color={'#fff'}/>
                <Text style={styles.joinButtonText}>Join Savings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.history} onPress={() => router.push('/Transactions')}>
                <AntDesign name='pluscircleo' size={20} color={'#0000ff'}/>
                <Text style={styles.historyText}>History</Text>
            </TouchableOpacity>
        </View>

        {/* Savings Card 1 */}
        <TouchableOpacity style={styles.savingsItem} onPress={() => router.push('/GroupSavingsDetails')}>
          <View style={styles.savingsContent}>
            <Image source={require('../assets/icons/logo.png')} style={styles.savingsLogo} />
            <View>
              <Text style={styles.savingsTitleText}>New York Road Trip</Text>
               <Text style={{ color: "#666", fontWeight: "500" }}>20 days left</Text>
              <View style={styles.unlock}>
                <Text style={styles.unlockText}>+2 Members</Text>
                <AntDesign style={{ left: 50 }} name='arrowright' size={22} color={'#0000ff'}/>
              </View>
            </View>
          </View>
          <Text style={styles.balance}>$1,460.15</Text>
        </TouchableOpacity>

        {/* Savings Card 2 */}
        <TouchableOpacity style={styles.savingsItem} onPress={() => router.push('/GroupSavingsDetails')}>
          <View style={styles.savingsContent}>
            <Image source={require('../assets/icons/logo.png')} style={styles.savingsLogo} />
            <View>
              <Text style={styles.savingsTitleText}>New York Road Trip</Text>
               <Text style={{ color: "#666", fontWeight: "500" }}>20 days left</Text>
              <View style={styles.unlock}>
                <Text style={styles.unlockText}>+2 Members</Text>
                <AntDesign style={{ left: 50 }} name='arrowright' size={22} color={'#0000ff'}/>
              </View>
            </View>
          </View>
          <Text style={styles.balance}>$1,460.15</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

export default GroupDashboard;

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
    borderRadius: 20, // Increase the value for smoother rounded corners
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    overflow: 'hidden', // Ensures content respects the rounded corners
    backgroundColor: '#fff',
    elevation: 5,
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
    color: '#0000ff',
    fontWeight: "600"
  },
  createButton: {
    backgroundColor: '#0000ff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
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
  mock:{
    width: 200,
    height: 200,
    resizeMode: "contain"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
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
    flexDirection: "column"
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
    color: "#0000ff"
  },
  // Modal Styles
  modalOverlay: {
    width: '80%',
    backgroundColor: '#e3e9fd',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalContent: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    width: 220
  },
  overlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
    backgroundColor: "#0000ff",
    padding: 10,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginBottom: 10
  },
  buttonText:{
    color: "#fff"
  },
  joinContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30
  },
  joinButton:{
    backgroundColor: "#0000ff",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 10,

  },
  joinButtonText:{
    color: "#fff"
  },
  history:{
    borderWidth: 1,
    borderColor: "#0000ff",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    gap: 5
  },
  historyText:{
    color: "#0000ff"
  },
  backButton:{
    marginTop: 30,
    marginBottom: 30
  }
});