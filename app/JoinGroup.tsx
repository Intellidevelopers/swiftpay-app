import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const JoinGroup = () => {
  const [groupCode, setGroupCode] = useState('');

  const handleJoinContribution = () => {
    // Handle the joining logic here, such as API call or validation
    console.log('Group Code:', groupCode);
    router.push('/GroupDetails')
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Join Group Savings</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>JOIN AJO GROUP SAVINGS</Text>
        <Text style={styles.subtitle}>Enter Group Code Below To Join</Text>

        <Text style={styles.inputLabel}>ENTER GROUP CODE</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={groupCode}
          onChangeText={setGroupCode}
        />

        {/* Join Button */}
        <TouchableOpacity style={styles.joinButton} onPress={handleJoinContribution}>
          <Text style={styles.joinButtonText}>JOIN GROUP SAVINGS</Text>
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
  content: {
    marginTop: 100,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#000',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#D3D3D3', // light grey background for input field
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 100,
  },
  joinButton: {
    backgroundColor: '#0C0CFF', // Blue background for the button
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    padding: 15
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JoinGroup;
