import { View, Text, ScrollView, ActivityIndicator, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'

interface Props {
  JobList: any[],
  loading: boolean,
  height: number
}

const JobCard = ({ JobList, loading,height}: Props) => {
  
  return (
    <ScrollView
    showsVerticalScrollIndicator ={false}
      style={{ marginTop: 15 }}
      contentContainerStyle={{
        height: height,
        paddingBottom: 40,
      
      }}>
      {
        loading ? <View style={{ alignItems: "center", paddingTop: 100 }}>
          <ActivityIndicator color={'#002695'} />
        </View> :
          <View>
            <FlatList
              data={JobList}
              renderItem={({ item }) => (
               
                  <TouchableOpacity>
                    <View style={styles.card}>
                      <View style={styles.icon}>
                        <FontAwesome name="briefcase" size={30} color="blue" />
                      </View>

                      <View>
                      <Link href={`/JobListing/${item.jobId}`} asChild>
                      <Text style={styles.cardName}>{item?.jobTitle}</Text>
                      </Link>
                        <Text style={{fontFamily:'Pop',fontSize:14}}>{item?.employerName}</Text>
                        <Text style={{fontFamily:'Pop',fontSize:12,color:'grey'}}>{item?.locationName}</Text>
                      </View>
                      <View>
                        <FontAwesome name="bookmark-o" size={25} color="black" />
                      </View>
                    </View>

                  </TouchableOpacity>
                
              )}
            />
          </View>
      }
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: "#eeeeee",
    marginVertical:8,
    borderRadius: 10,
    gap: 10,
    justifyContent: 'space-around',
  },
  cardName: {
    fontFamily: "PopSb",
    fontSize: 16,
    width: 200
  },
  icon:{
     paddingHorizontal:15,
     paddingVertical:18,
     backgroundColor:'white',
     borderRadius:10,
     height:60
  }
})
export default JobCard