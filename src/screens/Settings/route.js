
import {createAppContainer,createMaterialTopTabNavigator}from 'react-navigation'

import Contact from './contactUs'
import Friend from './inviteFriends'
import Payment from './payment'
import TermServices from './termServices'


const TabNavigation = createMaterialTopTabNavigator({
 
   Contact:{
    screen:Contact
  },
  Friend:{
    screen:Friend
  },
  Payment:{
    screen:Payment
  },
  TermServices:{
    screen:TermServices
  },
},
  {
    lazy:true
  }
)

export default createAppContainer(TabNavigation)



