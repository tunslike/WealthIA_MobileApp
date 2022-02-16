import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    FlatList,
    TextInput,
} from 'react-native';

import axios from 'axios';

import { COLORS, FONTS, images, icons, appConfig } from "../constants";
import { HeaderBar, SectorCard, Loader } from '../components';

const providerList = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Access Bank Limited',
      coysign: 'A'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Union Bank Plc',
      coysign: 'U'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Stanbic IBTC Asset',
      coysign: 'S'
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d73',
        title: 'Leadway Assurance Plc',
        coysign: 'L'
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d11',
        title: 'Guaranty Trust Bank',
        coysign: 'G'
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29dw1',
        title: 'MTN Nigeria Plc',
        coysign: 'M'
      },
  ];

const Connections = ({route, navigation}) => {

    //const { type, subCatId } = route.params
    const [loading, setLoading] = useState(false);


    //USE EFFECT
    useEffect(() => {
     
            //load sub categories
            this.loadSectorCategories();
        
    }, []);

    //FUNTION TO LOAD SUB CATEGORIES
   loadSectorCategories = () => {
       
    setLoading(true);

        //Call Axios
          axios
            .get(appConfig.BASE_CONFIG.base_url + 'categories/loadSectorProviders/', 
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
                      setSubListData(response.data)

                      if(response) {
                          setProviderCount(response.data.length)
                      }

                    }catch(ex){

                    }   
                }

            })
            .catch(function (error) {
                setLoading(false);
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
        <View
        style={{
            marginTop: 21,
            paddingHorizontal:30,
            flexDirection: "row",
            alignItems: "center"
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
        0 Providers found
        </Text>
    </View>

     {/* Render Search bar  */}
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderColor: "#CCCBCB",
                borderStyle: "solid",
                borderWidth: 1,
                borderRadius: 10,
                marginHorizontal: 20,
                marginTop: 20,
                height: 50,
                backgroundColor: COLORS.screenGrey,
                paddingHorizontal:15
            }}
        >
            <Image 
                source={icons.search}
                resizeMode="contain"
                style={{
                    width:20,
                    height:20,
                    marginRight:10,
                    tintColor: "#CACEDF",  
                }}
            />
            <TextInput 
                style={{flex:1, ...FONTS.TermsCondText}}
                placeholder="Type your message here"
                autoCapitalize="none"
                returnKeyType="next"
                blurOnSubmit={false}
            />
        </View>
     {/* Render Search bar  */}

    <View
    style={{
        backgroundColor: COLORS.fgWhite,
        borderRadius: 10,
        paddingTop:20,
        paddingBottom:20,
        marginTop: 25,
        marginHorizontal: 15,
        height:420
    }}
>

<View
                            style={{
                                paddingHorizontal: 20,
                                backgroundColor: COLORS.fgGray,
                                marginHorizontal:20,
                                padding: 20,
                                borderRadius: 10,
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            <Image 
                                source={icons.info}
                                resizeMode="contain"
                                style={{
                                    height:25,
                                    width: 25,
                                    tintColor: COLORS.fgOrange,
                                    marginRight: 5
                                }}
                            />
                            <Text
                                style={{
                                    ...FONTS.AccountTypeText,
                                    fontSize: 14,
                                    color: "#625E5E"
                                }}
                            >
                                Sorry, you do not have any saved connection
                            </Text>
                        </View>

            {/* Flatlist component here 

            <FlatList 
            data={providerList}
            keyboardDismissMode="on-drag"
            keyExtractor={item => `${item.id}`} 
            showsVerticalScrollIndicator={false}
            renderItem={
                ({ item }) => {
                    return (
                        <SectorCard 
                        Name={item.title}
                        CoySign={item.coysign}
                        OnPress={() => navigation.navigate("SectorChannel", {coyname: item.title, providerid: item.id, subCatId:subCatId})}
                        />
                    )
                }
            }
        />
        */}

        </View>
            {/* End of flat List */}

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
                Saved Connections
            </Text>
        </View>

        {renderBodyContents()}

        </View>
    )
}

export default Connections;