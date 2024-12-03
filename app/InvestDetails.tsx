import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Dimensions } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

const InvestDetails = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AntDesign name="left" size={24} color="black" />
        <Text style={styles.headerTitle}>Bitcoin <Text style={{color: "#aaa"}}>(BTC)</Text></Text>
        <View style={styles.placeholder}></View>
      </View>

      {/* Price and percentage */}
     <ScrollView showsVerticalScrollIndicator={false}>
     <View style={styles.priceContainer}>
        <View style={styles.priceRow}>
          <Image source={require('../assets/icons/pounds.png')} style={styles.icon} />
          <Text style={styles.priceText}>$2,300.87</Text>
        </View>
        <View style={styles.percentageRow}>
          <AntDesign name="caretup" size={16} color="green" />
          <Text style={styles.percentageText}>0.5%</Text>
        </View>
      </View>

      {/* Chart */}

      <View style={styles.price}>
        <Text style={styles.amount}>$3,560</Text>
      </View>
      <LineChart
        data={{
          labels: ['1m', '15m', '30m', '45m', '1hr', '1year'],
          datasets: [
            {
              data: [2800, 2900, 3200, 3500, 3560, 2300],
            },
          ],
        }}
        width={320} // from react-native
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(34, 128, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#000",
          },
        }}
        style={styles.chart}
      />

      {/* Wallet Data */}
      <View style={styles.walletContainer}>
        <Text style={styles.walletTitle}>In Wallet</Text>

        {Array(4).fill(null).map((_, index) => (
          <View key={index} style={styles.walletRow}>
            <View>
              <Text style={styles.walletAmount}>0.736474 BTC</Text>
              <Text style={styles.walletSubAmount}>$33,223.56 - $34,876.98</Text>
            </View>
            <View style={styles.walletPriceContainer}>
              <Text style={styles.walletPrice}>$2,300.87</Text>
              <Text style={styles.walletPercentage}>+12.67%</Text>
            </View>
          </View>
        ))}
      </View>
     </ScrollView>
    </View>
  );
};

export default InvestDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 40,
    justifyContent: 'space-between',
    padding: 10
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: "center"
  },
  priceContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: "flex-start"
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  priceText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  percentageRow: {
    flexDirection: 'row',
    backgroundColor: '#d9fdf0',
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6
  },
  percentageText: {
    fontSize: 16,
    color: '#0cbc8b',
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
    alignSelf: "center",
  },
  walletContainer: {
    marginTop: 20,
  },
  walletTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color: "#666"
  },
  walletRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  walletAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  walletSubAmount: {
    color: '#888',
  },
  walletPriceContainer: {
    alignItems: 'flex-end',
  },
  walletPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  walletPercentage: {
    color: 'green',
  },
  placeholder: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  price:{
    borderWidth: 1,
    padding: 10,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#ddd",
    marginVertical: 20,
    left: 200,
    marginBottom: -10
  },
  amount:{
    color: '#0000ff',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: "center"
  }
});
