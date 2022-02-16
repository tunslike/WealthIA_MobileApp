import React from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    FlatList,
    TextInput,
    TouchableOpacity
} from 'react-native';

import { COLORS, FONTS, images, icons } from "../constants";
import { HeaderBar, UpdateField } from '../components';

const UpdateProfile = ({route, navigation}) => {

    //const { type, subCatId } = route.params

    /* Render Flatlist header */
    function renderFlatListHeader() {
        return (
            <View>
                <Text>
                    Text
                </Text>
            </View>
        )
    }
    /* End of Render flat list header */

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
        <View
        style={{
            marginTop: 40,
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
                    <UpdateField 
                        title="Old Password"
                        value="Babatunde"
                        width={100}
                        icon={icons.password}
                    />
                    <UpdateField 
                    title="New Password"
                    value="Babatunde"
                    width={100}
                    icon={icons.password}
                />

                <UpdateField 
                title="Confirm New Password"
                value="Babatunde"
                width={150}
                icon={icons.password}
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

                

            {/* Profile fields end here */}
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

export default UpdateProfile;