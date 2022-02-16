import React from 'react';
import {
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';

import { COLORS,icons, FONTS } from '../constants'

const LogoutButton = ({onPress}) => {
 
    return (
        <TouchableOpacity
            style={{
                position: 'absolute',
                width: 55,
                height: 55,
                alignItems: 'center',
                justifyContent: 'center',
                right: 30,
                bottom: 20,
                backgroundColor: COLORS.fgOrange,
                borderRadius: 55

            }}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Image 
                source={icons.logout2}
                resizeMode="contain"
                style={{
                    height: 35,
                    width: 35,
                    tintColor: COLORS.fgWhite
                }}
            />

        </TouchableOpacity>
    )
    
}

export default LogoutButton;
