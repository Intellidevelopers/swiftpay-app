import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Ionicons';


const InvestmentScreen: React.FC = () => {
  const portfolioData = [
    { id: '1', symbol: 'APPL', company: 'Apple Inc.', value: 198.24, change: '2.5%', drop: '2.5%', bgColor: '#FFF', logo: require('../assets/portfolio/apple.png') },
    { id: '2', symbol: 'LYFT', company: 'Lyft Inc.', value: 410.01, change: '2.5%', drop: '2.5%', bgColor: '#EECFAD', logo: require('../assets/portfolio/lyft.png') },
    { id: '3', symbol: 'LYFT', company: 'Lyft Inc.', value: 410.01, change: '2.5%', drop: '2.5%', bgColor: '#EECFAD', logo: require('../assets/portfolio/lyft.png') },
    { id: '4', symbol: 'LYFT', company: 'Lyft Inc.', value: 410.01, change: '2.5%', drop: '2.5%', bgColor: '#EECFAD', logo: require('../assets/portfolio/lyft.png') },
    // Add more entries as needed
  ];
  
  
  

  const watchlistData = [
    { id: '1', name: 'Microsoft', percentage: '1.2%', to: '2.3%', value: '$2,878.98', icon: require('../assets/portfolio/apple.png'), chart: require('../assets/portfolio/chart1.png') },
    { id: '2', name: 'Google', percentage: '-2.5%', to: '2.3%', value: '$1,878.98', icon: require('../assets/portfolio/microsoft.png'), chart: require('../assets/portfolio/chart2.png') },
    { id: '3', name: 'Netflix', percentage: '2.5%', to: '2.3%', value: '$2,878.98', icon: require('../assets/portfolio/netflix.png'), chart: require('../assets/portfolio/chart3.png') },
  ];

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name='left' size={20}/>
        </TouchableOpacity>
      </View>
      {/* Total Investment */}
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.investmentCard}>
        <View style={styles.investment}>
          <View>
            <Text style={styles.investmentTitle}>Total Investment</Text>
            <Text style={styles.investmentValue}>$25,901.41</Text>
          </View>
          <View style={styles.chartButton}>
            <Text style={styles.chartButtonText}>This week</Text>
            <AntDesign name='caretdown' size={15} color='#000' />
          </View>
        </View>
        <LineChart
          data={{
            labels: ["1", "2", "3", "4", "5", "6"],
            datasets: [{ data: [20, 45, 28, 80, 99, 43] }],
          }}
          width={350}
          height={170}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          }}
          bezier
          style={styles.chart}
        />
      </View>
      <TouchableOpacity style={styles.investButton} onPress={() => router.push('/CreateInvestHoldings')}>
          <Text style={styles.investButtonText}>Invest Now</Text>
        </TouchableOpacity>

      {/* Portfolio */}
      <View style={styles.portfolioSection}>
        <Text style={styles.sectionTitle}>Portfolio</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
  data={portfolioData}
  horizontal
  renderItem={({ item }) => (
    <View style={[styles.portfolioCard, { backgroundColor: item.bgColor }]}>
     <View style={styles.portfolioHead}>
      <Image source={item.logo} style={styles.logo} />
      <View>
        <Text style={styles.stockSymbol}>{item.symbol}</Text>
        <Text style={styles.stockCompany}>{item.company}</Text>
      </View>
     </View>
      <View style={styles.rates}>
      <Text style={styles.stockValue}>{item.value}</Text>
      <View style={{alignItems: "flex-end"}}>
        <Text style={styles.stockChange}><AntDesign name='arrowup'/>{item.change}</Text>
        <Text style={styles.stockDrop}><AntDesign name='arrowdown'/>{item.drop}</Text>
      </View>
      </View>
    </View>
  )}
  keyExtractor={item => item.id}
  showsHorizontalScrollIndicator={false}
  style={styles.portfolioList}
/>



      {/* Watchlist */}
      <View style={styles.watchlistSection}>
        <Text style={styles.sectionTitle}>Watchlist</Text>
        {watchlistData.map(stock => (
          <TouchableOpacity key={stock.id} style={styles.watchlistItem} onPress={() => router.push('/InvestDetails')}>
            <View style={styles.flex}>
            <Image source={ stock.icon} style={styles.logo}/>
            <View style={styles.stockInfo}>
              <Text style={styles.stockName}>{stock.name}</Text>
              <View style={styles.flex}>
              <Text style={styles.stockPercentage}>{stock.percentage}</Text>
              <AntDesign name='arrowright' color={'#666'}/>
              <Text style={styles.stockPercentage}>{stock.to}</Text>
              </View>
            </View>
            </View>
            <Image source={stock.chart} style={styles.logo}/>
            <View style={styles.stockVal}>
              <Text style={styles.stockTitle}>{stock.value}</Text>
              <Text style={styles.stockSub}>{stock.value}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      </ScrollView>
    </View>
  );
};

export default InvestmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  investmentCard: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  investmentTitle: {
    fontSize: 16,
    color: '#777',
  },
  investmentValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chart: {
    marginVertical: 10,
    alignSelf: "center"
  },
  investButton: {
    backgroundColor: '#0000FF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: 200,
    alignSelf: "center",
    marginBottom: 20
  },
  investButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  portfolioSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllText: {
    color: '#FF6347',
    fontWeight: 'bold',
  },
  portfolioList: {
  },
  portfolioCard: {
    width: 200,
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
  },
  stockSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stockCompany: {
    fontSize: 12,
    color: '#777',
  },
  stockValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  stockChange: {
    color: 'green',
    fontWeight: 'bold',
  },
  stockDrop: {
    color: 'red',
    fontWeight: 'bold',
  },
  watchlistSection: {
    marginTop: 20,
  },
  watchlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stockInfo: {
    flexDirection: 'column',
  },
  stockName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stockPercentage: {
    color: '#777',
  },
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 40,
    gap: 20,
  },
  chartButton:{
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    flexDirection: "row",
  },
  investment:{
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 10, // Adjust spacing as necessary
    marginRight: 5
  },
  portfolioHead:{
    flexDirection: 'row',
    left: -10
  },
  rates:{
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  chartButtonText:{
    marginRight: 10
  },
  flex:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  stockVal:{
    alignItems: "flex-end"
  },
  stockTitle:{
    color: "green",
    fontSize: 16,
    fontWeight: 'bold',
  },
  stockSub:{
    color: '#777',
    fontSize: 13,
    fontWeight: "500"
  }
});
