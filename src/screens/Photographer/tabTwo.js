// @flow
import React from 'react';
import {View} from 'react-native';
import { Calendar as MonthCalendar } from 'react-native-calendars';

class TabTwo extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            date: new Date(),
            selected: ''
        };
    }

    onDateChange (date) {
        this.setState({ date });
    }
    onDayPress (day) {
        this.setState({
            selected: day.dateString
        });
    }

    render () {
    
        return (
            <View style={{flex:1}}>
                <MonthCalendar
                    onDayPress={e => this.onDayPress(e)}
                    disableMonthChange={true}
                    markedDates={{ [this.state.selected]: { selected: true } }}
                    theme={{
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#01cca1',
                        selectedDayBackgroundColor: '#01cca1',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#01cca1',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: '#01cca1',
                        monthTextColor: '#000'
                    }}
                />
            </View>
        );
    }
}

export default TabTwo;

