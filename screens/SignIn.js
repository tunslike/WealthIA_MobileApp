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

import {  useSelector, useDispatch} from 'react-redux'
import { setClientName, setClientID } from '../redux/actions';

import { COLORS, FONTS, icons, images, appConfig} from "../constants";
import { LoginButtons, Loader} from '../components';

const SignIn = ({ navigation }) => {

    const { clientname, clientid } = useSelector(state => state.clientReducer)
    const dispatch = useDispatch()

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

        // check email
        if (!userEmail) {
            alert('Enter your email');
            return;
        }

        // check password
        if (!userPassword) {
            alert('Enter your password');
            return;
        }

        /* API CALL */
        setLoading(true);
      
        axios
            .post(appConfig.BASE_CONFIG.base_url + 'clients/clientLogin', {
                email: userEmail,
                password: userPassword,
                Headers: {
                    "content-type": "application/json",
                }
            })
            .then(function (response) {
                setLoading(false);

                if(response.status == 200) {

                    try{

                        const token = response.data.token;

                        if(token) {        
                    
                                                    
                            AsyncStorage.setItem('clientid', response.data.CLIENT_ID);
                            
                            //dispatch client ID
                            dispatch(setClientID(response.data.CLIENT_ID));

                            if(response.data.TYPE == 'Company') {

                                AsyncStorage.setItem('firstname', response.data.CONTACT_NAME);
                                AsyncStorage.setItem('company', response.data.COMPANY_NAME);
                                AsyncStorage.setItem('providerID', response.data.PROVIDER_ID);
                                AsyncStorage.setItem('sector', response.data.SECTOR_ID);
                                AsyncStorage.setItem('SubCategoryID', response.data["providerDetails"].SUB_CATEGORY_ID);

                            }else{

                                //dispatch(setClientName(response.data.FIRST_NAME))
                                AsyncStorage.setItem('firstname', response.data.FIRST_NAME);

                            }

                            AsyncStorage.setItem('accountType', response.data.TYPE);
                            AsyncStorage.setItem('token', response.data.token);
                            AsyncStorage.setItem('msgCount', response.data['messageCount'].MSG_COUNT.toString());
                            AsyncStorage.setItem('connection', response.data['connection'].CONNECT_COUNT.toString());

                            //redirect to login
                            navigation.replace('Home');

                        }else {
                            alert("Incorrect Email or Password! Please try again");
                        }

                    }catch(ex){

                    }   
                }

            })
            .catch(function (error) {
                setLoading(false);
                // handle error
                alert("Incorrect Email or Password!");
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
                        marginHorizontal: 35,
                        alignItems: 'flex-end',
                        marginTop: -90,
                        marginBottom:30
                    }}
                >
                        <Image 
                        source={images.logo}
                        resizeMode="contain"
                        style={{
                            width:65,
                            height:65,
                        }}
                    />
                </View>
                    <View
                        style={{
                            paddingHorizontal: 20,
                        }}
                    >
                        <Text
                            style={{
                                width: "65%",
                                color: COLORS.fgDarkGrey,
                                ...FONTS.loginPageText
                            }}
                        >
                            Sign In
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
                             width: "80%",
                             color: COLORS.fgDarkGrey,
                             ...FONTS.loginPageTextDesc
                         }}
                        >
                        Login into your account below
                        </Text>
                    </View>
                    <View
                         style={{
                             alignContent: "center",
                             marginTop: 30,
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
                        
                        <View
                        style={styles.sectionStyle}
                       >
                           <Image
                           source={icons.password}
                           style={styles.imageStyle}
                       />
                       <TextInput
                           style={{flex: 1, ...FONTS.TextInput, fontSize:13}}
                           placeholder="Enter Your Password"
                           underlineColorAndroid="transparent"
                           onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                           ref={passwordInputRef}
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                            secureTextEntry={true}
                            underlineColorAndroid="#f000"
                            returnKeyType="next"
                       />
                       </View> 
                       <View
                           style={{
                               marginTop: 10,
                               paddingVertical:10,
                               marginBottom:10,
                               alignItems: "flex-end",
                               paddingHorizontal:10
                           }}
                       >
                        <Text
                            style={{
                                color: COLORS.fgOrange,
                                ...FONTS.ForgotPassword,
                            }}
                            onPress={() => navigation.navigate('ResetPassword')}>
                            Forgot Password?
                        </Text>
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
                                marginTop:5
                            }}
                            buttonText="Sign In"
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
                            Dont have an account?
                            </Text>
                            <Text
                            style={{
                                color:COLORS.fgOrange,
                                ...FONTS.RegisterText,
                                marginLeft:5
                            }}
                            onPress={() => navigation.navigate('CreateAccount')}
                        >
                        Register here
                        </Text> 
                    </View>
                </KeyboardAvoidingView>
            </View>
        </ScrollView>

        </View>
    )
}

export default SignIn;


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