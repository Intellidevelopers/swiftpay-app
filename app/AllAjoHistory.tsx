import React from 'react';
import { SafeAreaView, FlatList, View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { AntDesign, Ionicons } from '@expo/vector-icons'; // For icons
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';

// Transaction data
const transactions = [
  {
    id: '1',
    title: 'Funds Deposited By Msl',
    date: '02/8/2024',
    amount: '$30000',
    status: 'Completed',
  },
  {
    id: '2',
    title: 'Funds Transferred By Msl',
    date: '02/8/2024',
    amount: '$30000',
    status: 'Failed',
  },
  {
    id: '3',
    title: 'Funds Transferred By Msl',
    date: '02/8/2024',
    amount: '$30000',
    status: 'Failed',
  },
  {
    id: '4',
    title: 'Funds Deposited By Msl',
    date: '02/8/2024',
    amount: '$30000',
    status: 'Completed',
  },
  {
    id: '5',
    title: 'Funds Deposited By Msl',
    date: '02/8/2024',
    amount: '$30000',
    status: 'Completed',
  },
  {
    id: '6',
    title: 'Funds Deposited By Msl',
    date: '02/8/2024',
    amount: '$30000',
    status: 'Pending',
  },
  {
    id: '7',
    title: 'Funds Deposited By Msl',
    date: '02/8/2024',
    amount: '$30000',
    status: 'Completed',
  },
  {
    id: '8',
    title: 'Funds Transferred By Msl',
    date: '02/8/2024',
    amount: '$30000',
    status: 'Failed',
  },
  {
    id: '9',
    title: 'Funds Deposited By Msl',
    date: '02/8/2024',
    amount: '$30000',
    status: 'Completed',
  },
  {
    id: '10',
    title: 'Funds Deposited By Msl',
    date: '02/8/2024',
    amount: '$30000',
    status: 'Completed',
  },
];

const AllAjoHistory = () => {
  const renderItem = ({ item }: { item: any }) => (
    <TransactionItem>
      <IconContainer>
        <Ionicons name="mail" size={24} color={getIconColor(item.status)} />
      </IconContainer>
      <TransactionDetails>
        <Title>{item.title}</Title>
        <Date>{item.date}</Date>
      </TransactionDetails>
      <TransactionStatus>
        <AmountText color={getAmountColor(item.status)}>{item.amount}</AmountText>
        <StatusText status={item.status}>{item.status}</StatusText>
      </TransactionStatus>
    </TransactionItem>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <TouchableOpacity style={{marginTop: 40, padding: 10}} onPress={() => router.back()}>
            <AntDesign name='left' size={20}/>
        </TouchableOpacity>
      <Container>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20, marginTop: 40 }}
        />
      </Container>
    </GestureHandlerRootView>
  );
};

// Helper functions for colors
const getAmountColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return '#00C851';
    case 'Failed':
      return '#FF4444';
    case 'Pending':
      return '#FFBB33';
    default:
      return '#000';
  }
};

const getIconColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return '#00C851';
    case 'Failed':
      return '#FF4444';
    case 'Pending':
      return '#FFBB33';
    default:
      return '#000';
  }
};

// Styled Components
const Container = styled.View`
  flex: 1;
  padding: 10px;
  background-color: #fff;
`;

const TransactionItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background-color: #f5f5f5;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const IconContainer = styled.View`
  width: 40px;
  height: 40px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  elevation: 5;
`;

const TransactionDetails = styled.View`
  flex: 1;
  margin-left: 10px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #333;
`;

const Date = styled.Text`
  font-size: 14px;
  color: #888;
  margin-top: 4px;
`;

const TransactionStatus = styled.View`
  justify-content: center;
  align-items: flex-end;
`;

const AmountText = styled.Text<{ color: string }>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.color};
`;

const StatusText = styled.Text<{ status: string }>`
  font-size: 14px;
  color: ${(props) =>
    props.status === 'Completed' ? '#00C851' : props.status === 'Failed' ? '#FF4444' : '#FFBB33'};
  background-color: ${(props) =>
    props.status === 'Completed' ? '#C8E6C9' : props.status === 'Failed' ? '#F8D7DA' : '#FFF3CD'};
  padding: 4px 8px;
  border-radius: 5px;
  margin-top: 4px;
  font-weight: bold;
`;

// Styles for specific adjustments if needed
const styles = StyleSheet.create({
  // Add specific custom styles here if required
});

export default AllAjoHistory;
