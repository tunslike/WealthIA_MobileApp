import React,{ useState, useEffect, createRef}  from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  SafeAreaView,
  TouchableWithoutFeedback,
  Modal,
  FlatList
} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS, FONTS, icons, images, appConfig } from "../constants";
import { LoginButtons, AccountType, Loader} from '../components';

const stateList = [
    {
      id: 'Lagos',
      title: 'Lagos',
    },
    {
        id: 'Abuja',
        title: 'Abuja',
    },
    {
        id: 'Port-Harcourt',
        title: 'Port-Harcourt',
    },
    {
        id: 'Abia',
        title: 'Abia',
    },
    {
        id: 'Adamawa',
        title: 'Adamawa',
    },
    {
        id: 'Akwa Ibom',
        title: 'Akwa Ibom',
    },
    {
        id: 'Anambra',
        title: 'Anambra',
    },
    {
        id: 'Bauchi',
        title: 'Bauchi',
    },
    {
        id: 'Bayelsa',
        title: 'Bayelsa',
    },
    {
        id: 'Benue',
        title: 'Benue',
    },
    {
        id: 'Borno',
        title: 'Borno',
    },
    {
        id: 'Cross River',
        title: 'Cross River',
    },
    {
        id: 'Delta',
        title: 'Delta',
    },
    {
        id: 'Ebonyi',
        title: 'Ebonyi',
    },
    {
        id: 'Edo',
        title: 'Edo',
    },
    {
        id: 'Ekiti',
        title: 'Ekiti',
    },
  ];

