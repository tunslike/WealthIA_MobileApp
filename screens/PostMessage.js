import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Image,
    TextInput,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';

import axios from 'axios';

import {  useSelector } from 'react-redux'

import { COLORS, FONTS, images, icons, appConfig } from "../constants";

import { HeaderBar, LoginButtons, Loader } from '../components';

const PostMessage = ({route, navigation}) => {

    const { clientid } = useSelector(state => state.clientReducer)

    const [message, setMessage] = useState('');

    // SET LOADER
    const [loading, setLoading] = useState(false);

    const { type, subCatId } = route.params


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
         .post(appConfig.BASE_CONFIG.base_url + 'messages/postEnquiryMessage', {

             clientid: clientid,
             subcatid: subCatId,
             message: message,
             type: "1",
    
             Headers: {
                 "content-type": "application/json",
             }
         })
         .then(function (response) {

             setLoading(false);

             if(response.status == 201) {

                 try{

                     navigation.navigate("PostSuccess", {type: "enquiries"})

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
                        flexDirection: "row",
                        marginTop:30,
                        alignContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal:20,
                        justifyContent: 'center'
                    }}
                >
                    <Image 
                        source={icons.portfolio}
                        resizeMode="contain"
                        style={{
                            width:17,
                            height:17,
                            tintColor: COLORS.fgCatHeader,
                            marginRight:5
                        }}
                    />
                    <Text
                        style={{
                            ...FONTS.ForgotPassword,
                            color: COLORS.fgCatHeader,
                            fontSize:13
                        }}
                    >
                        25 Providers connected to this channel
                    </Text>
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
                    will get a response from connected employers
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
                    style={{flex: 1, ...FONTS.loginPageTextDesc, textAlignVertical:'top', fontSize:15}}
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
                            marginBottom:30,
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
                    titleHeader="Enquiries"
                    styles={{
                        marginTop: 30
                    }}
                />
            </View>

        {/* Check post message type */}
        
            <View
                style={{
                    marginTop: 45,
                    paddingHorizontal:25
                }}
            >
                <Text
                    style={{
                        ...FONTS.CategoryListHeader,
                        color: COLORS.fgWhite
                    }}
                >
                    {type}
                </Text>
            </View>

        
            {renderBodyContents()}
      
            
        </View>
    )
}

export default PostMessage;