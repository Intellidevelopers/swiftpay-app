import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, Modal, Alert } from 'react-native';
import { AntDesign, FontAwesome, FontAwesome5, FontAwesome6, SimpleLineIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const MyAccount = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Function to pick an image from the gallery
  const pickImage = async () => {
    // Ask for permission to access the gallery
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // If the user didn't cancel the selection
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri); // Use assets[0].uri to get the image URI
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>

      {/* Profile Section */}
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.profileSection}>
      <TouchableOpacity onPress={pickImage}>
            <View style={styles.profileImageContainer}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.user} />
              ) : (
                <Image source={require('../assets/user.png')} style={styles.user} />
              )}
            </View>
          </TouchableOpacity>

        <View>
          <Text style={styles.profileName}>Adeagbo Josiah</Text>
          <Text style={styles.profileEmail}>adeagbojosaih1@gmail.com</Text>
          <TouchableOpacity  style={styles.badge} onPress={() => router.push('/StatusInformation')}>
            <Image source={require('../assets/icons/golden.png')} style={styles.icon} />
            <Text style={styles.medalText}>Gold Badge</Text>
          </TouchableOpacity>
        </View>
        
      </View>

      {/* Personal Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Personal Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>FIRST NAME</Text>
          <Text style={styles.detailValue}>Josiah</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>LAST NAME</Text>
          <Text style={styles.detailValue}>Adeagbo</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>EMAIL</Text>
          <View style={styles.editableRow}>
            <Text style={styles.detailValue}>adeagbojosaih1@Gmail.Com</Text>
            <AntDesign name="edit" size={16} color="black" style={styles.editIcon} />
          </View>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>ADDRESS</Text>
          <View style={styles.editableRow}>
            <Text style={styles.detailValue}>Ibadan Oyo</Text>
            <AntDesign name="edit" size={16} color="black" style={styles.editIcon} />
          </View>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>DATE OF BIRTH</Text>
          <Text style={styles.detailValue}>01/01/1995</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>PHONE NUMBER</Text>
          <Text style={styles.detailValue}>08088886823</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>ACCOUNT STATUS</Text>
          <TouchableOpacity style={styles.flex} onPress={() => router.push('/StatusInformation')}>
            <Image source={require('../assets/icons/golden.png')} style={styles.icon} />
            <Text>Gold Badge</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* SwiftPay Tag */}
      <Text style={styles.label}>SwiftPay Tag</Text>
      <View style={styles.swiftPayContainer}>
        <View style={styles.swiftPayRow}>
          <FontAwesome name="at" size={24} color="black" />
          <Text style={styles.swiftPayTag}>JosiahDev1</Text>
          <TouchableOpacity onPress={() => router.push('/ChangeSwiftpayTag')}>
            <AntDesign name="edit" size={20} color="black" style={styles.editIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Delete Account Button */}
      <TouchableOpacity style={styles.deleteButton} onPress={() => alert('Are you sure you want to deactivate your account?')}>
        <AntDesign name="closecircle" size={24} color="white" />
        <Text style={styles.deleteText}>Delete Account</Text>
      </TouchableOpacity>
      </ScrollView>


        {/* Modal for Badge Details */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity style={styles.modalOverlay}  onPress={() => setModalVisible(false)}>
            <View style={styles.modalContent}>
              <View style={styles.modalBadgeHeader}>
                <Image source={require('../assets/icons/golden.png')} style={styles.modalBadgeIcon} />
                <Text style={styles.modalBadgeText}>Green Badge</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.modalSubText}>Today's Transaction</Text>
                <Text style={styles.modalSubText}>₦70,000</Text>
              </View>
             <View style={styles.flex}>
              <Text style={styles.modalSubText}>Progress to next level</Text>
                <View style={styles.progressBar}>
                  <View style={styles.progress} />
                </View>
             </View>
              <Text style={styles.progressRemaining}>Remaining: ₦30,000</Text>
            </View>
          </TouchableOpacity>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    backgroundColor: '#0000FF',
    padding: 8,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginTop: 20,
    paddingHorizontal: 20
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
    flexDirection: 'row',
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#0000FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10

  },
  profileInitial: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
    color: '#999',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  },
  detailsTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: "#666"
  },
  detailRow: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  editableRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editIcon: {
    marginLeft: 10,
  },
  swiftPayContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  swiftPayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  swiftPayTag: {
    fontSize: 16,
    marginLeft: 10,
  },
  deleteButton: {
    flexDirection: 'row',
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  deleteText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  label:{
    fontWeight: "700",
    color: "#666",
    marginBottom: 10
  },
  badge:{
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: 'flex-start',
  },
  medalContainer:{
    alignItems: "center",
    flexDirection: "row",
    gap: 5
  },
  medalText:{
    fontSize: 12,
    fontWeight: "500"
  },
  icon:{
    width: 15,
    height: 15,
    resizeMode: "contain",
    marginRight: 5
  },
  flex:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalBadgeHeader: {
    alignItems: 'center',
  },
  modalBadgeIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  modalBadgeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalSubText: {
    fontSize: 14,
    marginTop: 10,
  },
  progressBar: {
    height: 5,
    backgroundColor: '#eee',
    width: '40%',
    borderRadius: 5,
    marginTop: 10,
  },
  progress: {
    width: '70%', // This is just an example; dynamically set it based on progress.
    backgroundColor: '#0000ff',
    height: '100%',
    borderRadius: 5,
  },
  progressRemaining: {
    fontSize: 12,
    color: '#000',
    marginTop: 5,
    alignSelf: "flex-end",
    textAlign: "left"
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#0000FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  user:{
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: '#0000FF',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default MyAccount;
