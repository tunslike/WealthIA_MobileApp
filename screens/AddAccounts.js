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

import { COLORS, FONTS, images, icons } from "../constants";
import { HeaderBar, Loader, appConfig } from '../components';


const AddAccounts = ({route, navigation}) => {

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
        .post('http://134.122.106.24/api/v1/clients/changePassword', {
        
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
         Enter details below to add account on your company profile
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
                padding:17,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"

            }}
        >
        <View>
            <Text
                style={{
                    width:70,
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
                Last Name
            </Text> 
           
            <TextInput
            style={{flex: 1, ...FONTS.TextInput, fontSize:13}}
            placeholder="Enter Last Name"
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
            source={icons.profile}
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
            padding:17,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"

        }}
    >
    <View>
        <Text
            style={{
                width:75,
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
            First Name
        </Text> 
       
        <TextInput
        style={{flex: 1, ...FONTS.TextInput, fontSize:13}}
        placeholder="Enter First Password"
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
        source={icons.userIconProfile}
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
        padding:17,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"

    }}
>
<View>
    <Text
        style={{
            width:50,
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
        Email
    </Text> 
   
    <TextInput
    style={{flex: 1, ...FONTS.TextInput, fontSize:13}}
    placeholder="Enter Email"
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
    source={icons.mail}
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
        padding:17,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"

    }}
>
<View>
    <Text
        style={{
            width:50,
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
        Phone
    </Text> 
   
    <TextInput
    style={{flex: 1, ...FONTS.TextInput, fontSize:13}}
    placeholder="Enter Phone"
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
    source={icons.phone}
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
                Add Account
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
                Add Accounts
            </Text>
        </View>

        {renderBodyContents()}

        </View>
    )
}

export default AddAccounts;