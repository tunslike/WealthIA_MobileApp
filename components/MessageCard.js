import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import { COLORS, FONTS, icons } from '../constants'

const MessageCard = ({Name, OnPress, coyText, msgResponse, dateTime, type, msgRead}) => {
 
    return (

        <TouchableOpacity
            style={{
                flexDirection: "row",
                backgroundColor: COLORS.fgWhite,
                alignItems: "center",
                marginHorizontal: 20,
                borderBottomColor: "#F1F2F6",
                borderBottomWidth:1,
                paddingBottom:20,
                paddingTop:20,
                alignItems: "center"
            }}
            onPress={OnPress}
        >
            <View
                style={{
                    backgroundColor: (type == 1) ? "#F1F2F6" : "#A8B1DB",
                    width:55,
                    height:50,
                    borderRadius:10,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        ...FONTS.CoySigh,
                        color: "#E5E5E5",
                        fontSize: 33
                    }}
                >
                    {coyText}
                </Text>
            </View>

            <View
                style={{
                    flex:1,
                    paddingHorizontal: 15
                }}
            >
                <Text
                    style={
                        {
                            ...FONTS.MsgTitle,
                            color: COLORS.fgCatTitle,
                            fontSize: 14,
                            marginBottom:5,
                        }               
                    }
                >
                    {Name}
                </Text>
                <Text
                    style={{
                        ...FONTS.TabText,
                        color: "#9B9B9B",
                        lineHeight: 17
                    }}
                >
                    {msgResponse}
                </Text>
            </View>
            <View
                style={{
                    justifyContent: "flex-end",
                    alignItems: "flex-end"
                }}
            >
                <Text
                    style={{
                        color: "#A8B1DB",
                        ...FONTS.AccountTypeText,
                        fontSize: 13,
                        marginBottom: 15
                    }}
                >
                    {dateTime}
                </Text>
                <Image 
                source={(msgRead == 1) ? icons.msgStatus : icons.msgRead}
                resizeMode="contain"
                style={{
                    width:20,
                    height:20,
                    paddingBottom:15
                }}
            />
            </View>
        
        </TouchableOpacity>
    )
    
}

export default MessageCard;