import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';
import { Link, useNavigation, useRouter } from 'expo-router';


const HomeHeader = () => {
    const { user } = useUser();
    const router = useRouter()
   const navigation = useNavigation();
    return (
        <View>
            {/**userName and image */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                <View style={{ flexDirection: 'row', alignItems: "center", gap: 10 }}>
                    <Image source={{ uri: user?.imageUrl }}
                        style={styles.image}
                    />
                    <View>
                        <Text style={{ fontFamily: "PopB", fontSize: 23 }}>Hello, {user?.firstName} !</Text>
                        <Text style={{ fontFamily: "Pop", fontSize: 15, color: 'grey' }}>Good Morning </Text>
                    </View>
                </View>
                <Ionicons name="notifications-outline" size={28} color="black" />
            </View>
            {/**search bar */}
            
            <Link href={'/search'} asChild>
            <TouchableOpacity style={styles.searchbtn}>
                <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
                    <Ionicons name="search" size={24} color="black" />
                    <Text style={{ fontFamily: 'Pop', color: 'grey', fontSize: 17 }}>Search here</Text>
                </View>
                <Ionicons name="filter" size={24} color="black" />
            </TouchableOpacity>
            </Link>

        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        backgroundColor: 'grey',
        width: 50,
        height: 50,
        borderRadius: 30
    },
    searchbtn: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        width: "100%",
        backgroundColor: "#eeeeee",
        padding: 15,
        borderRadius: 12,
        marginTop: 15,
        justifyContent:'space-between'
    }
})

export default HomeHeader