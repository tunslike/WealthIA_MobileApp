import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

import { COLORS, FONTS, icons, images, appConfig} from "../constants";
import { LoginButtons, Loader} from '../components';

const ResetPassword = ({ navigation }) => {

    {/* INPUT STATE */}
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    {/* INPUT REFS */}
    const passwordInputRef = createRef();

    {/* PROCESS CLIENT LOGIN */}
    const processClientLoginRequest = () => {

        //set error
        setErrortext('');

        // check emailtuns
        if (!userEmail) {
            alert('Enter your email');
            return;
        }

        /* API CALL */
        setLoading(true);
      
        axios
            .post(appConfig.BASE_CONFIG.base_url + 'clients/resetPassword', {
                emailid: userEmail,
    
                Headers: {
                    "content-type": "application/json",
                }
            })
            .then(function (response) {
                setLoading(false);

                if(response.status == 200) {

                    try{

                        setUserEmail('');
                        alert('Your password has been reset successfully!')
                        
                    }catch(ex){

                    }   
                }

            })
            .catch(function (error) {
                setLoading(false);
                // handle error
                alert(error.message);
            });
    }
    {/* END PROCESS CLIENT LOGIN */}

    return (
        <View
        style={{
            flex:1,
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: COLORS.screenGrey,
            height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
          }}
        >
        <StatusBar backgroundColor={COLORS.screenGrey} barStyle="dark-content" />

        <View
          style={{
              paddingHorizontal:20,
              marginTop:80,
          }}
        >
        <TouchableOpacity
        style={{
            flexDirection: "row",
            alignItems: "center"
        }}
        onPress={() => navigation.goBack()}
    >
        <Image 
            source={icons.backarrow}
            resizeMode="contain"
            style={{
                width:20,
                height: 20,
                tintColor: COLORS.fgDarkGrey
            }}
        />

    </TouchableOpacity>
        </View>

        <Loader loading={loading} />
        <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>

            <View>
                <KeyboardAvoidingView>
                    <View
                        style={{
                            paddingHorizontal: 20,
                            marginTop:-50,
                        }}
                    >
                        <Text
                            style={{
                                width: "80%",
                                color: COLORS.fgDarkGrey,
                                ...FONTS.loginPageText,
                                fontSize:25,

                            }}
                        >
                            Reset your Password
                        </Text>
                    </View>
                    <View 
                        style={{
                            marginTop: 50,
                            paddingHorizontal:20
                        }}
                    >
                        <Text
                         style={{
                             width: "85%",
                             color: COLORS.fgDarkGrey,
                             ...FONTS.loginPageTextDesc,
                             fontSize:14,
                             marginTop:10,
                         }}
                        >
                        Enter your emaill address below to proceed
                        </Text>
                    </View>
                    <View
                         style={{
                             alignContent: "center",
                             marginTop: 20,
                             backgroundColor: COLORS.fgWhite,
                             borderRadius: 10,
                             padding: 5,
                             margin: 20
                         }}
                    >
                        <View
                         style={styles.sectionStyle}
                        >
                            <Image
                            source={icons.userIconProfile}
                            style={styles.imageStyle}
                        />
                        <TextInput
                            style={{flex: 1, ...FONTS.TextInput, fontSize:15}}
                            placeholder="Enter Your Email"
                            underlineColorAndroid="transparent"
                            onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                passwordInputRef.current &&
                                passwordInputRef.current.focus()
                              }
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                        />
                        </View> 
                       
                     
                    </View>
                    
                    <View
                            style={{
                                paddingHorizontal:20
                            }}
                    >
                            <LoginButtons 
                            buttonContainerStyle={{
                                paddingVertical: 20,
                                borderRadius: 7,
                                backgroundColor: COLORS.bgColor,
                                marginTop:35
                            }}
                            buttonText="Reset Password"
                            buttonTextColor={COLORS.fgGray}
                            onPress={processClientLoginRequest}
                        />
                    </View>

                    <View
                            style={{
                                marginTop: 50,
                                flexDirection:"row",
                                justifyContent: "center"
                            
                            }}
                    >
                            <Text
                                style={{
                                    color:COLORS.fgDarkGrey,
                                    ...FONTS.RegisterText
                                }}
                            >
                            Log into your account
                            </Text>
                            <Text
                            style={{
                                color:COLORS.fgOrange,
                                ...FONTS.RegisterText,
                                marginLeft:5
                            }}
                            onPress={() => navigation.navigate('SignIn')}
                        >
                        here
                        </Text>
                        
                            
                    </View>
                
                </KeyboardAvoidingView>
            </View>
        
        </ScrollView>

        </View>
    )
}

export default ResetPassword;

const styles = StyleSheet.create({

    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.screenGrey,
        height: 65,
        borderRadius: 5,
        margin: 7,
        ...FONTS.TextInput,
        color: COLORS.fgDarkGrey
      },
      imageStyle: {
        padding: 5,
        marginLeft:10,
        marginRight:15,
        height: 20,
        width: 20,
        resizeMode: 'cover',
        tintColor: COLORS.fgOrange
      },

})