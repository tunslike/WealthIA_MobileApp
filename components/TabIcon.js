import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

import { COLORS, FONTS } from '../constants'

const TabIcon = ({icon, iconStyle, focused, label }) => {
 
    return (
        <View
            style={{
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Image 
                source={icon}
                resizeMode="contain"
                style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? COLORS.bgColor : COLORS.fgTabColor,
                    marginBottom: 5,
                    ...iconStyle
                }}
            />
            <Text
                style={{
                    color: focused ? COLORS.bgColor : COLORS.fgTabColor,
                    ...FONTS.TabText
                }}
            >
                {label}
            </Text>
        </View>
    )
    
}

export default TabIcon;