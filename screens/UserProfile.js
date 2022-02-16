import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';

import axios from 'axios';

import { COLORS, FONTS, images, icons, appConfig } from "../constants";
import { ProfileField, SettingCard, Loader, LogoutButton } from '../components';

const UserProfile = ({route, navigation}) => {


    // GET PARAMS
    const { clientid } = route.params

    // STATES
    const [profile, setProfile] = useState('');
    const [loading, setLoading] = useState(false);

     //USE EFFECT
     useEffect(() => {
        
        //load sub categories
        this.loadClientProfile();

    }, []);

    //logout app
    logoutApp = () => {
        navigation.replace("SignIn");
    }

    //FUNTION TO LOAD SUB CATEGORIES
  loadClientProfile = () => {

    setLoading(true);

        //Call Axios
          axios
            .get(appConfig.BASE_CONFIG.base_url + 'clients/fetchClientDetails/'+clientid, 
            {
                Headers: {
                    "content-type": "application/json",
                }
            })
            .then(function (response) {

              setLoading(false);

                if(response.status == 200) {

                    try{

                      //set sub List Data
                      setProfile(response.data)

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

    /* Render body contents */
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
                    paddingBottom:50,
                }}
            >
                <View
                    style={{
                        marginTop:15,
                        paddingHorizontal:30
                    }}
                >   
                        <Text
                        style={{
                            color: COLORS.fgCatHeader,
                            ...FONTS.loginPageTextDesc,
                            fontSize:15
                        }}
                    >
                        Settings
                    </Text>
                </View>

                <View
                style={{
                    backgroundColor: COLORS.fgWhite,
                    borderRadius: 10,
                    paddingTop:10,
                    paddingBottom:20,
                    marginTop: 10,
                    marginHorizontal: 20,
                }}
            >
            {/*
                <SettingCard 
                    title="Update Profile"
                    titleSign="U"
                    OnPress={() => navigation.navigate("UpdateProfile")}
                /> */
            }
                <SettingCard 
                    title="Change Password"
                    titleSign="C"
                    OnPress={() => navigation.navigate("ChangePassword", {clientid: clientid})}
                />

                {profile.TYPE == "Company" &&
                    <SettingCard 
                    title="Add Accounts"
                    titleSign="A"
                    OnPress={() => navigation.navigate("AddAccounts", {clientid: clientid})}
                    />
                }

               

            </View>

            <View
                style={{
                    marginTop:10,
                    marginHorizontal:30,
                }}
            >
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
                    onPress={logoutApp}
                >
                    <Text
                        style={{
                            ...FONTS.ForgotPassword,
                            color: COLORS.fgWhite,
                            fontSize: 17
                        }}
                    >
                        Logout
                    </Text>
                    <Image 
                        source={icons.logout2}
                        resizeMode="contain"
                        style={{
                            width:20,
                            height: 20,
                            tintColor: COLORS.fgWhite,
                            marginLeft:10
                        }}
                    />
                </TouchableOpacity>
            </View>

            </View>
        )
    }
    /* End of render body contents */

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

        <View
            style={{
                paddingHorizontal: 20,
                flexDirection: "row",
                marginTop:40,
                alignItems: "center",
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
                    <Text
                        style={{
                            ...FONTS.CategoryText,
                            fontSize: 18,
                            marginLeft: 20,
                            color: COLORS.fgGray
                        }}
                    >
                    Profile
            </Text>
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
                backgroundColor: COLORS.fgOrange,
                padding:8,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center"
            }}
        
        >
            <Image 
            style={{
                width:25,
                height:25,
                tintColor: COLORS.fgWhite
            }}
            source={icons.logout2}
            resizeMode="contain"
            /> 
           
        </TouchableOpacity>  
            </View>
       </View>
       <ScrollView>
       <View
            style={{
                alignItems: "center"
            }}
       >
            <View
                style={{
                    backgroundColor: COLORS.fgGray,
                    borderRadius: 70,
                    height:80,
                    width:82,
                    justifyContent:"center",
                    alignItems: "center"
                }}
            >
                <Image 
                source={icons.userIconProfile}
                resizeMode="contain"
                style={{
                    width: 79,
                    height: 59
                }}
            />
            </View>
            
            {/* User Profile Field */}
            <View
                style={{
                    marginHorizontal: 30,
                    marginTop: 20,
                    marginBottom:30
                }}
            >
            <Text
                style={{
                    ...FONTS.RegisterText,
                    fontSize: 13,
                    color: "#CACEDF"
                }}
            >
                Username: {profile.USER_ID}
            </Text>
            </View>
       </View>
       
       <View
         style={{
             marginHorizontal: 30
         }}
       >
            <ProfileField 
                title="Full Name"
                value={profile.FIRST_NAME + ' ' + profile.LAST_NAME}
                icon={icons.name}
            />
            <ProfileField 
                title="Email"
                value={profile.EMAIL}
                icon={icons.mail}
            />
            <ProfileField 
                title="Account"
                value={profile.TYPE}
                icon={icons.type}
            />
            <ProfileField 
                title="Phone"
                value={profile.MOBILE_PHONE}
                icon={icons.phone}
            />
            <ProfileField 
                title="State"
                value="Lagos"
                icon={icons.location}
            />
       </View>
       

            {renderBodyContents()}

            </ScrollView>  
        </View>
    )
}

export default UserProfile;