import React, {useState} from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    FlatList,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Keyboard
} from 'react-native';

import axios from 'axios';

import { COLORS, FONTS, images, icons, appConfig} from "../constants";
import { HeaderBar, Loader } from '../components';


const ChangePassword = ({route, navigation}) => {

    const { clientid } = route.params
    const [currentPwd, setCurrentPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confNewPwd, setConNewPwd] = useState('');

    // SET LOADER
    const [loading, setLoading] = useState(false);

    const changePassword = () => {

        if(!currentPwd) {
            alert('Enter your current password!')
            return;
        }

        if(!newPwd) {
            alert('Enter your new password!')
            return;
        }

        if(!confNewPwd) {
            alert('Confirm your new password!')
            return;
        }

        if(newPwd != confNewPwd) {
            alert('Confirm password does  not match!')
            return;
        }


        // set loading
        setLoading(true);

        // Set Axios 
        axios
        .post(appConfig.BASE_CONFIG.base_url + 'clients/changePassword', {
        
            clientID: clientid,
            nwPwd: newPwd,
        
            Headers: {
                "content-type": "application/json",
            }
        })
        .then(function (response) {

            setLoading(false);

            if(response.status == 200) {

                try{

                    alert('Your password has been changed! Please login again')
                    navigation.replace("SignIn")

                }catch(ex){

                }   
            }

        })
        .catch(function (error) {
            setLoading(false);
            // handle error
            alert(error.message);
        });
    }

    /* Render body content*/
    function renderBodyContents() {
        return (
            <View
            style={{
                width: "100%",
                backgroundColor: COLORS.fgGray,
                borderTopLeftRadius:25,
                borderTopRightRadius: 25,
                flex:1,
                marginTop:10,
                height:300
            }}
        >   

<ScrollView>

        <View
        style={{
            marginTop: 25,
            paddingHorizontal:30,
            flexDirection: "row",
            alignItems: 'flex-start'
        }}
    >
    <Image 
    source={icons.msgicon}
    resizeMode="contain"
    style={{
        width:15,
        height:15,
        marginRight:5,
        tintColor: "#625E5E",
    }}
/>
        <Text
            style={{
                color: COLORS.fgCatHeader,
                ...FONTS.ForgotPassword,
                fontSize: 13
            }}
        >
         Enter your old and new password to change your password
        </Text>
    </View>


            {/* Profile fields starts here */}

                <View
                    style={{
                        marginHorizontal: 20,
                        marginTop:50
                    }}
                >
                    
                <View
            style={{
                marginBottom:30,
                borderColor: '#757575',
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 10,
                padding:13,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"

            }}
        >
        <View>
            <Text
                style={{
                    width:125,
                    ...FONTS.TabText,
                    fontSize: 12,
                    position: "absolute",
                    top: -21,
                    left: 10,
                    backgroundColor: COLORS.fgGray,
                    paddingLeft:5,
                    paddingRight:5,
                    color: COLORS.bgColor,
                    textAlign: 'center'
                }}
            >
                Current Password
            </Text> 
           
            <TextInput
            style={{flex: 1, height:35, textAlign: 'center', width: '120%', ...FONTS.TextInput, fontSize:14}}
            underlineColorAndroid="transparent"
            onChangeText={(currentPwd) => setCurrentPwd(currentPwd)}
             onSubmitEditing={Keyboard.dismiss}
             blurOnSubmit={false}
             secureTextEntry={true}
             underlineColorAndroid="#f000"
             returnKeyType="next"
        />

        </View>
       
        <Image 
            source={icons.pwd2}
            resizeMode="contain"
            style={{
                width: 15,
                height: 15,
                tintColor: COLORS.fgOrange
            }}
        />

        </View>

        <View
        style={{
            marginBottom:30,
            borderColor: '#757575',
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 10,
            padding:13,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"

        }}
    >
    <View>
        <Text
            style={{
                width:103,
                ...FONTS.TabText,
                fontSize: 12,
                position: "absolute",
                top: -21,
                left: 10,
                backgroundColor: COLORS.fgGray,
                paddingLeft:5,
                paddingRight:5,
                color: COLORS.bgColor,
                textAlign: 'center'
            }}
        >
            New Password
        </Text> 
       
        <TextInput
        style={{flex: 1, height:35, textAlign: 'center', width: '120%', ...FONTS.TextInput, fontSize:14}}
        underlineColorAndroid="transparent"
        onChangeText={(newPwd) => setNewPwd(newPwd)}
         onSubmitEditing={Keyboard.dismiss}
         blurOnSubmit={false}
         secureTextEntry={true}
         underlineColorAndroid="#f000"
         returnKeyType="next"
    />

    </View>
   
    <Image 
        source={icons.pwd2}
        resizeMode="contain"
        style={{
            width: 15,
            height: 15,
            tintColor: COLORS.fgOrange
        }}
    />

    </View>

    <View
    style={{
        marginBottom:30,
        borderColor: '#757575',
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 10,
        padding:13,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"

    }}
>
<View>
    <Text
        style={{
            width:160,
            ...FONTS.TabText,
            fontSize: 12,
            position: "absolute",
            top: -21,
            left: 10,
            backgroundColor: COLORS.fgGray,
            paddingLeft:5,
            paddingRight:5,
            color: COLORS.bgColor,
            textAlign: 'center'
        }}
    >
        Confirm New Password
    </Text> 
   
    <TextInput
    style={{flex: 1, height:35, textAlign: 'center', width: '120%', ...FONTS.TextInput, fontSize:14}}
    underlineColorAndroid="transparent"
    onChangeText={(confNewPwd) => setConNewPwd(confNewPwd)}
     onSubmitEditing={Keyboard.dismiss}
     blurOnSubmit={false}
     secureTextEntry={true}
     underlineColorAndroid="#f000"
     returnKeyType="next"
/>

</View>

<Image 
    source={icons.pwd2}
    resizeMode="contain"
    style={{
        width: 15,
        height: 15,
        tintColor: COLORS.fgOrange
    }}
/>

</View>


            <TouchableOpacity
            style={{
                backgroundColor: COLORS.fgOrange,
                borderRadius:15,
                padding:20,
                marginTop:10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
            }}
            onPress={changePassword}
        >
            <Text
                style={{
                    ...FONTS.ForgotPassword,
                    color: COLORS.fgWhite,
                    fontSize: 17
                }}
            >
                Change Password
            </Text>
        
        </TouchableOpacity>

                </View>
            {/* Profile fields end here */}

            </ScrollView>
        </View>
        )
    }
    /* End of Render body content*/

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
        <Loader loading={loading} />

        <View>
            <HeaderBar 
                isTitle={false}
                titleHeader="Sector"
                styles={{
                    marginTop: 30
                }}
            />
        </View>
        <View
            style={{
                marginTop: 30,
                marginBottom:30,
                paddingHorizontal:25
            }}
        >
            <Text
                style={{
                    ...FONTS.CategoryListHeader,
                    color: COLORS.fgWhite
                }}
            >
                Change Password
            </Text>
        </View>

        {renderBodyContents()}

        </View>
    )
}

export default ChangePassword;