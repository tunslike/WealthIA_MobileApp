import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Image,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Alert
} from 'react-native';


import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS, FONTS, images, icons, appConfig } from "../constants";

import { HeaderBar, LoginButtons, Loader } from '../components';

const PostMessageProvider = ({route, navigation}) => {

    const [message, setMessage] = useState('');
    const [ClientID, setClientID] = useState('');

    // SET LOADER
    const [loading, setLoading] = useState(false);

    const { type, subCatId, provider, companyName } = route.params

    //USE EFFECT
    useEffect(() => {
        
        //fetch user details
        this.fetchUserDetails();
        
        
    }, []);
    // END OF USE EFFECT

    //get user details
    fetchUserDetails = async () => {
    
        let clientid = await AsyncStorage.getItem('clientid');
        setClientID(clientid)
    }

    //SAVE CONNECTION TO DATABSE
    saveConnection = () => {

        if(!ClientID) {
            alert('Client session not valid! Please login again');
            return;
        }

        // set loading
        setLoading(true);

         // Set Axios 
         axios
         .post(appConfig.BASE_CONFIG.base_url + 'clients/saveConnection', {

            client_id: ClientID,
             connect_id: provider,
        
             Headers: {
                 "content-type": "application/json",
             }
         })
         .then(function (response) {

             setLoading(false);

             if(response.status == 201) {

                 try{

                     alert('Your connection was saved!')

                 }catch(ex){

                 }   
             }
         })
         .catch(function (error) {
             setLoading(false);
             // handle error
             alert('Unable to process your request, please try again!');
         });

    }

    //FUNCTION TO LOAD SECTORS
    postEnquiryMessage = () => {

        //check message
        if(!message) {
            alert("Enter your message!")
            return;
        }

        if(message.trim() == '') {
            alert("Your message is empty!")
            return;
        }

        if(message.trim().length < 10) {
            alert("Enter minimum of 50 characters to post")
            return;
        }

        if(message.trim().length > 500) {
            alert("Enter minimum of 50 characters to submit")
            return;
        }

        // set loading
        setLoading(true);

         // Set Axios 
         axios
         .post(appConfig.BASE_CONFIG.base_url + 'messages/postProviderMessage', {

             clientid: ClientID,
             subcatid: subCatId,
             message: message,
             providerid: provider,
             type: "2",
             channelCategory: type,
    
             Headers: {
                 "content-type": "application/json",
             }
         })
         .then(function (response) {

             setLoading(false);

             if(response.status == 201) {

                 try{

                     navigation.navigate("PostSuccess", {type: "provider"})

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

     /* Show Connection Component */
     function renderBodyContents() {
        return (
            <View
                style={{
                    width: "100%",
                    backgroundColor: COLORS.fgGray,
                    borderTopLeftRadius:25,
                    borderTopRightRadius: 25,
                    flex:1,
                    marginTop:20,
                    height:300
                }}
            >
            

            <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <View>
            <KeyboardAvoidingView enabled>

            <View
                style={{
                    alignItems: "center"
                }}
            >
            <TouchableOpacity
            style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop:20,
                marginBottom: 10,
                paddingHorizontal:20,
                borderWidth:1,
                borderStyle: "solid",
                borderColor: COLORS.fgTabColor,
                marginHorizontal: 20,
                borderRadius:5,
                paddingVertical:5,
                width: "60%",
                backgroundColor: COLORS.fgWhite
            }}
            onPress={saveConnection}
        >
            <Image 
                source={icons.portfolio}
                resizeMode="contain"
                style={{
                    width:17,
                    height:17,
                    tintColor: COLORS.bgColor,
                    marginRight:5,
                    marginBottom:2
                }}
            />
            <Text
                style={{
                    ...FONTS.TabText,
                    color: COLORS.bgColor,
                    fontSize:13
                }}
            >
                Save provider as connection
            </Text>
        </TouchableOpacity>
</View>
                <View
                    style={{
                        paddingHorizontal: 20,
                        marginTop: 21,
                        marginBottom:10,
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.CategoryListHeader,
                            fontSize: 16.5,
                            lineHeight:20,
                            color: COLORS.fgCatTitle
                        }}
                    >
                    Post your enquiry below and you 
                    will get a response from selected provider
                    </Text>
                </View>

                <View
                        style={{
                            flex: 1,
                            justifyContent: "flex-end",
                            paddingHorizontal: 20,
                            paddingBottom:70
                            
                        }}
                >

                    <View
                        style={{
                            backgroundColor: COLORS.fgWhite,
                            height:250,
                            padding:15,
                            borderRadius:15,
                            marginTop:30
                        }}
                    >
                    <TextInput
                        style={{flex: 1, ...FONTS.loginPageTextDesc, textAlignVertical: 'top', fontSize:15}}
                        placeholder="Type your message here"
                        onChangeText={(message) => setMessage(message)}
                        autoCapitalize="none"
                        returnKeyType="next"
                        blurOnSubmit={false}
                        multiline={true}
                        numberOfLines={4}
                    />     
                    </View>
                     
                    <View
                        style={{
                            marginTop:10,
                            marginBottom:50,
                            alignItems: "flex-end",
                            paddingRight: 10
                        }}
                    >
                            <Text
                                style={{
                                    ...FONTS.TabText,
                                    color: "#AEAEAE"
                                }}
                            >Min: 50  Max: 500</Text>
                    </View>

                    <LoginButtons 
                    buttonContainerStyle={{
                        paddingVertical: 20,
                        borderRadius: 20,
                        backgroundColor: COLORS.fgOrange,
                        marginTop:5
                    }}
                    buttonText="Post your message"
                    buttonTextColor={COLORS.fgWhite}
                    onPress={postEnquiryMessage}
                />
                </View>
                </KeyboardAvoidingView>
                </View>
        </ScrollView>
            </View>
        )
    }
    /* End Show Connection Component */

    return (
        <View
        
        style={{
            flex:1,
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: COLORS.bgColor,
            height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
          }}
        >
        <StatusBar backgroundColor={COLORS.bgColor} barStyle="light-content" />
        <Loader loading={loading} />
        <View>
        <HeaderBar 
            isTitle={true}
            titleHeader= {type == 1 ? "Advice" : "Complaint"}
            styles={{
                marginTop: 30
            }}
        />
    </View>
    <View
                style={{
                    marginTop: 35,
                    paddingHorizontal:30,
                    flexDirection: "row",
                    alignItems: "center",
                    alignContent: "center"
                }}
            >
            <Image 
            source={icons.chat}
            resizeMode="contain"
            style={{
                width:15,
                height:15,
                marginRight:5,
                tintColor: COLORS.fgOrange,
            }}
        />
                <Text
                    style={{
                        color: "#CACEDF",
                        ...FONTS.ForgotPassword,
                        fontSize: 14,

                    }}
                >
                    You are chatting with
                </Text>
            </View>
        <View
            style={{
                marginTop: 13,
                paddingHorizontal:30,
                marginBottom: 20,
            }}
        >
            <Text
                style={{
                    ...FONTS.CategoryListHeader,
                    fontSize: 18,
                    color: COLORS.fgGray
                }}
            >
                {companyName}
            </Text>
        </View>

            {renderBodyContents()}
        </View>
    )
}

export default PostMessageProvider;