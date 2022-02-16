import React from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
} from 'react-native';

import { COLORS, FONTS, images, icons } from "../constants";
import { HeaderBar, ChannelCard } from '../components';

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

const SectorChannel = ({route, navigation}) => {

    const { coyname, providerid, subCatId } = route.params

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
            marginTop: 25,
            paddingHorizontal:30,
        }}
    >
        <Text
            style={{
                color: "#293259",
                ...FONTS.ForgotPassword,
                fontSize: 16
            }}
        >
        Select approriate channel category below
        </Text>
    </View>

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

         <ChannelCard 
            Name="Advice"
            CoySign="A"
            Desc="Get professional advice and tips"
            OnPress={() => navigation.navigate("PostMessageProvider", {type: "Advice", provider: providerid, subCatId:subCatId, companyName: coyname})}
         />
         
         <ChannelCard 
         Name="Complaint"
         CoySign="C"
         Desc="Prompt complaint enquiries"
         OnPress={() => navigation.navigate("PostMessageProvider", {type: "Complaint", provider: providerid, subCatId:subCatId, companyName: coyname})}
      />

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
                isTitle={true}
                titleHeader="Post Message"
                styles={{
                    marginTop: 30
                }}
            />
        </View>
        <View
                    style={{
                        marginTop: 35,
                        paddingHorizontal:30,
                        flexDirection: "row",
                        alignItems: "center",
                        alignContent: "center"
                    }}
                >
                <Image 
                source={icons.chat}
                resizeMode="contain"
                style={{
                    width:15,
                    height:15,
                    marginRight:5,
                    tintColor: COLORS.fgOrange,
                }}
            />
                    <Text
                        style={{
                            color: "#CACEDF",
                            ...FONTS.ForgotPassword,
                            fontSize: 14,

                        }}
                    >
                        You are chatting with
                    </Text>
                </View>
            <View
                style={{
                    marginTop: 13,
                    paddingHorizontal:30,
                    marginBottom: 20,
                }}
            >
                <Text
                    style={{
                        ...FONTS.CategoryListHeader,
                        fontSize: 18,
                        color: COLORS.fgGray
                    }}
                >
                    {coyname}
                </Text>
            </View>

        {renderBodyContents()}

        </View>
    )
}

export default SectorChannel;