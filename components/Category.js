import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import { COLORS, FONTS, icons } from '../constants'

const Category = ({Title, Desc, image, OnPress}) => {
 
    return (

        <TouchableOpacity
            style={{
                flexDirection: "row",
                backgroundColor: COLORS.fgWhite,
                borderRadius: 15,
                alignItems: 'center',
                padding:10,
                marginBottom:15
            }}
            onPress={OnPress}
        >
            <Image 
                source={image}
                resizeMode="cover"
                style={{
                    width:125,
                    height:90,
                    borderRadius: 10
                }}
            />

            <View
                style={{
                    flex:1,
                    paddingHorizontal: 15
                }}
            >
                <Text
                    style={
                        {
                            flex:1,
                            ...FONTS.CategoryText,
                            color: COLORS.fgCatTitle,
                            fontSize: 19,
                            paddingTop:2

                        }               
                    }
                >
                    {Title}
                </Text>
                <Text
                    style={{
                        color: COLORS.fgTabColor,
                        ...FONTS.greetingText,
                        fontSize:13,
                        paddingBottom:7
                    }}
                >
                    {Desc}
                </Text>
            </View>
            <Image 
                source={icons.categoryArrow}
                resizeMode="contain"
                style={{
                    width:24,
                    height:24
                }}
            />
          
        </TouchableOpacity>
    )
    
}

export default Category;