const SignUp = ({ navigation }) => {

    //STATES
    const [accountType, setAccountType] = useState('Individual');
    const [modalVisible, setModalVisible] = useState(false);
    const [sectorModal, setSectorModalVisible] = useState(false);

    const [sectorData, setSectorData] = useState('');
    
    // STATES Individual
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [state, setState] = useState('Select State');

    const firstnameRef = createRef();

    // STATES Company
    const [company, setCompany] = useState('');
    const [sector, setSector] = useState('Select Sector');
    const [contactName, setContactName] = useState('');

    // SET LOADER
    const [loading, setLoading] = useState(false);

    //USE EFFECT
    useEffect(() => {
        
        //load sectors
        this.loadSectors();
        
    }, []);
    // END OF USE EFFECT

    //FUNCTION TO LOAD SECTORS
    loadSectors = () => {

        //Call Axios
          axios
            .get(appConfig.BASE_CONFIG.base_url + 'clients/loadSectors', 
            {
                Headers: {
                    "content-type": "application/json",
                }
            })
            .then(function (response) {

                if(response.status == 200) {

                    try{

                      //set sub List Data
                      setSectorData(response.data)

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
    //END OF FUNCTION

    //FUNTION TO REGISTER INDIVIDUAL
    registerCompanyClient = () => {

        // CHECK ALL FIELDS
        if(company.trim() == '' || sector.trim() == '' || contactName.trim() == '' || 
        email.trim() == '' || phone.trim() == '' || state.trim() == '') {

            alert('All fields are compulsory!')
            return;
        }

        // set loading
        setLoading(true);

        // Set Axios 
        axios
            .post(appConfig.BASE_CONFIG.base_url + 'clients/registerCompany', {

                company_name: company,
                sector: sector,
                contactName: contactName,
                email: email,
                mobile: phone,
                client_type: accountType,
                state: state,

                Headers: {
                    "content-type": "application/json",
                }
            })
            .then(function (response) {

                setLoading(false);

                if(response.status == 201) {

                    try{

                        setFirstname('')
                        setLastname('')
                        setPhone('')
                        setEmail('')

                        alert('Registering was successful!')

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
    //END OF FUNCTION

    //FUNTION TO REGISTER INDIVIDUAL
    registerIndividualClient = () => {


        // CHECK ALL FIELDS
        if(firstname.trim() == '' || lastname.trim() == '' || email.trim() == '' || phone.trim() == '') {
            alert('All fields are compulsory!')
            return;
        }

        // set loading
        setLoading(true);

        // Set Axios 
        axios
            .post(appConfig.BASE_CONFIG.base_url + 'clients/registerClient', {

                first_name: firstname,
                last_name: lastname,
                email: email,
                mobile: phone,
                client_type: accountType,
                state: state,

                Headers: {
                    "content-type": "application/json",
                }
            })
            .then(function (response) {

                setLoading(false);

                if(response.status == 201) {

                    try{

                        setFirstname('')
                        setLastname('')
                        setPhone('')
                        setEmail('')

                        alert('Registering was successful!')

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
    //END OF FUNCTION

    // render individual account
    function renderIndividualAccount() {
        return (
            <View
                         style={{
                             alignContent: "center",                             
                             backgroundColor: COLORS.fgWhite,
                             borderRadius: 10,
                             padding: 5,
                             marginLeft:20,
                             marginRight:20,
                             marginTop:20,
                             marginBottom:10,
                         }}
                    >
                        <View
                         style={styles.sectionStyle}
                        >
                        <Image
                        source={icons.userIconProfile}
                        style={{
                            width:18,
                            height:18,
                            marginLeft:10,
                            marginRight:13,
                            tintColor: COLORS.fgOrange
                        }}
                    />
                        <TextInput
                            ref={firstnameRef}
                            style={{flex: 1, ...FONTS.TextInput, fontSize:14}}
                            placeholder="Enter First Name"
                            onChangeText={(firstname) => setFirstname(firstname)}
                            placeholderTextColor = {COLORS.fgDarkGrey}
                            underlineColorAndroid="transparent"
                        />
                        </View>
                        
                        <View
                         style={styles.sectionStyle}
                        >
                        <Image
                        source={icons.profile}
                        style={{
                            width:18,
                            height:18,
                            marginLeft:10,
                            marginRight:13,
                            tintColor: COLORS.fgOrange
                        }}
                    />
                        <TextInput
                            style={{flex: 1, ...FONTS.TextInput, fontSize:14}}
                            placeholder="Enter Last Name"
                            onChangeText={(lastname) => setLastname(lastname)}
                            placeholderTextColor = {COLORS.fgDarkGrey}
                            underlineColorAndroid="transparent"
                        />
                        </View>
                        
                        <View
                        style={styles.sectionStyle}
                       >
                       <Image
                       source={icons.mail}
                       style={{
                          width:18,
                          height:18,
                          marginLeft:10,
                          marginRight:13,
                          tintColor: COLORS.fgOrange
                      }}
                   />
                       <TextInput
                           style={{flex: 1, ...FONTS.TextInput, fontSize:14}}
                           placeholder="Enter Email"
                           onChangeText={(email) => setEmail(email)}
                           placeholderTextColor = {COLORS.fgDarkGrey}
                           underlineColorAndroid="transparent"
                       />
                       </View> 
                       <View
                       style={styles.sectionStyle}
                      >
                          <Image
                          source={images.phone}
                          style={styles.imageStyle}
                      />
                      <TextInput
                          style={{flex: 1, ...FONTS.TextInput, fontSize:14}}
                          placeholder="Enter Phone"
                          onChangeText={(phone) => setPhone(phone)}
                          placeholderTextColor = {COLORS.fgDarkGrey}
                          underlineColorAndroid="transparent"
                      />
                      </View> 

                      <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                      >
                        <View
                            style={styles.sectionStyle}
                        >
                        <Image
                            source={icons.location}
                            style={{
                            width:18,
                            height:18,
                            marginLeft:10,
                            marginRight:13,
                            tintColor: COLORS.fgOrange
                        }}
                        />
                        <Text
                        style={{
                            ...FONTS.TextInput, fontSize: 14, color: COLORS.fgDarkGrey,
                            flex: 1,
                        }}
                        >
                        {state}
                        </Text>
                        </View>

                      </TouchableOpacity>
                       
                    </View>
        )
    }

    // render company account
    function renderCompanyAccount() {
        return (
            <View
                         style={{
                             alignContent: "center",                             
                             backgroundColor: COLORS.fgWhite,
                             borderRadius: 10,
                             padding: 5,
                             marginLeft:20,
                             marginRight:20,
                             marginTop:20,
                             marginBottom:10,
                         }}
                    >
                        <View
                         style={styles.sectionStyle}
                        >
                            <Image
                            source={icons.portfolio}
                            style={{
                                width:18,
                                height:18,
                                marginLeft:10,
                                marginRight:13,
                                tintColor: COLORS.fgOrange
                            }}
                        />
                        <TextInput
                            style={{flex: 1, ...FONTS.TextInput, fontSize:15}}
                            placeholder="Company Name"
                            onChangeText={(company) => setCompany(company)}
                            placeholderTextColor = {COLORS.fgDarkGrey}
                            underlineColorAndroid="transparent"
                        />
                        </View> 
                        
                        <TouchableOpacity
                     onPress={() => setSectorModalVisible(true)}
                   >
                     <View
                         style={styles.sectionStyle}
                     >
                     <Image
                         source={icons.location}
                         style={{
                         width:18,
                         height:18,
                         marginLeft:10,
                         marginRight:13,
                         tintColor: COLORS.fgOrange
                     }}
                     />
                     <Text
                     style={{
                         ...FONTS.TextInput, fontSize: 14, color: COLORS.fgDarkGrey,
                         flex: 1,
                     }}
                     >
                     {sector}
                     </Text>
                     </View>

                   </TouchableOpacity>
                       <View
                       style={styles.sectionStyle}
                      >
                          <Image
                          source={icons.userIconProfile}
                          style={{
                              width:18,
                              height:18,
                              marginLeft:10,
                              marginRight:13,
                              tintColor: COLORS.fgOrange
                          }}
                      />
                      <TextInput
                          style={{flex: 1, ...FONTS.TextInput, fontSize:15}}
                          placeholder="Contact Name"
                          onChangeText={(contactName) => setContactName(contactName)}
                          placeholderTextColor = {COLORS.fgDarkGrey}
                          underlineColorAndroid="transparent"
                      />
                      </View>  
                       <View
                       style={styles.sectionStyle}
                      >
                          <Image
                          source={images.phone}
                          style={styles.imageStyle}
                      />
                      <TextInput
                          style={{flex: 1, ...FONTS.TextInput, fontSize:15}}
                          placeholder="Mobile Phone"
                          onChangeText={(phone) => setPhone(phone)}
                          placeholderTextColor = {COLORS.fgDarkGrey}
                          underlineColorAndroid="transparent"
                      />
                      </View> 
                      <View
                      style={styles.sectionStyle}
                     >
                         <Image
                         source={icons.mail}
                         style={{
                            width:18,
                            height:18,
                            marginLeft:10,
                            marginRight:13,
                            tintColor: COLORS.fgOrange
                        }}
                     />
                     <TextInput
                         style={{flex: 1, ...FONTS.TextInput, fontSize:15}}
                         placeholder="Email"
                         onChangeText={(email) => setEmail(email)}
                         placeholderTextColor = {COLORS.fgDarkGrey}
                         underlineColorAndroid="transparent"
                     />
                     </View> 
                     <TouchableOpacity
                     onPress={() => setModalVisible(true)}
                   >
                     <View
                         style={styles.sectionStyle}
                     >
                     <Image
                         source={icons.location}
                         style={{
                         width:18,
                         height:18,
                         marginLeft:10,
                         marginRight:13,
                         tintColor: COLORS.fgOrange
                     }}
                     />
                     <Text
                     style={{
                         ...FONTS.TextInput, fontSize: 14, color: COLORS.fgDarkGrey,
                         flex: 1,
                     }}
                     >
                     {state}
                     </Text>
                     </View>

                   </TouchableOpacity>
                </View>
        )
    }

    // SHOW MODAL FUNCTION
    function renderShowStatesModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View
                        style={{ flex: 1,  alignItems: "center", justifyContent: "center"}}
                    >
                        <View
                            style={{
                                height: 300,
                                width: "85%",
                                marginHorizontal:20,
                                borderRadius: 20,
                                backgroundColor: COLORS.fgGray,
                                borderColor:"#E5E5E5",
                                borderStyle: "solid",
                                borderWidth:2,
                                padding:10,
                                alignItems: "center"
                                
                            }}
                        >
                            <Text
                                style={{
                                    marginTop: 10,
                                    ...FONTS.loginSubTitle,
                                    fontSize:16,
                                    color: COLORS.fgOrange,
                                    marginBottom:20
                                }}
                            >Available States</Text>

                            <FlatList 
                                data={stateList}
                                keyboardDismissMode="on-drag"
                                keyExtractor={item => `${item.id}`} 
                                showsVerticalScrollIndicator={false}
                                renderItem={
                                    ({ item }) => {
                                        return (
                                            <TouchableOpacity
                                                style={{
                                                    alignItems: "center",
                                                    padding:10,
                                                    backgroundColor: COLORS.fgWhite,
                                                    marginTop:5,
                                                    marginBottom:3,
                                                    width: 250,
                                                    borderRadius:10
                                                }}
                                            onPress={() => setState(item.title)}
                                            >
                                                <Text
                                                    style={{
                                                        ...FONTS.AccountTypeText,
                                                        color: COLORS.fgDarkGrey,
                                                    }}
                                                >{item.title}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                }
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
    // END OF SHOW MODAL FUNCTION

     // SHOW MODAL FUNCTION
     function renderShowSectorsModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={sectorModal}
            >
                <TouchableWithoutFeedback
                    onPress={() => setSectorModalVisible(false)}
                >
                    <View
                        style={{ flex: 1,  alignItems: "center", justifyContent: "center"}}
                    >
                        <View
                            style={{
                                height: 300,
                                width: "85%",
                                marginHorizontal:20,
                                borderRadius: 20,
                                backgroundColor: COLORS.fgGray,
                                borderColor:"#E5E5E5",
                                borderStyle: "solid",
                                borderWidth:2,
                                padding:10,
                                alignItems: "center"
                                
                            }}
                        >
                            <Text
                                style={{
                                    marginTop: 10,
                                    ...FONTS.loginSubTitle,
                                    fontSize:16,
                                    color: COLORS.fgOrange,
                                    marginBottom:20
                                }}
                            >Available Sectors</Text>

                            <FlatList 
                                data={sectorData}
                                keyboardDismissMode="on-drag"
                                keyExtractor={item => `${item.SECTOR_ID}`} 
                                showsVerticalScrollIndicator={false}
                                renderItem={
                                    ({ item }) => {
                                        return (
                                            <TouchableOpacity
                                                style={{
                                                    alignItems: "center",
                                                    padding:10,
                                                    backgroundColor: COLORS.fgWhite,
                                                    marginTop:5,
                                                    marginBottom:3,
                                                    width: 250,
                                                    borderRadius:10
                                                }}
                                            onPress={() => setSector(item.SECTOR_NAME)}
                                            >
                                                <Text
                                                    style={{
                                                        ...FONTS.AccountTypeText,
                                                        color: COLORS.fgDarkGrey,
                                                    }}
                                                >{item.SECTOR_NAME}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                }
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
    // END OF SHOW MODAL FUNCTION

    return (
        <View
        style={{
            flex:1,
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: COLORS.screenGrey,
            height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
          }}
        >
        <StatusBar backgroundColor={COLORS.screenGrey} barStyle="dark-content" />
        <Loader loading={loading} />
        
        <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          alignContent: 'center',
        }}>

            <View>
                <KeyboardAvoidingView>
                    <View
                        style={{
                            marginTop:50,
                            paddingHorizontal: 20,
                            marginBottom:20
                        }}
                    >
                        <Text
                            style={{
                                width: "80%",
                                color: COLORS.fgDarkGrey,
                                ...FONTS.loginPageText
                            }}
                        >
                        Create an account
                        </Text>
                    </View>
                    <View 
                        style={{
                            marginTop: 10,
                            paddingHorizontal:20
                        }}
                    >
                        <Text
                         style={{
                             width: "80%",
                             color: COLORS.fgDarkGrey,
                             ...FONTS.loginPageTextDesc,
                             fontSize:15
                         }}
                        >
                        Select your account type 
                        </Text>
                    </View>
                    
                    <View
                         style={{
                             flexDirection: "row",
                             paddingHorizontal: 20,
                             marginTop:15,
                             marginBottom:5,
                             justifyContent: "space-between"
                         }}
                    >
                    
                         {/* Account Type */}
                            <AccountType 
                                selected={(accountType == 'Individual') ? true : false }  
                                Name="Individual"
                                Icon={icons.userIconProfile}
                                OnPress={() => setAccountType('Individual')}
                            />  

                            <AccountType 
                                selected={(accountType == 'Company') ? true : false }  
                                Name="Company"
                                Icon={icons.portfolio}
                                OnPress={() => setAccountType('Company')}
                            />
                         {/* Account Type */}
                    </View>

                    {/* Render Account Type */}

                    {(accountType == 'Individual') &&
                        renderIndividualAccount()
                    }

                    {(accountType == 'Company') &&
                        renderCompanyAccount()
                    }
     
                    {/* End of Render Account Type */}
                    
                    <View
                         style={{
                             paddingHorizontal:20,
                             marginBottom:10                            
                         }}
                    >
                        <Text style={{
                            margin: 8,
                            color:COLORS.fgDarkGrey,
                            ...FONTS.TermsCondText
                        }}>By registering, you agree to the terms and conditions</Text>
                    </View>

                    <View
                            style={{
                                paddingHorizontal:20
                            }}
                    >
                            <LoginButtons 
                            buttonContainerStyle={{
                                paddingVertical: 20,
                                borderRadius: 7,
                                backgroundColor: COLORS.fgOrange,
                                marginTop:5
                            }}
                            buttonText="Register"
                            buttonTextColor={COLORS.fgGray}
                            onPress={(accountType == 'Individual') ? registerIndividualClient : registerCompanyClient}
                        />
                    </View>

                    <View
                            style={{
                                marginTop: 30,
                                flexDirection:"row",
                                justifyContent: "center"
                            
                            }}
                    >
                            <Text
                                style={{
                                    color:COLORS.fgDarkGrey,
                                    ...FONTS.RegisterText
                                }}
                            >
                            Already have an account?
                            </Text>
                            <Text
                            style={{
                                color:COLORS.bgColor,
                                ...FONTS.RegisterText,
                                marginLeft:5
                            }}
                            onPress={() => navigation.navigate('SignIn')}
                        >
                        Login here
                        </Text>
                    </View>
                
                    {renderShowStatesModal()}
                    {renderShowSectorsModal()}
                </KeyboardAvoidingView>
            </View>
        
        </ScrollView>
        </View>
    )
}

export default SignUp;

const styles = StyleSheet.create({

    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.screenGrey,
        height: 65,
        borderRadius: 5,
        margin: 7,
        ...FONTS.TextInput,
        color: COLORS.fgDarkGrey
      },
      imageStyle: {
        padding: 5,
        marginLeft:10,
        marginRight:15,
        height: 18,
        width: 18,
        resizeMode: 'cover',
        alignItems: 'center',
      },

})