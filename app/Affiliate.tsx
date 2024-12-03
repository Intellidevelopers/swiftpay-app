import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Clipboard, Alert, ScrollView } from 'react-native';

const Affiliate = () => {
  const referralCode = 'HDBMD';

  const copyToClipboard = () => {
    Clipboard.setString(referralCode);
    Alert.alert('Copied to Clipboard', 'Referral code copied to clipboard!');
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backbutton} onPress={() => router.back}>
            <AntDesign name='left' size={20}/>
        </TouchableOpacity>
      <View style={styles.introContainer}>
      <Text style={styles.headerText}>INTRODUCING REFERRAL BONUS</Text>
      <Text style={styles.descriptionText}>
        Share Your Referral Code And Get $5 When Whoever You Refer Signs Up And Receives Over $500 Via Their Foreign Account.
      </Text>
      
      <View style={styles.referralSection}>
        <Text style={styles.referralLabel}>Referral Code</Text>
        <TouchableOpacity style={styles.referralCodeContainer} onPress={copyToClipboard}>
          <Text style={styles.referralCode}>{referralCode}</Text>
          <Text style={styles.copyText}>📋</Text>
        </TouchableOpacity>
      </View>
      </View>

      <View style={styles.earningsContainer}>
        <Text style={styles.earningsLabel}>Total Earnings</Text>
        <Text style={styles.earningsValue}>$0.00</Text>
      </View>

      <View style={styles.referralsContainer}>
        <Text style={styles.referralsText}>My Referrals</Text>
        <ScrollView style={styles.noReferrals} showsVerticalScrollIndicator={false}>
          <Text style={styles.noReferralsText}>You Have No Referrals Yet</Text>
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.shareButton}>
        <Text style={styles.shareButtonText}>Share Link</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Affiliate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 10,
  },
  descriptionText: {
    fontSize: 14,
    textAlign: 'left',
    color: '#333',
  },
  referralSection: {
    alignItems: 'center',
    marginVertical: 20,
    alignSelf: 'flex-start'
  },
  referralLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  referralCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0000ff',
    padding: 10,
    borderRadius: 5,
  },
  referralCode: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 5,
  },
  copyText: {
    color: '#FFF',
    fontSize: 18,
  },
  earningsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginVertical: 20,
    alignItems: 'center',
    elevation: 2,
  },
  earningsLabel: {
    fontSize: 14,
    color: '#555',
  },
  earningsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0000ff',
    marginTop: 5,
  },
  referralsContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  referralsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  noReferrals: {
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 30,
    borderRadius: 5,
    width: '100%'
  },
  noReferralsText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
  shareButton: {
    backgroundColor: '#0000ff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  shareButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  introContainer:{
    backgroundColor: '#FFF',
    marginTop: 40,
    padding: 20,
    borderRadius: 5,
    elevation: 2
  },
  backbutton:{
    backgroundColor: "#fff",
    padding: 13,
    borderRadius: 50,
    top: 40,
    elevation: 1000,
    shadowColor: "#000",
    marginBottom: 20,
    width: 50,
    height: 50,
    alignItems: 'center',

    },
});
