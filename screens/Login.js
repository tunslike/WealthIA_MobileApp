import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    StatusBar,
    Image
} from 'react-native';

import { COLORS, FONTS, images } from "../constants";
import { LoginButtons} from '../components';


const Login = ({ navigation }) => {

    {/* renderHeader function */}
    function renderHeader () {
        return (
            <View
            style={{
                height: "55%",
                justifyContent: "flex-end",
                paddingHorizontal: 20
            }}
        >

       
                    <View
                    style={{
                        alignItems: 'flex-end',
                        marginBottom:140,
                        marginHorizontal:30
                    }}
                >
                    <Image 
                        source={images.whiteLogo}
                        resizeMode="contain"
                        style={{
                            width:100,
                            height:100,
                        }}
                    />
                </View>

                    <Text
                        style={{
                            width: "75%",
                            color: COLORS.fgWhite,
                            ...FONTS.loginTitle,
                            lineHeight: 53,
                        }}
                    >
                        Welcome to Wealthia
                    </Text>
        
        </View>
        )
    }
    {/* end of renderHeader function */}

    {/* renderDetails function */}
    function renderDetails () {
        return (
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 20
                }}
            >
                <Text
                    style={{
                        width: "90%",
                        color: COLORS.fgButtonBorder,
                        ...FONTS.loginSubTitle,
                        lineHeight: 25,
                        marginTop: 19,
                        fontSize:18
                    }}
                >
                Experience a tailored financial advisory services
                </Text>

                {/* Login Buttons */}
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center"
                    }}
                >

                    {/* Sign In Buttons */}
                    <LoginButtons 
                        buttonContainerStyle={{
                            paddingVertical: 25,
                            borderRadius: 10,
                            backgroundColor: COLORS.screenGrey,
                            color: COLORS.fgDarkGrey
                        }}
                        buttonText="Sign In"
                        buttonTextColor={COLORS.fgDarkGrey}
                        onPress={() => navigation.replace("SignIn")}
                    />

                    {/* Get Started Button */}
                    <LoginButtons 
                    buttonContainerStyle={{
                        paddingVertical: 25,
                        borderRadius: 10,
                        backgroundColor: COLORS.fgOrange,
                        marginTop:13
                    }}
                    buttonText="Get Started here"
                    buttonTextColor={COLORS.fgWhite}
                    onPress={() => navigation.replace("SignUp")}
                />
                    
                </View>

            </View>
        )
    }
    {/* end renderDetails function */}

    return (
        <View
            style={{
                flex:1,
                backgroundColor: COLORS.bgColor
            }}
        >
        <StatusBar backgroundColor={COLORS.bgColor} barStyle="light-content" />

        <ImageBackground
        source={images.loginBG}
        resizeMode=  'cover'
        style={{
            flex:1,
            justifyContent: 'flex-end'
        }}
    >

            {/* Header Section */}
            {renderHeader()}
        
            {/* Details Section */}
            {renderDetails()}

            </ImageBackground>
            
        </View>
    )
}

export default Login;
