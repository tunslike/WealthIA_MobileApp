import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import { COLORS, FONTS, icons } from '../constants'

const SectorCard = ({Name, CoySign, OnPress}) => {
 
    return (

        <TouchableOpacity
        style={{
            flexDirection: "row",
            backgroundColor: COLORS.fgWhite,
            alignItems: "center",
            marginHorizontal: 20,
            borderBottomColor: "#F1F2F6",
            borderBottomWidth:1,
            paddingBottom:15,
            paddingTop:15,
            alignItems: "center"
        }}
        onPress={OnPress}
    >
        <View
            style={{
                backgroundColor: "#ebecf2",
                width:47,
                height:49,
                borderRadius:10,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text
                style={{
                    ...FONTS.CoySigh,
                    color: "#d4d4d4",
                    fontSize: 30
                }}
            >
                {CoySign}
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
                        color: "#5E5757",
                        fontSize: 16.5,
                        marginBottom:5,
                    }               
                }
            >
                {Name}
            </Text>
        </View>
            <Image 
            source={icons.categoryArrow}
            resizeMode="contain"
            style={{
                width:20,
                height:20,
                tintColor: COLORS.fgOrange
            }}
        />
    
    </TouchableOpacity>
    )
    
}

export default SectorCard;