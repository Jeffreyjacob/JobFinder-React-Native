import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { defaultStyle } from '@/components/styles';
import { useSignUp } from '@clerk/clerk-expo';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
import { useRouter } from 'expo-router';
  
  const CELL_COUNT = 6;

const SignUpVerification = () => {
    const router = useRouter()
    const [value, setValue] = useState('');
    const {signUp,isLoaded,setActive} = useSignUp();
    const [loading,setLoading] = useState(false)
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onVerification = async () =>{
    setLoading(true)
    if(!signUp && !isLoaded){
        return;
    }
    try {
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code:value,
        });
   
        await setActive({ session: completeSignUp.createdSessionId });
         setLoading(false);
      } catch (err: any) {
        Alert.alert(JSON.stringify(err.errors, null, 2))
      setLoading(false);
      }
  
  }
  return (
    <View style={[defaultStyle.container,{paddingHorizontal:30,paddingVertical:40}]}>
        <Text style={{fontFamily:'Pop',fontSize:18}}>
            Enter 4 digit code.We just sent you on given email address
        </Text >

        <View style={styles.root}>
        <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        testID="my-code-input"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor/> : null)}
          </Text>
        )}
      />
        </View>

        <TouchableOpacity style={defaultStyle.btn} onPress={()=>onVerification()}>
            {
               loading ?  <ActivityIndicator color='#fff'/>:
               <Text style={defaultStyle.btnText}>Continue</Text>
                        
            }
      
        </TouchableOpacity>
    </View>
  )
}
 
const styles = StyleSheet.create({
    root: { padding: 20,marginBottom:20},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 45,
    height:45,
    lineHeight: 38,
    fontSize: 30,
    paddingVertical:5,
    alignItems:'center',
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    borderRadius:10
  },
  focusCell: {
    borderColor: '#002695',
  },
})

export default SignUpVerification