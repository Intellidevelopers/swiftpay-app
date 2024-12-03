import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, Alert, Clipboard } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';

const StartAjoSavings = () => {
  const referralCode = 'ZxQG62Os4';

  const copyToClipboard = () => {
    Clipboard.setString(referralCode);
    Alert.alert('Copied', 'Referral code copied to clipboard');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backbutton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>AJO SAVINGS</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}>
        {/* Ajo Savings Card */}
        <ImageBackground
          source={require('../assets/ajosave.png')}
          style={styles.dashboardCard}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.rate}>
            <Text style={styles.label}>6% - 13% per annum</Text>
          </View>
          <Text style={styles.balance}>Ajo savings balance</Text>
          <Text style={styles.amount}>₦32,899</Text>
          <TouchableOpacity style={styles.savingsButton} onPress={() => router.push('/CreateAjoSavings')}>
            <Text style={styles.savingsButtonText}>Create Ajo Savings</Text>
          </TouchableOpacity>
        </ImageBackground>

        <View>
          <View style={styles.flex}>
          <Text style={styles.reflabel}>Ajo Referral Code</Text>
          <TouchableOpacity onPress={() => router.push('/Affiliate')}>
            <Text style={styles.seemore}>See more</Text>
          </TouchableOpacity>
          </View>
          <TextInput value={referralCode} editable={false} />
          <TouchableOpacity style={styles.referralButton} onPress={copyToClipboard}>
            <Text style={styles.referralButtonText}>Copy Referral Code</Text>
          </TouchableOpacity>
        </View>

        {/* History Section */}
        <View style={styles.sectionHeader}>
          <SectionTitle>History</SectionTitle>
          <TouchableOpacity onPress={() => router.push('/AllAjoHistory')}>
            <SectionTitle>see all <AntDesign name='right' size={20} /></SectionTitle>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal style={styles.horizontalScrollView} showsHorizontalScrollIndicator={false}>
            <HistoryCard style={styles.historyCard}>
                <Text style={styles.cashback}>earn $237</Text>
                <Text style={styles.historyText}>Ajo savings</Text>
                <Text style={styles.text}>for 354 days</Text>
            </HistoryCard>
            <HistoryCard style={styles.historyCard}>
                <Text style={styles.cashback}>earn $237</Text>
                <Text style={styles.historyText}>Ajo savings</Text>
                <Text style={styles.text}>for 354 days</Text>
            </HistoryCard>
            <HistoryCard style={styles.historyCard}>
                <Text style={styles.cashback}>earn $237</Text>
                <Text style={styles.historyText}>Ajo savings</Text>
                <Text style={styles.text}>for 354 days</Text>
            </HistoryCard>
            </ScrollView>

        {/* Ongoing Section */}
        <SectionTitle>Ongoing</SectionTitle>
        <OngoingContainer>
          <TouchableOpacity style={styles.ongoinContainer} onPress={() => router.push('/AjoSavingsDetails')}>
            <View style={styles.iconContainer}>
                <Image source={require('../assets/piggybankwhite.png')} style={styles.icon}/>
            </View>
            <View>
                <Text style={styles.ongoingTitle}>Monthly Ajo Savings</Text>
                <View style={styles.flex}>
                  <Text style={styles.ongoingAmount}>₦ 0.00</Text>
                  <Text style={styles.payback}>Payback ₦1000</Text>
                </View>
                <Text style={styles.ongoingAmount}>Locked <AntDesign name='lock' color={'#0000ff'}/></Text>
               <View style={styles.flex}>
                <ProgressBar style={styles.progress}/>
                <DaysText style={styles.text}>-30 Days</DaysText>
               </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ongoinContainer} onPress={() => router.push('/AjoSavingsDetails')}>
            <View style={styles.iconContainer}>
                <Image source={require('../assets/piggybankwhite.png')} style={styles.icon}/>
            </View>
            <View>
                <Text style={styles.ongoingTitle}>Monthly Ajo Savings</Text>
                <View style={styles.flex}>
                  <Text style={styles.ongoingAmount}>N 0.00</Text>
                </View>
                <Text style={styles.ongoingAmount}>Locked <AntDesign name='lock' color={'#0000ff'}/></Text>
               <View style={styles.flex}>
                <ProgressBar style={styles.progress}/>
                <DaysText style={styles.text}>-30 Days</DaysText>
               </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ongoinContainer} onPress={() => router.push('/AjoSavingsDetails')}>
            <View style={styles.iconContainer}>
                <Image source={require('../assets/piggybankwhite.png')} style={styles.icon}/>
            </View>
            <View>
                <Text style={styles.ongoingTitle}>Monthly Ajo Savings</Text>
                <View style={styles.flex}>
                  <Text style={styles.ongoingAmount}>N 0.00</Text>
                </View>
                <Text style={styles.ongoingAmount}>Locked <AntDesign name='lock' color={'#0000ff'}/></Text>
               <View style={styles.flex}>
                <ProgressBar style={styles.progress}/>
                <DaysText style={styles.text}>-30 Days</DaysText>
               </View>
            </View>
          </TouchableOpacity>

        </OngoingContainer>
      </ScrollView>
    </SafeAreaView>
  );
};


