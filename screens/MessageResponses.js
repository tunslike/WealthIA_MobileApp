import React,{ useEffect, useState } from 'react';
import {
    View,
    StatusBar,
    Text,
    Image,
    FlatList
} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import moment from 'moment';

import { COLORS, FONTS, images, icons, appConfig } from "../constants";

import { HeaderBar, MessageCard, Loader } from '../components';


const MessageResponses = ({route, navigation}) => {

    // GET PARAMS
    const { clientid, categoryName, messageid, message } = route.params

    const [messages, setMessages] = useState('');
    const [msgcount, setMessageCount] = useState('');
    const [unread, setUnreadMessages] = useState('0');

    const [loading, setLoading] = useState(false);

    //USE EFFECT
    useEffect(() => {
        
        //load message
        this.LoadMessages();

    }, []);

    // load messages
    LoadMessages = () => {
        
        // set loading
        setLoading(true);

        // Set Axios 
        axios
        .post(appConfig.BASE_CONFIG.base_url +'messages/loadMessageReplies', {

            messageID: messageid,
            messageOwner: clientid,
    
            Headers: {
                "content-type": "application/json",
            }
        })
        .then(function (response) {

            setLoading(false);

            if(response.status == 200) {

                try{

                    setMessages(response.data)

                    if(messages) {
                        setMessageCount(messages.length)
                    }

                }catch(ex){

                }   
            }

        })
        .catch(function (error) {
            setLoading(false);
            // handle error
            setMessageCount('0')
        });

    }
    // end of messages

    //truncate strings 
    function TruncateString (message) {
        if (message.length > 45) {
            return message.substring(0, 45) + " ...";
        }else{
            return message;
        }
    }
    //end of truncate string

    //show render body contents
    function renderBodyContents() {
        return (
            <View
                style={{
                    width: "100%",
                    backgroundColor: COLORS.fgGray,
                    borderTopLeftRadius:25,
                    borderTopRightRadius: 25,
                    flex:1,
                    marginTop:14,
                    height:300
                }}
            >
                <View
                    style={{
                        marginTop: 21,
                        paddingHorizontal:30,
                        flexDirection: "row",
                        alignItems: "center"
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
                            color: COLORS.fgCatHeader,
                            ...FONTS.ForgotPassword,
                            fontSize: 13
                        }}
                    >
                        Unread messages {unread}
                    </Text>
                </View>

                {/* Render Flat list component */}
                    <View
                        style={{
                            backgroundColor: COLORS.fgWhite,
                            borderRadius: 10,
                            paddingTop:20,
                            paddingBottom:20,
                            marginTop: 25,
                            marginHorizontal: 15,
                        }}
                    >

                    {(msgcount == '0') &&
                        <View
                            style={{
                                paddingHorizontal: 20,
                                backgroundColor: COLORS.fgGray,
                                marginHorizontal:20,
                                padding: 20,
                                borderRadius: 10,
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            <Image 
                                source={icons.info}
                                resizeMode="contain"
                                style={{
                                    height:25,
                                    width: 25,
                                    tintColor: COLORS.fgOrange,
                                    marginRight: 5
                                }}
                            />
                            <Text
                                style={{
                                    ...FONTS.AccountTypeText,
                                    fontSize: 14,
                                    color: "#625E5E"
                                }}
                            >
                                Sorry, you do not have any message!
                            </Text>
                        </View>
                    }

                        <FlatList 
                            data={messages}
                            keyboardDismissMode="on-drag"
                            keyExtractor={item => `${item.REQUEST_ID}`} 
                            showsVerticalScrollIndicator={false}
                            renderItem={
                                ({ item }) => {
                                    return (
                                        <MessageCard
                                        msgRead={'1'}
                                        type={item.TYPE}
                                        coyText={item.COMPANY_NAME.charAt(0)} 
                                        Name={'Re: ' + item.COMPANY_NAME}
                                        msgResponse={TruncateString(message)}
                                        dateTime={moment(item.RESPONSE_DATE, "YYYYMMDD").fromNow()}
                                        OnPress={() => navigation.navigate("Chat", {coyname: item.COMPANY_NAME, clientID: clientid, messageid: item.MESSAGE_REQUEST_ID, message: message})}
                                        />
                                    )
                                }
                            }
                        />    

                    </View>
                {/* End of Render Flat list component */}
            </View>
        )
    }
    //end of show render body contents

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
                    isTitle={false}
                    titleHeader="Enquiries"
                    styles={{
                        marginTop: 30
                    }}
                />
            </View>
            <View
                style={{
                    marginTop: 45,
                    paddingHorizontal:25
                }}
            >
                <Text
                    style={{
                        ...FONTS.CategoryListHeader,
                        color: COLORS.fgWhite,
                        fontSize: 22
                    }}
                >
                    {categoryName + ' Enquiry'}
                </Text>
                <Text
                style={{
                    color: "#A8B1DB",
                    ...FONTS.MsgTitle,
                    fontSize:13,
                    marginTop:2
                }}
                >
                    Message Responses
                </Text>
            </View>
            <View
                    style={{
                        marginTop:13,
                        paddingHorizontal:25,
                        justifyContent: "flex-end",
                        flexDirection: "row",
                        alignItems: "center"
                    }}
            >
            <Image 
                source={icons.chat}
                resizeMode="contain"
                style={{
                    width:15,
                    height:15,
                    marginRight:5,
                    tintColor: COLORS.fgButtonBorder,
                }}
            />
                    <Text
                        style={{
                            color: COLORS.fgGray,
                            ...FONTS.ForgotPassword,
                            fontSize: 13
                        }}
                    >
                    Total Messages [{msgcount}]
                    </Text>
            </View>

            {renderBodyContents()}
            
        </View>
    )
}

export default MessageResponses;