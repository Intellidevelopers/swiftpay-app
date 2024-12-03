import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image, Modal, Alert } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons'; // For the back arrow
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-chart-kit'; // For the chart
import { ProgressBar } from 'react-native-paper';
import { router } from 'expo-router';

const AjoSavingsDetails = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleEndSavings = () => {
    Alert.alert("Savings Ended", "Your Ajo Savings has ended early. An early termination charge has been applied.");
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Container>
        {/* Back Arrow */}
        <TouchableOpacity style={styles.backArrow} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Savings Card */}
        <Card>
          <View style={styles.iconContainer}>
            <Image source={require('../assets/home.png')} style={styles.icon}/>
          </View>
          <InfoContainer>
            <TitleText>Monthly Ajo Savings</TitleText>
            <AmountText>N 0.00</AmountText>
            <StatusRow>
              <LockedText>Locked </LockedText>
              <AntDesign name="lock" size={14} color="#0000ff" />
            </StatusRow>
            <View style={styles.flex}>
                <ProgressBar style={styles.progress}/>
                <DaysText style={styles.text}>-30 Days</DaysText>
               </View>
          </InfoContainer>
          <EndButton onPress={() => setModalVisible(true)}>
            <EndButtonText>End</EndButtonText>
          </EndButton>
        </Card>

        {/* Statistic Section */}
        <SectionTitle>Statistic</SectionTitle>
        <Dropdown>
          <DropdownText>Last 7 days</DropdownText>
          <AntDesign name='down' size={20}/>
        </Dropdown>

        {/* Line Chart */}
        <ChartContainer>
          <LineChart
            data={{
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [
                {
                  data: [12, 19, 13, 15, 20, 17, 18],
                },
              ],
            }}
            width={350} // Adjust according to your screen size
            height={220}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          <ChartAmount>$17.00</ChartAmount>
          <ChartDaysText>4 Dec 20</ChartDaysText>
        </ChartContainer>

        {/* Bottom Tabs */}
        <TabContainer>
          <TabItem>
            <TabText>Statistic</TabText>
          </TabItem>
          <TabItem>
            <TabText>Payback</TabText>
          </TabItem>
        </TabContainer>
      </Container>

      <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Are you sure you want to end your Ajo Savings?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButtonNo} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButtonYes} onPress={handleEndSavings}>
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
    </SafeAreaView>
  );
};

// Styled Components
const Container = styled.View`
  flex: 1;
  padding: 16px;
  margin-top: 40px
`;

const Card = styled.View`
  background-color: #fff;
  border-radius: 16px;
  padding: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
`;

const IconContainer = styled.View`
  background-color: #0000ff;
  padding: 16px;
  border-radius: 10px;
`;

const HomeIcon = styled.View`
  width: 32px;
  height: 32px;
  background-color: #ffffff;
  border-radius: 16px;
`;

const InfoContainer = styled.View`
  flex: 1;
`;

const TitleText = styled.Text`
  font-size: 16px;
  color: #000;
  font-weight: 500;
`;

const AmountText = styled.Text`
  font-size: 16px;
  color: #000;
  margin-top: 4px;
`;

const StatusRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LockedText = styled.Text`
  font-size: 14px;
  color: #000;
`;

const LockIcon = styled(Ionicons)`
  margin-left: 4px;
`;

const DaysText = styled.Text`
  font-size: 14px;
  color: #888;
  margin-top: 4px;
`;

const EndButton = styled.TouchableOpacity`
  background-color: #0000ff;
  padding: 8px 16px;
  border-radius: 8px;
`;

const EndButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
`;

const AddMoneyButton = styled.TouchableOpacity`
  background-color: #0000ff;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 16px;
`;

const AddMoneyText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Dropdown = styled.TouchableOpacity`
  background-color: #f0f0f0;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DropdownText = styled.Text`
  font-size: 16px;
  color: #000;
`;

const ChartContainer = styled.View`
  position: relative;
  alignSelf: center;
`;

const ChartAmount = styled.Text`
  position: absolute;
  right: 30px;
  top: 100px;
  font-size: 14px;
  color: #000;
`;

const ChartDaysText = styled.Text`
  position: absolute;
  right: 30px;
  top: 120px;
  font-size: 12px;
  color: #888;
`;

const TabContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const TabItem = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
`;

const TabText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;

// Non-styled styles (e.g., for shadow, back button)
const styles = StyleSheet.create({
  backArrow: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  iconContainer:{
    width: 70,
    height: 80,
    backgroundColor: '#0000ff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    left: -15
  },
  icon:{
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  progress:{
    width: 170,
    height: 4,
    backgroundColor: '#0062ff',
    borderRadius: 10,
  },
  flex:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20
  },
  text:{
    color: "#333"
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButtonNo: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  modalButtonYes: {
    padding: 10,
    backgroundColor: '#ff0000',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AjoSavingsDetails;
