import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { AntDesign, EvilIcons, Ionicons } from '@expo/vector-icons';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { router } from 'expo-router';
import { Avatar, CheckBox, Dialog, ListItem } from '@rneui/themed';

interface Beneficiary {
  id: number;
  name: string;
  accountNumber: string;
  swiftpayTag: string;
  image: string;
  isFavorite: boolean;
}
type DialogComponentProps = {};

const Beneficiaries: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'Recent' | 'Favourites'>('Recent');
  const [visibleMenu, setVisibleMenu] = useState<number | null>(null);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    { id: 1, name: 'Segun Arinze', accountNumber: '0987654355', swiftpayTag: '@Getpaid008', image: 'https://randomuser.me/api/portraits/med/men/75.jpg', isFavorite: true },
    { id: 2, name: 'Adeagbo Josiah', accountNumber: '0987654356', swiftpayTag: '@Adegbo108', image: 'https://randomuser.me/api/portraits/med/men/70.jpg', isFavorite: false },
    { id: 3, name: 'Femi Vanzekins', accountNumber: '0987654357', swiftpayTag: '@Femi024', image: 'https://randomuser.me/api/portraits/med/men/5.jpg', isFavorite: true },
    { id: 4, name: 'Olamide Adelusi', accountNumber: '0987654358', swiftpayTag: '@Olamide55', image: 'https://randomuser.me/api/portraits/med/women/15.jpg', isFavorite: false },
  ]);

  // Filter beneficiaries based on search query and active tab
  const filteredBeneficiaries = beneficiaries.filter(b => {
    const matchesSearchQuery = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                               b.accountNumber.includes(searchQuery) || 
                               b.swiftpayTag.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'Favourites') {
      return matchesSearchQuery && b.isFavorite;
    }

    return matchesSearchQuery;
  });

  const toggleMenu = (id: number) => {
    setVisibleMenu(visibleMenu === id ? null : id);
  };

  const toggleFavorite = (id: number) => {
    setBeneficiaries(prevBeneficiaries =>
      prevBeneficiaries.map(b =>
        b.id === id ? { ...b, isFavorite: !b.isFavorite } : b
      )
    );
    setVisibleMenu(null); // Close the menu after toggling
  };

  const [visible1, setVisible1] = useState(false);
const [visible2, setVisible2] = useState(false);
const [visible3, setVisible3] = useState(false);
const [visible4, setVisible4] = useState(false);
const [visible5, setVisible5] = useState(false);
const [visible6, setVisible6] = useState(false);
const [checked, setChecked] = useState(1);

const toggleDialog1 = () => {
  setVisible1(!visible1);
};
const toggleDialog2 = () => {
  setVisible2(!visible2);
};
const toggleDialog3 = () => {
  setVisible3(!visible3);
};
const toggleDialog4 = () => {
  setVisible4(!visible4);
};
const toggleDialog5 = () => {
  setVisible5(!visible5);
};
const toggleDialog6 = () => {
  setVisible6(!visible6);
};

