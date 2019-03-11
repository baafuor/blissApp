import React from "react";
import {
	View,
	Text,
	TextInput
} from "react-native";

import styles from "./style";

export default class CustomInput extends React.Component {
	render() {

		const { label, onChangeText, value, keyboardType, numberOfLines, editable } = this.props;

		return(
			<View style={styles.container}>
				<Text style={styles.label}>{label}</Text>
				<TextInput
					style={styles.input}
					underlineColorAndroid={"transparent"}
					onChangeText={onChangeText}
					value={value}
					keyboardType={keyboardType}
					multiline={true}
					numberOfLines={numberOfLines}
					editable={editable} />
			</View>
		)
	}
}