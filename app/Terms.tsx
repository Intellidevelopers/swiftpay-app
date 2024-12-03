import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

const Terms = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SwiftPay Terms and Conditions</Text>
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.paragraph}>
          Welcome to SwiftPay! By using our app, you agree to the following terms and conditions. Please read them carefully.
        </Text>
        
        <Text style={styles.sectionTitle}>2. User Obligations</Text>
        <Text style={styles.paragraph}>
          As a user, you agree not to misuse the services provided by SwiftPay. You must follow all the policies set forth in this agreement.
        </Text>

        <Text style={styles.sectionTitle}>3. Privacy Policy</Text>
        <Text style={styles.paragraph}>
          We take your privacy seriously. Our Privacy Policy explains how we handle and protect your personal information when you use SwiftPay.
        </Text>

        <Text style={styles.sectionTitle}>4. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          SwiftPay is not liable for any damages that may arise from the use of our services. Use our services at your own risk.
        </Text>

        <Text style={styles.sectionTitle}>5. Changes to Terms</Text>
        <Text style={styles.paragraph}>
          SwiftPay reserves the right to update these terms at any time. We will notify users of significant changes, but it is your responsibility to review the terms regularly.
        </Text>

        <Text style={styles.sectionTitle}>6. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions about these Terms, please contact us at support@swiftpay.com.
        </Text>
      </ScrollView>

      {/* <TouchableOpacity style={styles.acceptButton}>
        <Text style={styles.acceptButtonText}>Accept Terms</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Terms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'left',
    marginTop: 30
  },
  contentContainer: {
    flex: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 10,
  },
  acceptButton: {
    backgroundColor: '#0000ff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
