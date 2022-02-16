import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image,
    FlatList,
    ImageBackground
} from 'react-native';

import axios from 'axios';
import {  useSelector } from 'react-redux'

import { COLORS, FONTS, images, icons, appConfig } from "../constants";
import { HeaderBar, CategoryListCard, Loader } from '../components';

const CategoryList = ({route, navigation}) => {

    const { clientid } = useSelector(state => state.clientReducer)
  
  // GET PARAMS
  const { type, categoryid } = route.params

  // STATES
  const [subListData, setSubListData] = useState('');
  const [loading, setLoading] = useState(false);

  //USE EFFECT
  useEffect(() => {
    
    //load sub categories
    this.loadSubCategories();

}, []);

  //FUNTION TO LOAD SUB CATEGORIES
  loadSubCategories = () => {

    setLoading(true);

        //Call Axios
          axios
            .get(appConfig.BASE_CONFIG.base_url + 'categories/subCategories/'+categoryid, 
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

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor: COLORS.bgColor
            }}
        >
        <Loader loading={loading} />

            <ImageBackground
                source={images.listBG}
                resizeMode='cover'
                style={{
                    flex:1
                }}
            >

            <View>
                <HeaderBar 
                    isTitle={(type == 2) ? true : false}
                    titleHeader="Providers"
                    clientid={clientid}
                    styles={{
                        marginTop: 30
                    }}
                />
            </View>
            <View
                style={{
                    marginTop: 35,
                    paddingHorizontal:25,
                    marginBottom:30
                }}
            >
                <Text
                    style={{
                        ...FONTS.CategoryListHeader,
                        color: COLORS.fgWhite
                    }}
                >
                    {(type == 1) ? "Enquiries" : "Sectors" }
                </Text>
            </View>

            <FlatList 
                data={subListData}
                keyboardDismissMode="on-drag"
                keyExtractor={item => `${item.SUB_CATEGORY_ID}`} 
                showsVerticalScrollIndicator={false}
                renderItem={
                    ({ item }) => {
                        return (
                            <CategoryListCard 
                            Name={item.SUB_NAME}
                            OnPress={() => (type == 1) ? navigation.navigate("PostMessage", {type: item.SUB_NAME, subCatId: item.SUB_CATEGORY_ID}) : navigation.navigate("ProviderSector", {type: item.SUB_NAME, subCatId: item.SUB_CATEGORY_ID})}
                            />
                        )
                    }
                }
            />


            </ImageBackground>
            
        </SafeAreaView>
    )
}

export default CategoryList;