import React, { useEffect }  from 'react';
import { 
    Login, 
    Welcome, 
    SignIn, 
    SignUp, 
    Favorites, 
    Connections, 
    Chat,
    Message,
    ProviderSector,
    SectorChannel,
    PostMessageProvider,
    UserProfile,
    AddAccounts,
    UpdateProfile,
    ChangePassword,
    PostSuccess,
    PostFailed,
    ProviderMessage,
    ProviderChat,
    ResetPassword,
    CreateAccount,
    MessageResponses
} from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from 'react-native-splash-screen';
import {  Provider } from 'react-redux';
import { Store } from './redux/store';

import Tabs from "./navigation/tabs";
import CategoryList from './screens/CategoryList';
import PostMessage from './screens/PostMessage';

const Stack = createStackNavigator();

const App = () => {

     //USE EFFECT
     useEffect(() => {
        
        SplashScreen.hide();

    }, []);

    return (
        <Provider store={Store} >
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Login'}
                >
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    name="Home"
                    component={Tabs}
                />
                <Stack.Screen
                    name="Favorites"
                    component={Favorites}
                />
                <Stack.Screen
                    name="Connections"
                    component={Connections}
                />
                <Stack.Screen
                    name="Chat"
                    component={Chat}
                />
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                />
                <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                />
                <Stack.Screen
                    name="CategoryList"
                    component={CategoryList}
                />
                <Stack.Screen
                    name="PostMessage"
                    component={PostMessage}
                />
                <Stack.Screen
                    name="Message"
                    component={Message}
                />
                <Stack.Screen
                    name="ProviderSector"
                    component={ProviderSector}
                />
                <Stack.Screen
                    name="SectorChannel"
                    component={SectorChannel}
                />
                <Stack.Screen
                    name="PostMessageProvider"
                    component={PostMessageProvider}
                />
                <Stack.Screen
                    name="UserProfile"
                    component={UserProfile}
                />
                <Stack.Screen
                    name="AddAccounts"
                    component={AddAccounts}
                />
                <Stack.Screen
                    name="UpdateProfile"
                    component={UpdateProfile}
                />
                <Stack.Screen
                    name="ChangePassword"
                    component={ChangePassword}
                />
                <Stack.Screen
                    name="PostSuccess"
                    component={PostSuccess}
                />
                <Stack.Screen
                    name="PostFailed"
                    component={PostFailed}
                />
                <Stack.Screen
                    name="ProviderMessage"
                    component={ProviderMessage}
                />
                <Stack.Screen
                    name="ProviderChat"
                    component={ProviderChat}
                />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPassword}
                />
                <Stack.Screen
                    name="CreateAccount"
                    component={CreateAccount}
                />
                <Stack.Screen
                    name="MessageResponses"
                    component={MessageResponses}
                />
            </Stack.Navigator>
        </NavigationContainer>
    </Provider>
    )
}

export default App;