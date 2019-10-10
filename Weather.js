import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Weather = ({ weather, temperature, name }) => {

	return (
		<View
			style={[
				styles.weatherContainer,
				{ backgroundColor: "#222"}
			]}
		>
			<View style={styles.headerContainer}>
			<Text style={styles.tempText}>{name}</Text>
				<Text style={styles.tempText}>{weather}</Text>
				<Text style={styles.tempText}>{temperature}˚</Text>

			</View>

		</View>
	);
};

const styles = StyleSheet.create({
	weatherContainer: {
		flex: 1
	},
	headerContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	tempText: {
		fontSize: 48,
		color: '#fff'
	}
});

export default Weather;
