import React from "react";
import {
    View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import {useSelector} from 'react-redux'

import { Home, Favorites, Connections, Chat, CategoryList, Message } from "../screens"
import { COLORS, icons } from "../constants";
import { TabIcon } from "../components";

const Tab = createBottomTabNavigator()

const Tabs = () => {

    const { clientid } = useSelector(state => state.clientReducer)

    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    height:Platform.OS === 'ios' ? 90 : 70,
                    paddingTop:4,
                    backgroundColor: COLORS.fgWhite,
                    borderTopColor: "transparent",
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={
                    {
                        tabBarIcon: ({focused}) => {
                            return (
                                <TabIcon 
                                    focused={focused}
                                    icon={icons.home}
                                    label="Home"
                                />
                            )
                        }
                    }
                }
            />
            <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={
                    {
                        tabBarIcon: ({focused}) => {
                            return (
                                <TabIcon 
                                    focused={focused}
                                    icon={icons.favorites}
                                    label="Favorites"
                                />
                            )
                        }
                    }
                }
            />
            <Tab.Screen
                name="Connections"
                component={Connections}
                options={
                    {
                        tabBarIcon: ({focused}) => {
                            return (
                                <TabIcon 
                                    focused={focused}
                                    icon={icons.portfolio}
                                    label="Connections"
                                />
                            )
                        }
                    }
                }
            />
            <Tab.Screen
            initialParams={{ 'clientid': clientid }} 
                name="Chat"
                component={Message}
                options={
                    {
                        tabBarIcon: ({focused}) => {
                            return (
                                <TabIcon 
                                    focused={focused}
                                    icon={icons.chat}
                                    label="Messages"
                                />
                            )
                        }
                    }
                }
            />
        </Tab.Navigator>
    )
}

export default Tabs;