import * as React from "react";
import {Image, StyleSheet, View} from "react-native";

const Login = () => {
  	
  	return (
    		<View style={styles.login}>
      			<Image style={[styles.logoIcon, styles.iconPosition]} resizeMode="cover" source="Logo.png" />
      			<View style={styles.loginChild} />
      			<View style={[styles.loginItem, styles.loginLayout]} />
      			<View style={[styles.loginInner, styles.loginLayout]} />
      			<Image style={styles.lineIcon} resizeMode="cover" source="Line 2.png" />
      			<Image style={[styles.pngtreeblackPadlock6581266Icon, styles.iconLayout]} resizeMode="cover" source="—Pngtree—black-padlock_6581266 1.png" />
      			<Image style={[styles.pessoaloginIcon, styles.iconLayout]} resizeMode="cover" source="PessoaLogin.png" />
      			<View style={[styles.rec1, styles.recShadowBox]} />
      			<View style={[styles.rec11, styles.recShadowBox]} />
      			<View style={[styles.rectangleView, styles.loginChild1ShadowBox]} />
      			<View style={[styles.loginChild1, styles.loginChild1ShadowBox]} />
      			<Image style={[styles.frameIcon, styles.iconPosition]} resizeMode="cover" source="Frame.png" />
    		</View>);
};

const styles = StyleSheet.create({
  	iconPosition: {
    		left: 0,
    		position: "absolute"
  	},
  	loginLayout: {
    		height: 1,
    		width: 352,
    		borderTopWidth: 1,
    		borderColor: "#0097b2",
    		borderStyle: "solid",
    		position: "absolute"
  	},
  	iconLayout: {
    		height: 31,
    		width: 31,
    		left: 33,
    		position: "absolute"
  	},
  	recShadowBox: {
    		opacity: 0.8,
    		borderWidth: 1,
    		borderColor: "#000",
    		backgroundColor: "#d9d9d9",
    		borderRadius: 10,
    		shadowOpacity: 1,
    		elevation: 20,
    		shadowRadius: 20,
    		shadowOffset: {
      			width: 0,
      			height: 4
    		},
    		shadowColor: "rgba(0, 0, 0, 0.25)",
    		left: "15.78%",
    		right: "9.16%",
    		width: "75.06%",
    		height: "3.64%",
    		borderStyle: "solid",
    		position: "absolute"
  	},
  	loginChild1ShadowBox: {
    		height: 36,
    		width: 145,
    		elevation: 4,
    		shadowRadius: 4,
    		borderRadius: 10,
    		shadowOpacity: 1,
    		shadowOffset: {
      			width: 0,
      			height: 4
    		},
    		shadowColor: "rgba(0, 0, 0, 0.25)",
    		top: 462,
    		position: "absolute"
  	},
  	logoIcon: {
    		top: 0,
    		width: 147,
    		height: 111
  	},
  	loginChild: {
    		top: -53,
    		borderRadius: 20,
    		width: 103,
    		height: 125,
    		backgroundColor: "#0097b2",
    		left: -15,
    		position: "absolute"
  	},
  	loginItem: {
    		top: 539,
    		left: 42
  	},
  	loginInner: {
    		top: 197,
    		left: 21
  	},
  	lineIcon: {
    		width: 176,
    		height: 153,
    		top: 462,
    		left: -15,
    		position: "absolute"
  	},
  	pngtreeblackPadlock6581266Icon: {
    		top: 408
  	},
  	pessoaloginIcon: {
    		top: 367
  	},
  	rec1: {
    		top: "43.08%",
    		bottom: "53.29%"
  	},
  	rec11: {
    		top: "47.89%",
    		bottom: "48.47%"
  	},
  	rectangleView: {
    		left: 64,
    		backgroundColor: "#72becb"
  	},
  	loginChild1: {
    		left: 214,
    		backgroundColor: "#0097b2"
  	},
  	frameIcon: {
    		top: 804,
    		width: 393,
    		height: 56,
    		overflow: "hidden"
  	},
  	login: {
    		backgroundColor: "#fff",
    		flex: 1,
    		width: "100%",
    		height: 852,
    		overflow: "hidden"
  	}
});

export default Login;
