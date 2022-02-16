import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import { COLORS, FONTS, icons } from '../constants'

const CategoryListCard = ({Name, OnPress}) => {
 
    return (

        <TouchableOpacity
            style={{
                flexDirection: "row",
                height: 70,
                borderRadius: 15,
                alignItems: 'center',
                padding:10,
                marginBottom:19,
                borderWidth:1.5,
                borderStyle: "solid",
                alignItems: "center",
                borderColor: COLORS.fgButtonBorder,
                marginHorizontal: 20
                
                
            }}
            onPress={OnPress}
        >
            <Image 
                source={icons.stop}
                resizeMode="cover"
                style={{
                    width:30,
                    height:30
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
                            ...FONTS.CategoryText,
                            color: COLORS.fgWhite,
                            fontSize: 19,
        
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
                    marginRight:15
                }}
            />
          
        </TouchableOpacity>
    )
    
}

export default CategoryListCard;