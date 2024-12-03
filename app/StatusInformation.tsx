import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const StatusInformation = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={20}/>
        </TouchableOpacity>
        <Text style={styles.title}>Status Information</Text>
      </View>

      {/* Status Badges */}
      <View style={styles.badgeContainer}>
        <View style={[styles.badgeCard, styles.greenBadge]}>
          <View style={styles.badgeHeader}>
            <Image source={require('../assets/icons/green-badge.png')} style={styles.icon}/>
            <Text style={styles.badgeTitle1}>Green Badge</Text>
          </View>
          <View style={styles.flex1}>
            <Text style={styles.badgeInfo}>Minimum Daily Transaction</Text>
            <View>
                <Text style={styles.badgeRange}>₦1,000 -</Text>
                <Text style={styles.badgeRange}>₦100,000</Text>
            </View>
          </View>
        </View>

        <View style={[styles.badgeCard, styles.badge]}>
          <View style={styles.badgeHeaders}>
            <Image source={require('../assets/icons/blue-badge.png')} style={styles.icon}/>
            <Text style={styles.badgeTitle}>Blue Badge</Text>
          </View>
          <View style={styles.flex1}>
            <Text style={styles.badgeInfo}>Minimum Daily Transaction</Text>
            <View>
                <Text style={styles.badgeRange}>₦1,000 -</Text>
                <Text style={styles.badgeRange}>₦100,000</Text>
            </View>
          </View>
        </View>

        <View style={[styles.badgeCard, styles.badge]}>
          <View style={styles.badgeHeaders}>
            <Image source={require('../assets/icons/black-badge.png')} style={styles.icon}/>
            <Text style={styles.badgeTitle}>Black Badge</Text>
          </View>
          <View style={styles.flex1}>
            <Text style={styles.badgeInfo}>Minimum Daily Transaction</Text>
            <View>
                <Text style={styles.badgeRange}>₦1,000,000 -</Text>
                <Text style={styles.badgeRange}>₦10,000,000</Text>
            </View>
          </View>
        </View>

        <View style={[styles.badgeCard, styles.badge]}>
          <View style={styles.badgeHeaders}>
            <Image source={require('../assets/icons/golden.png')} style={styles.icon}/>
            <Text style={styles.badgeTitle}>Gold Badge</Text>
          </View>
          <View style={styles.flex1}>
            <Text style={styles.badgeInfo}>Minimum Daily Transaction</Text>
            <View>
                <Text style={styles.badgeRange}>₦10,000,000</Text>
                <Text style={styles.badgeRange}>& Above</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  backButton: {
    marginRight: 30,
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 100,
  },
  backText: {
    fontSize: 18,
    color: '#000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  badgeContainer: {
    marginTop: 20,
  },
  badgeCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 15,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  badgeTitle1: {
    fontSize: 16,
    fontWeight: '500',
    color: "#fff"
  },
  badgeInfo: {
    fontSize: 14,
    color: '#666',
  },
  badgeRange: {
    fontSize: 14,
    fontWeight: '400',
  },
  greenBadge: {
    backgroundColor: '#e0e0e0',
  },
  blueBadge: {
    backgroundColor: '#d0e8ff',
  },
  blackBadge: {
    backgroundColor: '#e0e0e0',
  },
  goldBadge: {
    backgroundColor: '#ffebc4',
  },
  icon:{
    width: 15,
    height: 15,
    resizeMode: "contain",
    marginRight: 5
  },
  flex:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  badgeHeader:{
    backgroundColor: "#0000ff",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  flex1:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20
  },
  badgeHeaders:{
    backgroundColor: '#e0e0e0',
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  badge:{
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
  }
});

export default StatusInformation;
