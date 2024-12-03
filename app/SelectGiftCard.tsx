// SelectGifCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const countries = [
    { name: '1-800-petsupplies', flag: require('../assets/cards/1.png'), route: '/CardScreen' },
    { name: 'Adidas US', flag: require('../assets/cards/2.png'), route: '/CardScreen' },
    { name: 'Airbnb US', flag: require('../assets/cards/3.png'), route: '/CardScreen' },
    { name: 'Amazon US', flag: require('../assets/cards/4.png'), route: '/CardScreen' },
    { name: 'App Store & iTunes US', flag: require('../assets/cards/5.png'), route: '/CardScreen' },
    { name: 'Best Buy US', flag: require('../assets/cards/6.png'), route: '/CardScreen' },
];

const SelectGifCard: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <AntDesign name="arrowleft" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Select Gift Cards</Text>
          <View style={styles.placeholder} />
        </View>
      
      {/* Subheader */}
      <Text style={styles.subHeader}>Which country will you like to buy from?</Text>
      
      {/* List of Countries */}
      <ScrollView>
        {countries.map((country, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => router.push(country.route as any)}
          >
            <Image source={country.flag} style={styles.icon} />
            <Text style={styles.cardText}>{country.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: "600"
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  cardText: {
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 40
  },
  backButton: {
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 100,
  },
  placeholder: {
    width: 50,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
});

export default SelectGifCard;
