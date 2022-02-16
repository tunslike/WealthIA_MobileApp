import React from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    Keyboard
} from 'react-native';

import { COLORS, FONTS, icons } from '../constants'

const UpdateField = ({title, value, width, icon}) => {
 
    return (
        <View
            style={{
                marginBottom:30,
                borderColor: '#757575',
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
                    width:width,
                    ...FONTS.TabText,
                    fontSize: 12,
                    position: "absolute",
                    top: -25.5,
                    left: 10,
                    backgroundColor: COLORS.fgGray,
                    paddingLeft:5,
                    paddingRight:5,
                    color: COLORS.bgColor,
                    textAlign: 'center'
                }}
            >
                {title}
            </Text> 
           
            <TextInput
            style={{flex: 1, ...FONTS.TextInput, fontSize:13}}
            placeholder="Enter Your Password"
            underlineColorAndroid="transparent"
            onChangeText={value}
             onSubmitEditing={Keyboard.dismiss}
             blurOnSubmit={false}
             secureTextEntry={true}
             underlineColorAndroid="#f000"
             returnKeyType="next"
        />

        </View>
       
        <Image 
            source={icon}
            resizeMode="contain"
            style={{
                width: 15,
                height: 15,
                tintColor: COLORS.fgOrange
            }}
        />

        </View>
    )
    
}

export default UpdateField;