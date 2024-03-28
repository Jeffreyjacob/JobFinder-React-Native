import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { defaultStyle } from '@/components/styles'
import { Link, useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSignUp } from '@clerk/clerk-expo';

type formValue = {
  email: string,
  password: string,
  firstname: string,
  lastname: string
}
const formSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstname: z.string().min(2, 'Your name must be more than 2 characters '),
  lastname: z.string().min(2, 'Your name must be more than 2 characters '),
});

const signup = () => {
  const router = useRouter()
  const { control, handleSubmit } = useForm<formValue>({ resolver: zodResolver(formSchema) });
  const { isLoaded, signUp, setActive } = useSignUp();
  const [loading,setLoading] = useState(false);
  const onSubmit = async (data: formValue) => {
    setLoading(true)
    if(!signUp && !isLoaded){
       return;
    }
    try{
      await signUp.create({
          firstName:data.firstname,
          lastName:data.lastname,
          emailAddress:data.email,
          password:data.password
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      router.push('/auth/Signup/SignUpVerification');
      setLoading(false)
    }catch (err:any){
      Alert.alert(JSON.stringify(err.errors, null, 2))
      setLoading(false);
    }

  }

  return (
    <View style={defaultStyle.container}>

      {/**Signup form */}
      <View style={{ gap: 15, paddingHorizontal: 20, paddingTop: 50 }}>


        <Controller
          control={control}
          name={'firstname'}
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[defaultStyle.fieldLabel]}>
                  First Name
                </Text>
                <Text style={{ color: "red", fontFamily: "PopSb" }}>* </Text>
              </View>
              <TextInput placeholder='EnterFirst Name'
                style={[defaultStyle.inputField]} value={value} onChangeText={onChange}
                onBlur={onBlur} />
              {error && <Text style={styles.errorMessage}>
                {error.message}
              </Text>
              }
            </View>
          )}
        />

<Controller
          control={control}
          name={'lastname'}
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[defaultStyle.fieldLabel]}>
                  LastName
                </Text>
                <Text style={{ color: "red", fontFamily: "PopSb" }}>* </Text>
              </View>
              <TextInput placeholder='Enter Last Name'
                style={[defaultStyle.inputField]} value={value} onChangeText={onChange}
                onBlur={onBlur} />
              {error && <Text style={styles.errorMessage}>
                {error.message}
              </Text>
              }
            </View>
          )}
        />

        <Controller
          control={control}
          name={'email'}
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[defaultStyle.fieldLabel]}>
                  Email Address
                </Text>
                <Text style={{ color: "red", fontFamily: "PopSb" }}>* </Text>
              </View>
              <TextInput placeholder='Enter Email Address'
                style={[defaultStyle.inputField]} value={value} onChangeText={onChange}
                onBlur={onBlur} />
              {error && <Text style={styles.errorMessage}>
                {error.message}
              </Text>
              }
            </View>
          )}
        />

      
        <Controller
          control={control}
          name={'password'}
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[defaultStyle.fieldLabel]}>
                  Password
                </Text>
                <Text style={{ color: "red", fontFamily: "PopSb" }}>* </Text>
              </View>
              <TextInput secureTextEntry placeholder='Enter Password'
                style={[defaultStyle.inputField]} value={value} onChangeText={onChange}
                onBlur={onBlur} />
              {error && <Text style={styles.errorMessage}>
                {error.message}
              </Text>
              }
            </View>
          )}
        />


        {/**Signup button */}

        <TouchableOpacity onPress={handleSubmit(onSubmit)}
          style={[defaultStyle.btn, { marginTop: 20 }]}>
          {
            loading ? <ActivityIndicator color='#fff'/>:
            <Text style={[defaultStyle.btnText]}>Register</Text>
            
          }
        </TouchableOpacity>

      </View>
      {/**login text */}
      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 70, right: 80 }}>
        <Text style={{ fontFamily: 'PopSb' }}>
          Already have an account ?
        </Text>
        <Link href={'/Login/login'} asChild>
          <Text style={{ fontFamily: 'PopSb', color: "#002695" }}>Login now</Text>
        </Link>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
    paddingTop: 10
  }
})

export default signup