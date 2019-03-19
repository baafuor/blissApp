// @flow
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar as MonthCalendar } from 'react-native-calendars';
import DateTimePicker from 'react-native-modal-datetime-picker';

import Utils from '../../utils/str';

class TabTwo extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            selected: Utils.getDate(new Date()),
            isFromTimePickerVisible: false,
            isToTimePickerVisible: false,
            fromTime: Utils.formatAMPM(new Date()),
            toTime: Utils.formatAMPM(new Date()),
            addedDate: {}
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

    _hideTimePicker = (isFrom) => {
        alert(isFrom);
        if (isFrom) {
            this.setState({ isFromTimePickerVisible: false });
        } else {
            this.setState({ isToTimePickerVisible: false });
        }
    };

    _showTimePicker = (isFrom) => {
        if (isFrom) {
            this.setState({ isFromTimePickerVisible: true });
        } else {
            this.setState({ isToTimePickerVisible: true });
        }
    }

    _addDate = () => {
        console.log(this.state.addedDate[this.state.selected]);
        // if (this.state.addedDate[this.state.selected]) {this.setState({ addedDate: [] }, () => this._addTime());} else this._addTime();
    }

    _addTime () {
        this.addedDate[this.state.selected].push({ from: this.state.fromTime, to: this.state.toTime });
    }

    render () {
        return (
            <ScrollView style={{flex:1}}>
                <MonthCalendar
                    ref={inst => this.cale = inst}
                    onDayPress={e => this.onDayPress(e)}
                    current={new Date()}
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
                <View style={{
                    borderWidth: 0.5,
                    borderColor: '#ccc'
                }} />
                <View style={{flexDirection: 'row', margin: 8}}>
                    <View style={{flex: 1}}>
                        {this.renderTime(true, 'From', this.state.fromTime, (date) => this.setState({fromTime: Utils.formatAMPM(date)}))}
                        {this.renderTime(false, 'To', this.state.toTime, (date) => this.setState({toTime: Utils.formatAMPM(date)}))}
                    </View>
                    <TouchableOpacity style={{
                        flex: 0.75,
                        backgroundColor: '#01cca1',
                        paddingHorizontal: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 16,
                        borderRadius: 10
                    }}
                    onPress={this._addDate}>
                        <Text style={{fontSize: 18, color: '#fff'}}>Add Time</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {
                        Object.keys(this.state.addedDate).map(key => {
                            return <Text>{key}</Text>;
                        })
                    }
                </View>
            </ScrollView>
        );
    }

    renderTime = (isForm, label, value, onConfirm) => {
        return (
            <View style={{margin: 8, backgroundColor: '#01cca1', padding: 4, borderRadius: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 18, marginRight: 16, marginLeft: 8, color: '#fff'}}>{label}</Text>
                    <TouchableOpacity onPress={() => this._showTimePicker(isForm)} style={{padding: 4, paddingHorizontal: 6}}>
                        <Text style={{fontSize: 18, color: '#fff'}}>{value}</Text>
                    </TouchableOpacity>
                </View>
                <DateTimePicker
                    isVisible={isForm ? this.state.isFromTimePickerVisible : this.state.isToTimePickerVisible}
                    onConfirm={onConfirm}
                    onCancel={() => this._hideTimePicker(isForm)}
                    mode={'time'}
                    is24Hour={false}
                />
            </View>
        );
    }
}

export default TabTwo;

