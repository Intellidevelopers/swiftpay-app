import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'

const Cryptos = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <TouchableOpacity style={styles.itemContainer} onPress={() => router.push('/InvestDetails')}>
       <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
       <Image source={require('../assets/icons/bitcoin.png')} style={styles.icon}/>
        <View style={styles.item}>
            <Text style={styles.title}>BTC</Text>
            <Text style={styles.subText}>$1,267.98 <AntDesign name='arrowright'/> $12,789.76</Text>
        </View>
       </View>
        <Image source={require('../assets/icons/chart1.png')} style={styles.icon}/>
        <View style={{alignItems: "flex-end"}}>
            <Text style={styles.price}>$2,878.98</Text>
            <Text>$1,230.78</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemContainer} onPress={() => router.push('/InvestDetails')}>
       <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
       <Image source={require('../assets/icons/litecoin.png')} style={styles.icon}/>
        <View style={styles.item}>
            <Text style={styles.title}>LiteCoin</Text>
            <Text style={styles.subText}>$1,267.98 <AntDesign name='arrowright'/> $12,789.76</Text>
        </View>
       </View>
        <Image source={require('../assets/icons/chart1.png')} style={styles.icon}/>
        <View style={{alignItems: "flex-end"}}>
            <Text style={styles.price}>$2,878.98</Text>
            <Text>$1,230.78</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemContainer} onPress={() => router.push('/InvestDetails')}>
       <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
       <Image source={require('../assets/icons/enjin.png')} style={styles.icon}/>
        <View style={styles.item}>
            <Text style={styles.title}>Enjin</Text>
            <Text style={styles.subText}>$1,267.98 <AntDesign name='arrowright'/> $12,789.76</Text>
        </View>
       </View>
        <Image source={require('../assets/icons/chart1.png')} style={styles.icon}/>
        <View style={{alignItems: "flex-end"}}>
            <Text style={styles.price}>$2,878.98</Text>
            <Text>$1,230.78</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemContainer} onPress={() => router.push('/InvestDetails')}>
       <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
       <Image source={require('../assets/icons/gold.png')} style={styles.icon}/>
        <View style={styles.item}>
            <Text style={styles.title}>Gold</Text>
            <Text style={styles.subText}>$1,267.98 <AntDesign name='arrowright'/> $12,789.76</Text>
        </View>
       </View>
        <Image source={require('../assets/icons/chart1.png')} style={styles.icon}/>
        <View style={{alignItems: "flex-end"}}>
            <Text style={styles.price}>$2,878.98</Text>
            <Text>$1,230.78</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemContainer} onPress={() => router.push('/InvestDetails')}>
       <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
       <Image source={require('../assets/icons/silver.png')} style={styles.icon}/>
        <View style={styles.item}>
            <Text style={styles.title}>Silver</Text>
            <Text style={styles.subText}>$1,267.98 <AntDesign name='arrowright'/> $12,789.76</Text>
        </View>
       </View>
        <Image source={require('../assets/icons/chart1.png')} style={styles.icon}/>
        <View style={{alignItems: "flex-end"}}>
            <Text style={styles.price}>$2,878.98</Text>
            <Text>$1,230.78</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemContainer} onPress={() => router.push('/InvestDetails')}>
       <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
       <Image source={require('../assets/icons/bitcoin.png')} style={styles.icon}/>
        <View style={styles.item}>
            <Text style={styles.title}>BTC</Text>
            <Text style={styles.subText}>$1,267.98 <AntDesign name='arrowright'/> $12,789.76</Text>
        </View>
       </View>
        <Image source={require('../assets/icons/chart1.png')} style={styles.icon}/>
        <View style={{alignItems: "flex-end"}}>
            <Text style={styles.price}>$2,878.98</Text>
            <Text>$1,230.78</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default Cryptos

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#fff",
    },
    itemContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 15,
        alignSelf: "center",
        gap: 5,
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
    },
    icon:{
        width: 35,
        height: 35,
        resizeMode: "contain",
        left: -5
    },
    item:{
    },
    title:{
        fontSize: 18,
        fontWeight: "700",
    },
    subText:{
        color: "#666",
        fontSize: 12,
    },
    price:{
        color: "green",
        fontSize: 18,
        fontWeight: "700"
    }
})