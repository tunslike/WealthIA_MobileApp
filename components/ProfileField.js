import React from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';

import { COLORS, FONTS, icons } from '../constants'

const ProfileField = ({title, value, icon}) => {
 
    return (
        <View
            style={{
                marginBottom:20,
                borderColor: "#A8B1DB",
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 10,
                padding:17,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"

            }}
        >
        <View>
            <Text
                style={{
                    ...FONTS.TabText,
                    fontSize: 12,
                    position: "absolute",
                    top: -25.5,
                    left: 10,
                    backgroundColor: COLORS.bgColor,
                    paddingLeft:5,
                    paddingRight:5,
                    color: "#A8B1DB"
                }}
            >
                {title}
            </Text> 
            <Text
                style={{
                    marginLeft:5,
                    ...FONTS.RegisterText,
                    color: COLORS.screenGrey,
                    fontSize:15
                }}
            >
                {value}
            </Text> 
        </View>
       
        <Image 
            source={icon}
            resizeMode="contain"
            style={{
                width: 15,
                height: 15,
                tintColor: "#A8B1DB"
            }}
        />


        </View>
    )
    
}

export default ProfileField;