import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    Image,
    TextInput,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';

import axios from 'axios';

import { COLORS, FONTS, images, icons, appConfig } from "../constants";
import { HeaderBar, MessageCard, Loader} from '../components';

const Chat = ({route, navigation}) => {

    const { coyname, clientID, providerID, message, RequestID, messageid, msgReadStatus } = route.params

    const [allMessages, setAllMessages] = useState([])
    const [messageReply, setMessageReply] = useState('');
    const [loading, setLoading] = useState(false);

       //USE EFFECT
       useEffect(() => {

       // this.UpdateMessageReadStatus();
        this.loadMessageResponses();
    
    }, []);  

    //FUNCTION TO LOAD SECTORS
    postMessageReply = async () => {

        //check message
        if(!messageReply) {
            alert("Enter your reply message!")
            return;
        }

        if(messageReply.trim() == '') {
            alert("Your message is empty!")
            return;
        }

        if(messageReply.trim().length > 500) {
            alert("Message is too long!")
            return;
        }

        // set loading
        setLoading(true);

         // Set Axios 
         await axios
         .post(appConfig.BASE_CONFIG.base_url + 'messages/postMessageResponse', {

             msgRuestID: messageid,
             message: messageReply,
             response_by: clientID,
             
             Headers: {
                 "content-type": "application/json",
             }
         })
         .then(function (response) {

             setLoading(false);

             if(response.status == 200) {

                 try{

                    this.loadMessageResponses();

                    alert('Your response has been posted!')
                     
                    setMessageReply('')

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

    // load enquiries message
    loadMessageResponses = () => {

        if(messageid == null) {
            return;
        }

        // Set Axios 
        axios
        .get(appConfig.BASE_CONFIG.base_url + 'messages/loadMessageResponses/' + messageid, {
   
            Headers: {
                "content-type": "application/json",
            }
        })
        .then(function (response) {

            if(response.status == 200) {

                try{
                    
                    setAllMessages(response.data);
                
                }catch(ex){

                }   
            }

        })
        .catch(function (error) {
            
           // alert('Sorry, Unable to load message')
    
        });

    }
    // end of messages
    
     // load enquiries message
     UpdateMessageReadStatus = () => {
    
        if(msgReadStatus == '1') {
            return;
        }
    
        // Set Axios 
        axios
        .get(appConfig.BASE_CONFIG.base_url + 'messages/UpdateMessageReadStatus/' + RequestID, {
   
            Headers: {
                "content-type": "application/json",
            }
        })
        .then(function (response) {

            if(response.status == 200) {

                try{
                    
        
                
                }catch(ex){

                }   
            }

        })
        .catch(function (error) {
            
            alert('Sorry, Unable to load mess')
    
        });

    }
    // end of messages

    function getParsedDate(strDate){

        var strSplitDate = String(strDate).split(' ');
        var date = new Date(strSplitDate[0]);
        // alert(date);
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
    
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        date =  dd + "-" + mm + "-" + yyyy;
        return date.toString();
    }

    /* Render body content */
    function renderBodyContents() {
        return (
            <View
                style={{
                    width: "100%",
                    backgroundColor: COLORS.fgGray,
                    borderTopLeftRadius:25,
                    borderTopRightRadius: 25,
                    flex:1,
                    marginTop:10,
                    height:300
                }}
            >
            <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              justifyContent: 'center',
              alignContent: 'center',
            }}
            >
<KeyboardAvoidingView enabled>
            <View
            style={{
                marginTop: 21,
                paddingHorizontal:30,
                flexDirection: "row",
                alignItems: "center"
            }}
        >
        <Image 
        source={icons.msgicon}
        resizeMode="contain"
        style={{
            width:15,
            height:15,
            marginRight:5,
            tintColor: "#625E5E",
        }}
    />
            <Text
                style={{
                    color: COLORS.fgCatHeader,
                    ...FONTS.ForgotPassword,
                    fontSize: 13
                }}
            >
            Your enquiry message
            </Text>
        </View>

        <View
            style={{
                            backgroundColor: "#E5E5E5",
                            borderRadius: 15,
                            height: 120,
                            marginBottom:10,
                            marginHorizontal:20,
                            marginTop: 20,
                            padding: 15
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.AccountTypeText,
                                fontSize: 13,
                                color: "#625E5E",
                                lineHeight:18
                            }}
                        >
                            {message}
                        </Text>   
                    </View>
                    <View
                        style={{
                            justifyContent: "flex-start",
                            paddingHorizontal: 35,
                            flexDirection: "row",
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginRight: 20
                            }}
                        >
                            <Image 
                                source={icons.view}
                                resizeMode="contain"
                                style={{
                                    width:18, height: 18, marginRight: 5,
                                    tintColor: COLORS.fgOrange,
                                }}
                            />
                            <Text
                                style={{
                                    ...FONTS.TermsCondText,
                                    color: COLORS.fgOrange
                                }}
                            >
                                18
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            <Image 
                                source={icons.thumbsup}
                                resizeMode="contain"
                                style={{
                                    width:17, height: 18, marginRight: 3,
                                    tintColor: COLORS.fgOrange,
                                    marginBottom:3
                                }}
                            />
                            <Text
                                style={{
                                    ...FONTS.TermsCondText,
                                    color: COLORS.fgOrange
                                }}
                            >
                                18
                            </Text>
                        </View>
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
                            borderRadius:15,
                            height: 260,
                            marginBottom:25,
                            paddingTop: 20,
                            paddingBottom: 20,
                            marginTop:10,
                        }}
                    >
                    <ScrollView
                    style={{ flex: 1, height: 260 }}
                    estedScrollEnabled={true}
                  >
                  {allMessages.map((prop, key) => {
                    return (
                        <View style={{
                            backgroundColor: (clientID == prop.RESPONSE_BY) ? '#ebf4ff' : '#e8e6dc',
                            marginBottom: 15,
                            padding:10,
                            alignItems: (clientID == prop.RESPONSE_BY) ? 'flex-start' : 'flex-end',
                            width: '85%',
                            borderBottomLeftRadius: (clientID == prop.RESPONSE_BY) ? 0 : 7,
                            borderTopLeftRadius: (clientID == prop.RESPONSE_BY) ? 0 : 7,
                            borderTopRightRadius: (clientID == prop.RESPONSE_BY) ? 7 : 0,
                            borderBottomRightRadius: (clientID == prop.RESPONSE_BY) ? 7 : 0,
                            justifyContent: 'flex-start',
                            alignSelf: (clientID == prop.RESPONSE_BY) ? 'flex-start' : 'flex-end'

                        }}>
                        <Text
                        style={{
                            ...FONTS.TermsCondText,
                            fontSize:13,
                            color: '#6382a8'
                         }}
                        >
                        {(clientID == prop.RESPONSE_BY) &&
                            'You:'
                        }

                        {(clientID != prop.RESPONSE_BY) &&
                            coyname +':'
                        }
                        
                        </Text>
                         <Text
                         style={{
                            ...FONTS.TermsCondText,
                            marginTop:5,
                            color:'#122338'
                         }}
                         key={key}>{prop.RESPONSE_MESSAGE}</Text>
                         <Text
                         style={{
                            ...FONTS.TermsCondText,
                            color:'#79a1d1',
                            fontSize:11,
                            marginTop:5,

                         }}
                         >Posted: {getParsedDate(prop.RESPONSE_DATE)}</Text>
                        </View>
                    );
                 })}

                  </ScrollView>

                    </View>
            
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: COLORS.fgWhite,
                                padding:10,
                                borderRadius: 10,
                                flex:1,
                                marginRight:10,
                                height:65
                            }}
                        >
                            <Image 
                                source={icons.chat}
                                resizeMode="contain"
                                style={{
                                    width:23,
                                    height:23,
                                    marginRight:10,
                                    tintColor: "#E5E5E5",
                                }}
                            />
                            <TextInput
                                style={{flex: 1, ...FONTS.loginPageTextDesc, fontSize:15}}
                                placeholder="Type your reply here"
                                autoCapitalize="none"
                                returnKeyType="next"
                                blurOnSubmit={false}
                                onChangeText={(messageReply) => setMessageReply(messageReply)}
                            />
                        </View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.fgOrange,
                                height:65,
                                width: 70,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 10,
                            }}
                            onPress={postMessageReply}
                        >
                            <Image 
                            source={icons.sendicon}
                            resizeMode="contain"
                            style={{
                                width:30,
                                height:30,
                                tintColor: COLORS.fgWhite
                            }}
                            />
                        </TouchableOpacity>
                    </View>
            </View>
        
</KeyboardAvoidingView>
            </ScrollView>
            </View>
        )
    }
    /* End of render body content */

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
            <View>
                <HeaderBar 
                    isTitle={true}
                    titleHeader="Investment"
                    styles={{
                        marginTop: 35
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
                    {coyname}
                </Text>
            </View>
            {renderBodyContents()}
        </View>
    )
}

export default Chat;