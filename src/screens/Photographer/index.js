// @flow
import React from 'react';
import {
    Container,
    Tabs,
    Tab
} from 'native-base';

import Profile from './profile';
import TabTwo from './availability';
import Book from './book';

import CustomHeader from '../../components/CustomHeader';

class PhotographerTabs extends React.Component {
  
    render () {
        const navigation = this.props.navigation;
        return (
            <Container>
                <CustomHeader hasTabs navigation={navigation} isBack/>
                <Tabs style={{ backgroundColor: '#fff'}}>
                    <Tab heading="Availability">
                        <TabTwo navigation={this.props.navigation} />
                    </Tab>
                    <Tab heading="Profile">
                        <Profile navigation={this.props.navigation}/>
                    </Tab>
                    {/* <Tab heading="Availability">
                        <TabTwo navigation={this.props.navigation} />
                    </Tab> */}
                    <Tab heading="Book ">
                        <Book navigation={this.props.navigation} />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

export default PhotographerTabs;
