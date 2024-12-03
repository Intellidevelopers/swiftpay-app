import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GroupDetailsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>GROUP DETAILS</Text>
      </View>

      {/* Group Details Card */}
     <View style={styles.content}>
     <View style={styles.card}>
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>NAME</Text>
            <Text style={styles.value}>OSE OSE</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.label}>START DATE</Text>
            <Text style={styles.value}>31/02/2029</Text>
          </View>
        </View>

        <View style={styles.description}>
          <Text style={styles.label}>DESCRIPTION</Text>
          <Text style={styles.value}>ROTATIONAL GROUP SAVINGS</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.label}>GROUP TARGET</Text>
            <Text style={styles.value}>$735999</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.label}>YOUR CONTRIBUTION</Text>
            <Text style={styles.value}>$735999</Text>
          </View>
        </View>
      </View>

      {/* Account Details Card */}
      <View style={styles.card}>
        <View style={[styles.row, styles.row2]}>
          <View>
            <Text style={styles.label}>BALANCE</Text>
            <Text style={styles.value}>$73393</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.label}>STATUS</Text>
          </View>
        </View>


        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.label}>ACCOUNT NUMBER</Text>
            <Text style={styles.value}>906745379</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.label}>TYPE</Text>
            <Text style={styles.value}>SWIFT ACCOUNT</Text>
          </View>
        </View>
      </View>

      {/* Proceed Button */}
      <TouchableOpacity style={styles.proceedButton} onPress={() => router.push('/AjoDetails')}>
        <Text style={styles.proceedButtonText}>PROCEED</Text>
      </TouchableOpacity>
     </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#0C0CFF',
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 40
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#e2e8fd',
    padding: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  value: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  proceedButton: {
    backgroundColor: '#0C0CFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content:{
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 40,
    justifyContent: 'center'
  },
  description:{
    marginBottom: 15
  }, 
  left:{
    alignItems: "flex-start"
  },
  right:{
    alignItems: "flex-end"
  },
  row2:{
    marginBottom: 40
  }
});

export default GroupDetailsScreen;
