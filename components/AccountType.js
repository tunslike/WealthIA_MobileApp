import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import { COLORS, FONTS, icons } from '../constants'

const AccountType = ({selected, Name, Icon, OnPress}) => {
 
    if(selected) {

        return (
            <TouchableOpacity

            style={{
                backgroundColor: COLORS.bgColor,
                padding: 9,
                borderRadius:8,
                width: "45%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
            }}
            onPress={OnPress}
         >
         <Image
         source={Icon}
         style={{
           height: 15,
           width: 15,
           resizeMode: 'cover',
           marginRight:7,
           tintColor: COLORS.fgGray
         }}
     />
            <Text
               style={{
                   color: COLORS.fgWhite,
                   ...FONTS.AccountTypeText
               }}
            >
               {Name}
            </Text>
         </TouchableOpacity>
        )

    }else{
        return (
            <TouchableOpacity
                      
                      style={{                        
                        borderWidth: 2,
                        borderColor: COLORS.bgColor,
                        borderStyle: "solid",
                        padding: 9,
                        borderRadius:8,
                        width: "45%",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                        onPress={OnPress}
                      >
                      <Image
                      source={Icon}
                      style={{
                        height: 15,
                        width: 15,
                        resizeMode: 'cover',
                        marginRight:7,
                        tintColor: COLORS.bgColor
                      }}
                  />
                         <Text
                         style={{
                            color: COLORS.bgColor,
                            ...FONTS.AccountTypeText
                        }}
                         >
                            {Name}
                         </Text>
                      </TouchableOpacity>
        )
    }
    
}

export default AccountType;