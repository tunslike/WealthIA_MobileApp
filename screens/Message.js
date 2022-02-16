import React,{ useEffect, useState } from 'react';
import {
    View,
    StatusBar,
    Text,
    Image,
    FlatList
} from 'react-native';

import axios from 'axios';
import moment from 'moment';

import {  useSelector} from 'react-redux'

import { COLORS, FONTS, images, icons, appConfig } from "../constants";

import { HeaderBar, MessageCard, Loader } from '../components';


const Message = ({route, navigation}) => {

   const { clientid } = useSelector(state => state.clientReducer)

    // GET PARAMS
    //const { clientid } = route.params

    const [messages, setMessages] = useState('');
    const [msgcount, setMessageCount] = useState('');
    const [unread, setUnreadMessages] = useState('0');

    const [loading, setLoading] = useState(false);

    const dateFormat = moment().startOf('hour').fromNow();


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
        .get(appConfig.BASE_CONFIG.base_url +'messages/loadMessages/' +clientid, {
   
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

    // format date
    function formatDaysAgo(value, locale) {
        const date = new Date(value);
        const deltaDays = (date.getTime() - Date.now()) / (1000 * 3600 * 24);
        const formatter = new Intl.RelativeTimeFormat(locale);
        return formatter.format(Math.round(deltaDays), 'days');
    }

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
                                        msgRead={item.STATUS}
                                        type={item.TYPE}
                                        coyText={item.PROVIDER_NAME == null ? item.SUB_NAME.charAt(0) : item.PROVIDER_NAME.charAt(0)} 
                                        Name={item.PROVIDER_NAME == null ? item.SUB_NAME + ' Enquiry' : item.PROVIDER_NAME}
                                        msgResponse={TruncateString(item.MESSAGE)}
                                        dateTime={moment(item.DATE_CREATED, "YYYYMMDD").fromNow()}
                                        OnPress={() => navigation.navigate("MessageResponses", {messageid: item.REQUEST_ID, categoryName: item.SUB_NAME, clientid: clientid, coyname: item.PROVIDER_NAME, message: item.MESSAGE})}
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
                    clientid={clientid}
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
                        color: COLORS.fgWhite
                    }}
                >
                    Messages
                </Text>
            </View>
            <View
                    style={{
                        marginTop:15,
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

export default Message;