const userlist = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://uifaces.co/our-content/donated/XdLjsJX_.jpg',
    subtitle: 'amy.farha@gmail.com',
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://uifaces.co/our-content/donated/KtCFjlD4.jpg',
    subtitle: 'cjackson@gmail.com',
  },
  {
    name: 'Amanda Martin',
    avatar_url:
      'https://images.unsplash.com/photo-1498529605908-f357a9af7bf5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=047fade70e80ebb22ac8f09c04872c40',
    subtitle: 'amandam@gmail.com',
  },
];

  const renderBeneficiary = ({ item }: { item: Beneficiary }) => (
    <TouchableOpacity 
      style={styles.beneficiaryContainer} 
      onPress={() => router.push({ pathname: './SendToBeneficiary', params: { name: item.name, swiftpayTag: item.swiftpayTag, accountNumber: item.accountNumber, image: item.image } })}
    >
      <Image source={{ uri: item.image }} style={styles.beneficiaryImage} />
      <View style={styles.beneficiaryDetails}>
        <Text style={styles.beneficiaryName}>{item.name}</Text>
        <Text style={styles.beneficiaryTag}>{item.swiftpayTag}</Text>
      </View>
  
      <Menu
        visible={visibleMenu === item.id}
        style={styles.menu}
        anchor={
          <TouchableOpacity onPress={() => toggleMenu(item.id)}>
            <Ionicons name="ellipsis-vertical" size={24} color="#000" />
          </TouchableOpacity>
        }
        onRequestClose={() => setVisibleMenu(null)}
      >
        <View style={styles.kebab}>
          <AntDesign name={item.isFavorite ? "star" : "staro"} size={24} color={item.isFavorite ? "gold" : "#666"} />
          <MenuItem style={styles.menuText} onPress={() => toggleFavorite(item.id)}>
            {item.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </MenuItem>
        </View>
        <View style={styles.kebab}>
          <EvilIcons name="trash" size={24} color="#666" />
          <MenuItem style={styles.menuText} onPress={toggleDialog2}>Delete Beneficiary</MenuItem>
        </View>
      </Menu>
    </TouchableOpacity>
  );
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Beneficiaries</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Swiftpay Account / SwiftPay Tag"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('Recent')} style={[styles.tab, activeTab === 'Recent' && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === 'Recent' && styles.activeTabText]}>Recent</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Favourites')} style={[styles.tab, activeTab === 'Favourites' && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === 'Favourites' && styles.activeTabText]}>Favourites</Text>
        </TouchableOpacity>
      </View>

      {/* Beneficiaries List */}
      <FlatList
        data={filteredBeneficiaries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBeneficiary}
        showsVerticalScrollIndicator={false}
      />
    <Dialog
      isVisible={visible2}
      onBackdropPress={toggleDialog2}
      overlayStyle={styles.dialog} // Apply the dialog style here
    >
  <Text style={styles.text}>Are you sure you want to delete this beneficiary?</Text>
  <Dialog.Actions>
 <View style={styles.btns}>
 <TouchableOpacity style={styles.dialogButton} onPress={() => console.log('Primary Action Clicked!')}>
      <Text style={styles.dialogButtonText1}>Cancel</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.dialogButton1} onPress={() => console.log('Secondary Action Clicked!')}>
      <Text style={styles.dialogButtonText}>Delete</Text>
    </TouchableOpacity>
 </View>
  </Dialog.Actions>
</Dialog>

    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  // existing styles remain the same
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
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
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 50,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  searchIcon: {
    marginRight: 8,
    color: '#888',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 0,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: "space-around",
    left: -50
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#00CB14',
  },
  tabText: {
    color: '#888',
    fontSize: 16
  },
  activeTabText: {
    color: '#00CB14',
    fontWeight: 'bold',
  },
  beneficiaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  beneficiaryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  beneficiaryDetails: {
    flex: 1,
  },
  beneficiaryName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  beneficiaryTag: {
    color: '#888',
    marginTop: 4,
  },
  menu: {
    height: 100,
    padding: 5,
  },
  kebab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  menuText: {},
  button: {
    borderRadius: 6,
    width: 220,
    margin: 20,
    borderWidth: 1,  // Add border width
    borderColor: '#ddd', // Add border color
    backgroundColor: '#f5f5f5', // Add background color
  },
  buttonContainer: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: '#fff', // Background color of the dialog
    borderRadius: 10, // Border radius for the dialog
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    width: '85%'
  },
  dialogButton: {
    borderWidth: 1, // Border width for the button
    borderColor: '#0000ff', // Border color for the button
    backgroundColor: '#fff', // Background color for the button
    borderRadius: 8, // Border radius for the button
    marginHorizontal: 10,
    paddingHorizontal: 40,
    paddingVertical: 12,
  },
  dialogButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  dialogButtonText1: {
    color: '#0000ff',
    textAlign: 'center',
  },
  dialogButton1: {
    borderWidth: 1, // Border width for the button
    borderColor: '#ddd', // Border color for the button
    backgroundColor: '#1400fb', // Background color for the button
    borderRadius: 8, // Border radius for the button
    marginHorizontal: 10,
    paddingHorizontal: 40,
    paddingVertical: 12,
  },
  btns:{
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    marginLeft: 16
  },
  text:{
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10
  }
});


export default Beneficiaries;
