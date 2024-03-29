import { View, Text, TouchableOpacity,
    ScrollView, StyleSheet} from 'react-native'
import React, { useRef, useState } from 'react'
import * as Haptics from 'expo-haptics';


const categories = [
    {id:'1',name:'Accounting'},
    {id:"2",name:"Sales"},
    {id:"3",name:'Healthcare'},
    {id:"4",name:'Marketing'},
    {id:'5',name:'HR'},
    {id:'6',name:'Design'},
    {id:'7',name:'Construction'},
    {id:'8',name:'Management'},
    {id:'9',name:'Nurses'}
]

interface Props{
    onCategoryChanged:(category:string)=> void
}

const JobRecommandationCard = ({onCategoryChanged}:Props) => {
    const [ActiveIndex,setActiveIndex] = useState(0)
    const ItemRef = useRef<Array<TouchableOpacity| null>>([]);
    const ScrollRef = useRef<ScrollView>(null);
    const selectCategory = (index:number)=>{
       setActiveIndex(index)
       const selected = ItemRef.current[index]
       selected?.measure((x)=>{
        ScrollRef.current?.scrollTo({x:x - 10,y:0,animated:true})
       })
       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
       onCategoryChanged(categories[index].name)
    }
  return (
    <View style={{paddingTop:30}}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontFamily:"PopSb",fontSize:20}}>
            Job Recommandation
            </Text>
        <Text style={{fontFamily:"PopSb",fontSize:16,color:"#002695"}}>
            See all
            </Text>
      </View>
      <ScrollView horizontal
       ref={ScrollRef}
       showsHorizontalScrollIndicator={false}
       style={{marginTop:15}}
       contentContainerStyle={{
      gap:5,
        alignItems:'center'
       }}>
         {
            categories.map((item,index)=>(
                <TouchableOpacity key={item.id} 
                ref={(el)=>ItemRef.current[index] = el}
                style={ActiveIndex === index ? styles.btnActive :styles.btn} 
                onPress={()=>selectCategory(index)}>
                  <Text style={ActiveIndex === index ? styles.btnActiveText :
                    styles.btnText}>
                        {item.name}
                        </Text>
                </TouchableOpacity>
            ))
         }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    btnActive:{
      backgroundColor:'#002695',
      paddingVertical:10,
      paddingHorizontal:20,
      borderRadius:20
    },
    btn:{
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:20

    },
    btnText:{
      fontFamily:'PopSb',
      fontSize:18,
      color:'grey'
    },
    btnActiveText:{
        fontFamily:'PopSb',
        fontSize:18,
        color:'white'
    }

})

export default JobRecommandationCard