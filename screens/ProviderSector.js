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

import { COLORS, FONTS, icons, appConfig } from "../constants";
import { HeaderBar, SectorCard, Loader } from '../components';

const ProviderSector = ({route, navigation}) => {

    const { type, subCatId } = route.params

    const [subListData, setSubListData] = useState('');
    const [loading, setLoading] = useState(false);
    const [providerCount, setProviderCount] = useState('');

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
            .get(appConfig.BASE_CONFIG.base_url + 'categories/loadSectorProviders/' + subCatId, 
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
        {(providerCount == 1) &&
    
            '1  Provider Found'
    }

    {(providerCount > 1) &&
    
        providerCount + '  Providers Found'
}

{(providerCount == '') &&
    
    'No Provider found'

    
}
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
                height: 43,
                backgroundColor: COLORS.fgWhite,
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

            {(providerCount == '') &&

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
                No provider connected to category!
            </Text>
        </View>

            }


            {/* Flatlist component here */}

            <FlatList 
            data={subListData}
            keyboardDismissMode="on-drag"
            keyExtractor={item => `${item.PROVIDER_ID}`} 
            showsVerticalScrollIndicator={false}
            renderItem={
                ({ item }) => {
                    return (
                        <SectorCard 
                        Name={item.PROVIDER_NAME}
                        CoySign={'A'}
                        OnPress={() => navigation.navigate("SectorChannel", {coyname: item.PROVIDER_NAME, providerid: item.PROVIDER_ID, subCatId:subCatId})}
                        />
                    )
                }
            }
        />

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
        <Loader loading={loading} />
        <View>
            <HeaderBar 
                isTitle={true}
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
                {type}
            </Text>
        </View>

        {renderBodyContents()}

        </View>
    )
}

export default ProviderSector;