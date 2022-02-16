import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image
} from 'react-native';

import { useNavigation } from '@react-navigation/native'

import { COLORS, FONTS, images, icons } from "../constants";

const HeaderBar = ({isTitle, titleHeader, clientid, styles}) => {

    const navigation = useNavigation();
    
    return (
       <View
            style={{
                paddingHorizontal: 20,
                flexDirection: "row",
                marginTop:20,
                alignItems: "center",
                ...styles
            }}
       >
            <View
                style= {{
                    flex:1,
                    alignItems: "flex-start"
                }}
            >
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image 
                        source={icons.backarrow}
                        resizeMode="contain"
                        style={{
                            width:20,
                            height: 20,
                            tintColor: COLORS.fgGray
                            
                        }}
                    />

                    {isTitle && 
                        <Text
                        style={{
                            ...FONTS.CategoryText,
                            color: COLORS.fgButtonBorder,
                            marginLeft:20,
                            fontSize: 18
                        }}
                    >   
                        {titleHeader}
                    </Text>
                    }

                </TouchableOpacity>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "flex-end"
                }}
            >
            <TouchableOpacity
            style={{
                width:35,
                height:35,
                alignItems: "center",
                justifyContent: "center"
            }}
        
        >
            <Image 
                style={{
                    width:30,
                    height:30,
                    tintColor: COLORS.screenGrey
                }}
                source={icons.alert}
                resizeMode="contain"
            />
        </TouchableOpacity>  
        <TouchableOpacity
        style={{
            width:35,
            height:35,
            marginLeft:10,
            alignItems: "center",
            justifyContent: "center",
            
        }}
        onPress={() => navigation.navigate("UserProfile",{clientid: clientid} )}
    >
        <Image 
            style={{
                width:26,
                height:26,
                tintColor: COLORS.screenGrey
            }}
            source={icons.profile}
            resizeMode="contain"
        />
    </TouchableOpacity>  
            </View>
       </View>
    )
}

export default HeaderBar;