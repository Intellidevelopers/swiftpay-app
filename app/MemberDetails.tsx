// app/(screens)/MemberDetails.tsx

import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ProgressBar from '@/components/ProgressBar';

type Member = {
  id: string;
  name: string;
  role: 'Admin' | 'Member';
};

const MemberDetails: React.FC = () => {
  const { member } = useLocalSearchParams();
  const parsedMember: Member = member ? JSON.parse(member as string) : { id: '', name: '', role: 'Member' };

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.memberName}>{parsedMember.name}</Text>
        <Image source={require('../assets/user.png')} style={styles.largeProfileImage} />
        <View style={styles.info}>
          <Text style={styles.label}>Member Estimated Amount</Text>
          <Text style={styles.amount}>0.00</Text>
          <Text style={styles.label}>Member Active Savings</Text>
          <Text style={styles.amount}>0.00</Text>
          <Text style={styles.label}>RIS</Text>
          <ProgressBar progress={0.5}/>
          <Text style={styles.depo}>+3 Deposit</Text>
          <Text style={styles.roleText}>{parsedMember.role}</Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.makeAdminButton}>
              <Text style={styles.buttonText}>Make Admin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.removeButton}>
              <Text style={styles.buttonText}>Remove Member</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MemberDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginTop: 40
  },
  largeProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 12,
  },
  memberName: {
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '700'
  },
  info: {
    paddingHorizontal: 16,
  },
  amount: {
    fontSize: 20,
    color: 'green',
  },
  roleText: {
    fontSize: 16,
    marginTop: 8,
    color: '#fff',
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  makeAdminButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  removeButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  label:{
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  depo:{
    fontSize: 14,
    color: 'green',
    marginTop: 4,
    marginBottom: 8,
  }
});
