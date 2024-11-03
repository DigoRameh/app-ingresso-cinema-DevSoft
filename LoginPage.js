import * as React from "react";
import { Image, StyleSheet, View } from "react-native";

const Login = () => {
  	return (
    		<View style={styles.login}>
      			<Image style={styles.logoIcon} resizeMode="cover" source={require('./assets/Logo.png')} />
      			<View style={styles.loginChild} />
      			<View style={[styles.loginItem, styles.loginLayout]} />
      			<View style={[styles.loginInner, styles.loginLayout]} />
      			<Image style={[styles.pngtreeblackPadlock6581266Icon, styles.iconLayout]} resizeMode="cover" source={require('./assets/cadeado.png')} />
      			<Image style={[styles.pessoaloginIcon, styles.iconLayout]} resizeMode="cover" source={require('./assets/PessoaLogin.png')} />
      			<View style={[styles.rec1, styles.recShadowBox]} />
      			<View style={[styles.rec11, styles.recShadowBox]} />
      			<View style={[styles.rectangleView, styles.loginChild1ShadowBox]} />
      			<View style={[styles.loginChild1, styles.loginChild1ShadowBox]} />
      			<Image style={[styles.vectorIcon, styles.vectorIconLayout]} resizeMode="cover" source={require('./assets/busca.png')} />
      			<Image style={[styles.vectorIcon1, styles.vectorIconPosition]} resizeMode="cover" source={require('./assets/ingresso.png')} />
      			<Image style={[styles.vectorIcon2, styles.vectorIconPosition]} resizeMode="cover" source={require('./assets/perfil.png')} />
      			<Image style={[styles.vectorIcon3, styles.vectorIconLayout]} resizeMode="cover" source={require('./assets/home.png')} />
    		</View>
  	);
};

const styles = StyleSheet.create({
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
  	vectorIconLayout: {
        maxHeight: "100%",
        maxWidth: "100%",
        position: "absolute",
        overflow: "hidden"
  },
  vectorIconPosition: {
        top: "95.89%",
        maxHeight: "100%",
        maxWidth: "100%",
        position: "absolute",
        overflow: "hidden"
  },
  logoIcon: {
        top: 0,
        left: 0,
        width: 147,
        height: 111,
        position: "absolute"
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
  vectorIcon: {
        height: "2.02%",
        width: "4.4%",
        top: "95.7%",
        right: "60.3%",
        bottom: "2.28%",
        left: "35.3%"
  },
  vectorIcon1: {
        height: "1.76%",
        width: "4.86%",
        right: "35.09%",
        bottom: "2.35%",
        left: "60.05%"
  },
  vectorIcon2: {
        height: "1.71%",
        width: "3.82%",
        right: "10.69%",
        bottom: "2.39%",
        left: "85.5%"
  },
  vectorIcon3: {
        height: "1.98%",
        width: "3.84%",
        top: "95.73%",
        right: "85.58%",
        bottom: "2.29%",
        left: "10.58%"
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