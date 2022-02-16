import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import { COLORS, FONTS, icons } from '../constants'

const ChatCard = ({Message, Owner, Time, Type}) => {
 
    return (

        <View
                style={{
                                backgroundColor: "#e3f0ff",
                                padding: 10,
                                width: '70%',
                                borderRadius:10,
                                marginHorizontal:5,
                                marginBottom:20,
                                alignSelf: "flex-end",
                                alignItems: "flex-end"
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.TabText,
                                    lineHeight:18,
                                    color: "#3d3f42",
                                }}
                            >{Message}</Text>
                            <Text
                                style={{
                                    ...FONTS.TabText,
                                    color: "#869cb5",
                                    marginTop: 7,
                                    fontSize: 11,
                                    fontStyle: "italic"
                                }}
                            >{Owner}: {Time}</Text>
                        </View>
    )
    
}

export default ChatCard;