// Styled Components
const CardContainer = styled.View`
  margin-bottom: 20px;
  border-radius: 15px;
  overflow: hidden;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const HistoryContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const HistoryCard = styled.View`
  width: 48%;
  padding: 15px;
  background-color: #f4f4f4;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const OngoingContainer = styled.View`
  margin-bottom: 20px;
`;

const OngoingCard = styled.View`
  margin-bottom: 15px;
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 10px;
`;

const IconContainer = styled.View`
  width: 40px;
  height: 40px;
  background-color: #0062ff;
  border-radius: 20px;
  margin-bottom: 10px;
`;

const ProgressBar = styled.View`
  width: 100%;
  height: 4px;
  background-color: #0062ff;
  margin-vertical: 10px;
`;

const DaysText = styled.Text`
  color: #888;
`;

// Stylesheet for Non-styled-components (for gradients and reusable styling)
const styles = StyleSheet.create({
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
        padding: 10,
        gap: 40
      },
  gradient: {
    padding: 20,
    borderRadius: 15,
  },
  rate: {
    marginBottom: 10,
    backgroundColor: '#17A1FA',
    width: 150,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    padding: 1
  },
  balance: {
    color: 'white',
    fontSize: 12,
    marginBottom: 10,
  },
  amount: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  savingsButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: 170,
    alignItems: 'center',
  },
  savingsButtonText: {
    color: '#0062ff',
    fontWeight: 'bold',
  },

  ongoingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  ongoingAmount: {
    fontSize: 13,
    color: '#333',
  },
  dashboardCard: {
    height: 180,
    borderRadius: 15,
    padding: 16,
    marginVertical: 16,
    backgroundColor: '#0000ff',
    justifyContent: 'center',
    marginBottom: 20,
  },
  imageStyle: {
    borderRadius: 15,
    width: 100,
    height: 100,
    resizeMode: 'contain',
    left: 230,
    marginTop: 80
  },
  cardInterestText: {
    color: '#FFF',
    fontSize: 12,
  },
  cardBalanceTitle: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 8,
  },
  cardBalance: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 8,
  },
  label:{
    color: '#FFF',
    fontSize: 13,
    marginBottom: 2,
  },
  sectionHeader:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  text:{
    color: "#333"
  },
  container:{
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "space-between"
  },
  horizontalScrollView: {
    paddingHorizontal: 10, // space around the cards
    paddingVertical: 10,
  },
  historyCard: {
    backgroundColor: '#FFF',
    width: 200, // Set width for each card to control its size
    marginRight: 10, // Space between cards
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cashback: {
    color: '#fff',
    fontSize: 10,
    marginBottom: 5,
    backgroundColor: "#17A1FA",
    paddingHorizontal: 5,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  historyText: {
    color: '#0000ff',
    fontSize: 16,
  },
  backbutton:{
    backgroundColor: '#fff',
    borderRadius: 50,
    alignItems: 'center',
    padding: 10,
    marginRight: 45
  },
  iconContainer:{
    backgroundColor: "#0000ff",
    padding: 20,
    width: 80,
    height: 80,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    marginRight: 10,

  },
  icon:{
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  ongoinContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
    borderRadius: 15
  },
  flex:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    marginBottom: 10
  },
  progress:{
    width: 150,
    height: 4,
    backgroundColor: '#0062ff',
    borderRadius: 10,
    marginVertical: 10,
  },
  payback:{
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 10,
    fontSize: 10,
    paddingVertical: 2,
    borderRadius: 15,
    color: "#DC1515"
  },
  reflabel:{
    color: "#333",
    fontSize: 16,
    marginTop: 10,
    fontWeight: '700'
  },
  referralButton:{
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: "#0000ff"
  },
  referralButtonText:{
    color: "#0000ff",
    fontSize: 16,
  },
  seemore:{
    color: "#0062ff",
    fontSize: 16,
    marginTop: 20,
    fontWeight: '700'
  }
});

export default StartAjoSavings;
