import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    SafeAreaView,
    StatusBar
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {  useSelector, useDispatch} from 'react-redux'

import { COLORS, FONTS, images, icons } from "../constants";

import { Category, LogoutButton } from "../components";

const Home = ({ navigation}) => {

    const { clientname } = useSelector(state => state.clientReducer)

    // STATES
    const [greetings, setGreetings] = useState('');
    const [firstname, setFirstname] = useState('');
    const [clientid, setClientID] = useState('');
    const [subCategoryID, setSubCategoryID] = useState('');
    const [accountType, setAccountType] = useState('');
    const [providerID, setProviderID] = useState('');
    const [sector, setSector] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyStatus, setCompanyStatus] = useState(null);
    const [messageCount, setMessageCount] = useState('0');
    const [connectionCount, setConnectionCount] = useState('0');


    //USE EFFECT
    useEffect(() => {
        
        //load sub categories
        this.fetchUserDetails();

        //check greetings
        this.checkTimeGreetings();

        //check company account
        this.checkCompanyAccount();

    }, []);

    //check time
    checkTimeGreetings = () => {

        var today = new Date()
        var curHr = today.getHours()
        
        if (curHr < 12) {
          setGreetings('Good Morning')
        } else if (curHr < 18) {
          setGreetings('Good Afternoon')
        } else {
          setGreetings('Good Evening')
        }
    }

    //logout app
    LogoutApp = () => {
        alert('Logged out successfully!')
        navigation.replace("SignIn");
        return;
    }

    // check company user
    checkCompanyAccount = () => {
        if(accountType == 'Company' && providerID == null) {
            setCompanyStatus(false)
        }
    }

    //get user details
    fetchUserDetails = async () => {
        
        let firstname = await AsyncStorage.getItem('firstname');
        let clientid = await AsyncStorage.getItem('clientid');
        let accountType = await AsyncStorage.getItem('accountType');
        let providerid = await AsyncStorage.getItem('providerID');
        let companyName = await AsyncStorage.getItem('company');
        let subCategoryID = await AsyncStorage.getItem('SubCategoryID');
        let msgCount = await AsyncStorage.getItem('msgCount');
        let connection = await AsyncStorage.getItem('connection');
        let sector = await AsyncStorage.getItem('sector');
        
        setFirstname(firstname)
        setClientID(clientid)
        setAccountType(accountType)
        setProviderID(providerid)
        setCompanyName(companyName)
        setCompanyName(companyName)
        setSubCategoryID(subCategoryID)
        setMessageCount(msgCount)
        setConnectionCount(connection)
        setSector(sector)
    }

     //truncate strings 
     function TruncateString (message) {
        if (message.length > 10) {
            return ' ' + message.substring(0, 10) + "...";
        }else{
            return ' ' + message;
        }
    }
    //end of truncate string

    //truncate strings 
    function TruncateCompanyName (message) {

        if(!message)
        return;

            if (message.length > 20) {
                return message.substring(0, 20) + "...";
            }else{
                return message;
            }
    }
    //end of truncate string

    /* Header Component */
        function ShowHeader() {
            return (
                <View
                    style={{
                        width: "100%",
                        backgroundColor: COLORS.bgColor,
                        height: 250
                    }}
                >
                    <View
                        style={{
                            marginTop:30,
                            flexDirection: "row",
                            paddingHorizontal: 20,
                            justifyContent: "space-between"
                        }}
                    >

                        <View>
                            <Text
                                style={{
                                    ...FONTS.welcomeText,
                                    color: COLORS.fgWhite
                                }}
                            >Hi, 
                             {accountType == 'Individual' &&
                                ' ' +firstname
                            }

                            {accountType == 'Company' &&
                                TruncateString(firstname)
                            }
                            
                            </Text>
                            <Text
                                style= {{
                                    marginTop: 5,
                                    ...FONTS.greetingText,
                                    color: COLORS.screenGrey
                                }}
                            >{greetings}</Text>
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
                            onPress={() => navigation.navigate("UserProfile", {clientid: clientid})}
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


                     {/* CONNECTIONS */}
                {accountType == 'Individual' &&
                     <View
                        style={{
                            marginTop: 53,
                            alignContent: "center",
                            justifyContent: "center"
                        }}
                    >   
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Image 
                            source={icons.portfolio}
                            resizeMode="contain"
                            style={{
                                width:19,
                                height:19,
                                marginBottom:3,
                                tintColor: COLORS.screenGrey,
                            }}
                        />
                        <Text
                            style={{
                                ...FONTS.AccountTypeText,
                                color: COLORS.screenGrey,
                                marginLeft:5,
                            }}
                        >
                        {(connectionCount == 1) && 
                    
                            connectionCount + ' Connection'
                        }

                        {(connectionCount > 1) && 
                            
                            connectionCount + ' Connections'
                            
                        }

                    </Text>
                </View>
            </View>
            }

            {accountType == 'Company' &&
                <View
                    style={{
                        paddingHorizontal: 20,
                        marginTop: 40,
                        flexDirection: "row",
                        alignItems: 'center',
                        justifyContent: "space-between"
                    }}
                >
                    <View
                        style={{
                            paddingBottom: 15,
                        }}
                    >
                    <Text
                        style={{
                            color: "#A8B1DB",
                            ...FONTS.greetingText,
                            fontSize:12
                        }}
                    >
                        Company  | {' ' + sector}
                    </Text>
                    <Text
                        style={{
                            ...FONTS.ForgotPassword,
                            fontSize:13,
                            color: "#BCC6F0"
                        }}
                    >
                        {TruncateCompanyName(companyName)}
                    </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                    >
                            <Image 
                                source={icons.portfolio}
                                resizeMode="contain"
                                style={{
                                    width:17,
                                    height:17,
                                    tintColor: COLORS.screenGrey,
                                    marginBottom:3
                                }}
                            />
                            <Text
                                style={{
                                    ...FONTS.AccountTypeText,
                                    fontSize: 14,
                                    color: COLORS.screenGrey,
                                    marginLeft:5,
                                }}
                            >
                            13 Connections
                        </Text>
                    </View>

                </View>
            }

                </View>
            )
        }
    /* End of Header Component */

    /* Show Message Notification */
    function showMessageNotification() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    paddingVertical: 19,
                    backgroundColor: COLORS.fgOrange,
                    borderRadius: 18,
                    marginHorizontal:20,
                    marginTop:20,
                    height:60,
                    alignItems: "center",
                    justifyContent: "center"
                }}
                onPress={() => navigation.navigate("Message", {clientid: clientid})}
            >
                <Image 
                    source={icons.chat}
                    resizeMode="contain"
                    style={{
                        width:20,
                        height:20,
                        tintColor: COLORS.fgWhite
                    }}
                />
                <View
                    style={{
                        marginLeft:10,
                        flex:1,
                    }}
                >
                <Text
                    style={{
                        color: COLORS.fgWhite,
                        ...FONTS.loginPageTextDesc,
                        fontSize:16
                    }}
                >
                You have new messages
                </Text>
                </View>
                <View
                    style={{
                        backgroundColor: COLORS.fgGray,
                        width:27,
                        height:27,
                        borderRadius:50,
                        alignItems: "center",
                        justifyContent: "center"
                        
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.loginPageTextDesc,
                            fontSize: 15,
                            color: COLORS.bgColor
                        }}
                    >
                        {messageCount}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    /* End Show Message Notification */

    /* Show Category Items */
    function showCategoryItems () {
        return (
            <View
                style={{
                    marginTop: 40,
                    paddingHorizontal:20
                }}
            >
                <Text
                    style={{
                        color: COLORS.fgCatHeader,
                        ...FONTS.loginPageTextDesc,
                        fontSize:16,
                        marginLeft:10
                    }}
                >
                    Categories
                </Text>
                
                <View
                    style={{
                        marginTop:15
                    }}
                >
                    <Category 
                        Title="Enquiries"
                        Desc = "Get prompt response on your enquries"
                        image={images.enquiry}
                        OnPress={() => (accountType == 'Individual') ? navigation.navigate("CategoryList", {type: "1", categoryid: "83f06d77-7b97-4fff-81c3-2128d9becad3"}) : navigation.navigate("ProviderMessage", {providerID : providerID, type: 'enquiry', subCategoryid: subCategoryID})}
                    />
                    <Category 
                        Title="Providers"
                        Desc = "Connect directly with providers"
                        image={images.provider}
                        OnPress={() => (accountType == 'Individual') ?  navigation.navigate("CategoryList", {type : "2", categoryid: "263500573-c541-449e-ad9c-f676bc1c07a6"}) : navigation.navigate("ProviderMessage", {providerID : providerID, type: 'provider', subCategoryid: subCategoryID})}
                    />
                </View>
            </View>
        )
    }
    /* End Show Category Items */

    /* Show Connection Component */
    function renderBodyContents() {
        return (
            <View
                style={{
                    width: "100%",
                    backgroundColor: COLORS.fgGray,
                    borderTopLeftRadius:25,
                    borderTopRightRadius: 25,
                    flex:1,
                    marginTop:-80,
                    height:300
                }}
            >
                {/* Render Message Notification */}

                    {showMessageNotification()}

                {/* End of render message notification */}

                {/* Show Company status */}
                    {companyStatus == false &&
                        <TouchableOpacity
                            style={{
                                marginHorizontal:20,
                                marginTop: 10,
                                backgroundColor: COLORS.fgWhite,
                                borderRadius: 10,
                                padding:8,
                                borderColor: '#eb4034',
                                borderStyle: "solid",
                                borderWidth: 1,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Image 
                                source={icons.info}
                                resizeMode="contain"
                                style={{
                                    height:20, width: 20,
                                    tintColor: '#eb4034',
                                    marginRight: 7,
                                }}
                            />
                            <Text
                                style={{
                                    ...FONTS.TabText,
                                    fontSize: 13,
                                    color: "#eb4034"
                                }}
                            >
                                Your company setup is incomplete, tap here!
                            </Text>
                        </TouchableOpacity>
                    }
                {/* End of Show Company status */}

                {/* Render Category */}

                {showCategoryItems()}

                {/* End of render Category notification */}

                
                {/* Logout Button */}
                <TouchableOpacity
                style={{
                    position: 'absolute',
                    width: 55,
                    height: 55,
                    alignItems: 'center',
                    justifyContent: 'center',
                    right: 30,
                    bottom: 20,
                    backgroundColor: COLORS.fgOrange,
                    borderRadius: 55
    
                }}
                onPress={LogoutApp}
                activeOpacity={0.7}
            >
                <Image 
                    source={icons.logout2}
                    resizeMode="contain"
                    style={{
                        height: 35,
                        width: 35,
                        tintColor: COLORS.fgWhite
                    }}
                />
    
            </TouchableOpacity>
            {/* Logout Button */}

            </View>
        )
    }
    /* End Show Connection Component */

    return (
        <SafeAreaView
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
                    flex:1,
                }}
            >
                {ShowHeader()}
                {renderBodyContents()}
            </View>
        </SafeAreaView>
    )
}

export default Home
