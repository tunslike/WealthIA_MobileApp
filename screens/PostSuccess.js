import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    Image
} from 'react-native';

import { COLORS, FONTS, icons, images } from "../constants";

const PostSuccess = ({route, navigation}) => {

    const { type } = route.params

    return (
        <View
        
        style={{
            flex:1,
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: COLORS.bgColor,
            height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
          }}
        >
        <StatusBar backgroundColor={COLORS.bgColor} barStyle="light-content" />


        <View
           style={{
               paddingHorizontal: 35,
               alignItems: "center"
           }}
        >
        <View
          style={{
              backgroundColor: COLORS.fgWhite,
              alignContent: "center",
              alignItems: "center",
              padding: 10,
              borderRadius: 50,
              width: 120,
              height: 120,
              marginBottom: 60
          }}
        >
            <Image 
                    source={icons.success_icon}
                    resizeMode="contain"
                    style={{
                        width: 100,
                        height: 100
                    }}
            />
                   
        </View>
        <Text
        style={{
            ...FONTS.CategoryListHeader,
            fontSize: 19,
            textAlign: "center",
            lineHeight: 25,
            color: COLORS.fgGray
        }}
    >
    Your message has been posted successfully!
    </Text>

    {type == 'provider' &&
        <Text
            style={{
                ...FONTS.CategoryListHeader,
                fontSize: 16,
                textAlign: "center",
                lineHeight: 25,
                marginTop:30,
                color: "#BCC6F0"
            }}
        >
            The provider will provide a response to your message soon.
            Please check your messages later
        </Text>
    }

    {type != 'provider' &&
        <Text
            style={{
                ...FONTS.CategoryListHeader,
                fontSize: 16,
                textAlign: "center",
                lineHeight: 25,
                marginTop:30,
                color: "#BCC6F0"
            }}
        >
        Connected providers will provide a response to your message soon.
        Please check your messages later
        </Text>
    }

    <TouchableOpacity
        style={{
            backgroundColor: COLORS.fgOrange,
            padding: 18,
            width: "100%",
            borderRadius: 10,
            marginTop: 90,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center"
        }}
        onPress={() => navigation.navigate("Home")}
    >
        <Text
            style={{
                ...FONTS.CategoryListHeader,
                fontSize: 16,
                color: COLORS.fgWhite
            }}
        >
            Completed
        </Text>
        <Image 
            source={icons.thumbsup}
            resizeMode="cover"
            style={{
                width: 20,
                height: 20,
                tintColor: COLORS.fgWhite,
                marginBottom:5,
                marginLeft: 5
            }}
        />
    </TouchableOpacity>

        </View>
        </View>
    )
}

export default PostSuccess;