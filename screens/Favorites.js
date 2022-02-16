import React from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    FlatList,
    TextInput,
} from 'react-native';

import { COLORS, FONTS, images, icons } from "../constants";
import { HeaderBar, SectorCard } from '../components';

const Favorites = ({route, navigation}) => {

    //const { type, subCatId } = route.params

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
        backgroundColor: COLORS.fgWhite,
        borderRadius: 10,
        paddingTop:20,
        paddingBottom:20,
        marginTop: 25,
        marginHorizontal: 15,
        height:450
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
    Sorry, you do not have any favorite
</Text>
</View>

        

        </View>
            

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
                Favorites
            </Text>
        </View>

        {renderBodyContents()}

        </View>
    )
}

export default Favorites;