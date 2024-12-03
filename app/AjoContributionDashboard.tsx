import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Switch,
  ScrollView,
  StyleSheet,
  Image
} from 'react-native';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const AjoContributionDashboard = () => {
  const [isAutoSaveEnabled, setIsAutoSaveEnabled] = React.useState(false);

  const toggleAutoSave = () => setIsAutoSaveEnabled(!isAutoSaveEnabled);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerText}>Ajo Contribution</Text>
      </View>

     <ScrollView showsVerticalScrollIndicator={false}>
       {/* Dashboard Card */}
       <ImageBackground
        source={require('../assets/ajo.png')} // Add the correct image URL here
        style={styles.dashboardCard}
        imageStyle={styles.imageStyle}
      >
        <Text style={styles.cardInterestText}>10% Per Annum</Text>
        <Text style={styles.cardBalanceTitle}>Ajo Contribution Balance</Text>
        <Text style={styles.cardBalance}>₦3,00.00</Text>
        <TouchableOpacity style={styles.createButton} onPress={() => router.push('/CreateAjo')}>
          <Text style={styles.createButtonText}>Create Ajo Contribution</Text>
        </TouchableOpacity>
      </ImageBackground>

      {/* Auto Save */}
      <Text style={styles.headText}>Auto Save</Text>
      <View style={styles.autoSaveContainer}>
        <Text style={styles.autoSaveText}>
          Save Automatically Daily, Weekly Or Monthly With Autosave
        </Text>
        <Switch
          value={isAutoSaveEnabled}
          onValueChange={toggleAutoSave}
          thumbColor={isAutoSaveEnabled ? '#0000ff' : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/Confirmation')}>
          <View style={styles.tab}>
          <Ionicons name="add-circle-outline" size={24} color="#555" />
          </View>
          <Text style={styles.actionButtonText}>Join Ajo Contribution</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.tab}>
          <Ionicons name="wallet-outline" size={24} color="#555" />
          </View>
          <Text style={styles.actionButtonText}>Withdraw</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/Transactions')}>
          <View style={styles.tab}>
          <Octicons name="history" size={24} color="#555" />
          </View>
          <Text style={styles.actionButtonText}>History</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction List */}
      <View style={styles.transactionList}>
        <Text style={styles.transactionDate}>06-7-2020</Text>
        <TouchableOpacity style={styles.transactionItem} onPress={() => router.push('/AjoDetails')}>
          <View style={styles.flex}>
          <View style={styles.logo}>
            <Image source={require('../assets/piggy.png')} style={styles.image}/>
          </View>
          <View>
            <Text style={styles.transactionTitle}>Monthly Auto Save</Text>
            <Text style={styles.transactionSubtitle}>Monthly Savings Deposit</Text>
          </View>
          </View>
          <View>
          <Text style={styles.transactionAmount}>+3000</Text>
          <Text style={styles.transactionBalance}>80,000</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.transactionDate}>06-7-2020</Text>
        <TouchableOpacity style={styles.transactionItem} onPress={() => router.push('/AjoDetails')}>
          <View style={styles.flex}>
          <View style={styles.logo}>
            <Image source={require('../assets/piggy.png')} style={styles.image}/>
          </View>
          <View>
            <Text style={styles.transactionTitle}>Monthly Auto Save</Text>
            <Text style={styles.transactionSubtitle}>Monthly Savings Deposit</Text>
          </View>
          </View>
          <View>
          <Text style={styles.transactionAmount}>+3000</Text>
          <Text style={styles.transactionBalance}>80,000</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.transactionDate}>06-7-2020</Text>
        <TouchableOpacity style={styles.transactionItem} onPress={() => router.push('/AjoDetails')}>
          <View style={styles.flex}>
          <View style={styles.logo}>
            <Image source={require('../assets/piggy.png')} style={styles.image}/>
          </View>
          <View>
            <Text style={styles.transactionTitle}>Monthly Auto Save</Text>
            <Text style={styles.transactionSubtitle}>Monthly Savings Deposit</Text>
          </View>
          </View>
          <View>
          <Text style={styles.transactionAmount}>+3000</Text>
          <Text style={styles.transactionBalance}>80,000</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.transactionDate}>06-7-2020</Text>
        <TouchableOpacity style={styles.transactionItem} onPress={() => router.push('/AjoDetails')}>
          <View style={styles.flex}>
          <View style={styles.logo}>
            <Image source={require('../assets/piggy.png')} style={styles.image}/>
          </View>
          <View>
            <Text style={styles.transactionTitle}>Monthly Auto Save</Text>
            <Text style={styles.transactionSubtitle}>Monthly Savings Deposit</Text>
          </View>
          </View>
          <View>
          <Text style={styles.transactionAmount}>+3000</Text>
          <Text style={styles.transactionBalance}>80,000</Text>
          </View>
        </TouchableOpacity>
        {/* Add more transactions here if needed */}
      </View>
     </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  dashboardCard: {
    height: 180,
    borderRadius: 15,
    padding: 16,
    marginVertical: 16,
    backgroundColor: '#0000ff',
    justifyContent: 'center',
    marginBottom: 20
  },
  imageStyle: {
    borderRadius: 15,
    width: 150,
    height: 150,
    resizeMode: 'contain',
    left: 170
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
  createButton: {
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  createButtonText: {
    color: '#4F8EF7',
    fontWeight: 'bold',
  },
  autoSaveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  autoSaveText: {
    color: '#333',
    fontSize: 13,
    width: '80%'
  },
  
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#333',
    fontSize: 12,
    marginTop: 4,
  },
  transactionList: {
    marginVertical: 16,
  },
  transactionDate: {
    fontSize: 14,
    color: '#999',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  transactionSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  transactionAmount: {
    color: 'green',
    fontSize: 14,
  },
  transactionBalance: {
    color: '#333',
    fontSize: 14,
  },
  headText:{
    fontWeight: 'bold',
  },
  tab:{
    backgroundColor: '#D7E7FF',
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  logo:{
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#D7E7FF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image:{
    width: 30,
    height: 30,
    borderRadius: 50,
    resizeMode: 'contain'
  }
})

export default AjoContributionDashboard;
