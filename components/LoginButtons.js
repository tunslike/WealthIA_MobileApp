import React from 'react';
import {
    TouchableOpacity,
    Text,
} from 'react-native';

import { COLORS, FONTS } from '../constants'

const LoginButtons = ({buttonText, buttonContainerStyle, buttonTextColor, onPress}) => {
 
    return (
        <TouchableOpacity
            style={{
                ...buttonContainerStyle
            }}
            onPress={onPress}
            activeOpacity={0.5}
        >
            <Text
                style={{
                    textAlign: "center",
                    color: buttonTextColor,
                    ...FONTS.loginButtonText
                }}
            >
                {buttonText}
            </Text>
        </TouchableOpacity>
    )
    
}

export default LoginButtons;
