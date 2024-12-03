// app/(screens)/MembersScreen.tsx

import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

type Member = {
  id: string;
  name: string;
  role: 'Admin' | 'Member';
};

const members: Member[] = [
  { id: '1', name: 'Ose', role: 'Admin' },
  { id: '2', name: 'Ose', role: 'Member' },
  { id: '3', name: 'Ose', role: 'Member' },
  { id: '4', name: 'Ose', role: 'Member' },
];

const MembersScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Members</Text>
      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => router.push({ pathname: '/MemberDetails', params: { member: JSON.stringify(item) } })}
            style={styles.memberItem}
          >
            <Image source={require('../assets/user.png')} style={styles.profileImage} />
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{item.name}</Text>
              <Text style={[styles.roleLabel, item.role === 'Admin' && styles.adminLabel]}>{item.role}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {/* <TouchableOpacity style={styles.seeAll}>
      <Text style={styles.seeAllText}>See all</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default MembersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
    marginTop: 40
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  memberName: {
    fontSize: 18,
    color: '#555',
  },
  roleLabel: {
    fontSize: 16,
    color: '#666',
  },
  adminLabel: {
    color: 'green',
  },
  seeAll: {
    alignItems: 'center',
    backgroundColor: '#0000ff',
    padding: 15,
    borderRadius: 10,
    marginTop: 24,
    marginBottom: 16,
  },
  seeAllText:{
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
  }
});
