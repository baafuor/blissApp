import React from 'react';
import { StackNavigator, DrawerNavigator ,TabNavigator } from 'react-navigation';
import { Root } from 'native-base';
import Splash from './screens/Splash/splash';
import Login from './screens/Login/';
import ForgotPassword from './screens/ForgotPassword';
import SignUp from './screens/SignUp/';
import Walkthrough from './screens/Walkthrough/';
import Comments from './screens/Comments/';
import Channel from './screens/Channel';
import Story from './screens/Story';

import Sidebar from './screens/Sidebar';

import Profile from './screens/Profile/';
import EditProfile from './screens/EditProfile';
import ImageUpload from './screens/ImageUpload';

import Explore from './screens/Explore';
import ProfileTabs from './screens/Photographer';
import Friend from './screens/Settings/inviteFriends';
import Contact from './screens/Settings/contactUs';
import Terms from './screens/Settings/termServices';
import Payment from './screens/Settings/payment';
import ZoomImage from './screens/ZoomImage/zoomImage';

const TabNavigation = TabNavigator({
    Contact:{
        screen:Contact
    },
    Terms:{
        screen:Terms
    },
    Payment :{
        screen:Payment
    }
},{
    lazy:true,
  
    tabBarOptions:{
        scrollEnabled:true,
        style: {
            backgroundColor: '#01cca1',
   
        },
        tabStyle: {
            width:95
        },}
});

const Drawer = DrawerNavigator(
    {
        Explore:{screen:Explore},
        Profile: { screen: Profile },
        ProfileTabs :{screen:ProfileTabs},
        Settings: { screen: TabNavigation }
    },
    {
        initialRouteName:'ProfileTabs',
        contentComponent: props => <Sidebar {...props} />
    }
);

const App = StackNavigator(
    {
        Splash:{screen:Splash},
        Login: { screen: Login },
        SignUp: { screen: SignUp },
        ForgotPassword: { screen: ForgotPassword },
        Walkthrough: { screen: Walkthrough },
        Story: { screen: Story },
        Comments: { screen: Comments },
        Channel: { screen: Channel },
        Drawer: { screen: Drawer },
        ZoomImage:{screen:ZoomImage},
        EditProfile: { screen: EditProfile },
        Friend:{ screen:Friend },
        ImageUpload:{ screen: ImageUpload }
    },
    {
        index: 0,
        initialRouteName: 'Splash',
        headerMode: 'none'
    }
);

export default () =>
    <Root>
        <App />
    </Root>;
