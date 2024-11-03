import * as React from "react";
import {Image, StyleSheet, View, Text} from "react-native";

const Cadastro = () => {
  	
  	return (
    		<View style={styles.cadastro}>
      			<Image style={styles.logoIcon} resizeMode="cover" source="Logo.png" />
      			<Image style={[styles.cadastroChild, styles.lineIconLayout]} resizeMode="cover" source="Line 1.png" />
      			<View style={[styles.cadastroItem, styles.cadastroLayout]} />
      			<View style={[styles.cadastroInner, styles.cadastroLayout]} />
      			<Image style={[styles.lineIcon, styles.lineIconLayout]} resizeMode="cover" source="Line 2.png" />
      			<View style={[styles.rectangleView, styles.rectangleViewLayout]} />
      			<Image style={[styles.pngtreeblackPadlock6581266Icon, styles.iconLayout]} resizeMode="cover" source="—Pngtree—black-padlock_6581266 1.png" />
      			<Image style={[styles.pngtreeblackPadlock6581266Icon1, styles.iconLayout]} resizeMode="cover" source="—Pngtree—black-padlock_6581266 2.png" />
      			<View style={[styles.cadastroChild1, styles.rectangleViewLayout]} />
      			<Text style={styles.cadastro1}>Cadastro</Text>
      			<Image style={[styles.pessoaloginIcon, styles.iconLayout]} resizeMode="cover" source="PessoaLogin.png" />
      			<View style={[styles.barraUsurio, styles.barraLayout]}>
        				<View style={styles.recShadowBox} />
        				<Text style={[styles.email, styles.emailTypo]}>Email</Text>
      			</View>
      			<View style={[styles.barraSenha, styles.barraLayout]}>
        				<View style={styles.recShadowBox} />
        				<Text style={[styles.email, styles.emailTypo]}>Senha</Text>
      			</View>
      			<View style={[styles.barraSenha1, styles.barraLayout]}>
        				<View style={styles.recShadowBox} />
        				<Text style={[styles.email, styles.emailTypo]}>Repita a senha</Text>
      			</View>
      			<View style={styles.cadastroChild2} />
      			<Text style={[styles.cadastrar, styles.emailTypo]}>Cadastrar</Text>
    		</View>);
};

const styles = StyleSheet.create({
  	lineIconLayout: {
    		height: 153,
    		width: 176,
    		position: "absolute"
  	},
  	cadastroLayout: {
    		height: 1,
    		width: 352,
    		borderTopWidth: 1,
    		borderColor: "#0097b2",
    		borderStyle: "solid",
    		position: "absolute"
  	},
  	rectangleViewLayout: {
    		height: 125,
    		width: 103,
    		backgroundColor: "#0097b2",
    		borderRadius: 20,
    		position: "absolute"
  	},
  	iconLayout: {
    		height: 31,
    		width: 31,
    		left: 34,
    		position: "absolute"
  	},
  	barraLayout: {
    		width: 295,
    		left: 65,
    		height: 31,
    		position: "absolute"
  	},
  	emailTypo: {
    		fontSize: 16,
    		textAlign: "left",
    		color: "#000",
    		fontFamily: "RampartOne-Regular",
    		position: "absolute"
  	},
  	logoIcon: {
    		top: 662,
    		left: 143,
    		width: 250,
    		height: 195,
    		position: "absolute"
  	},
  	cadastroChild: {
    		top: 706,
    		left: -13
  	},
  	cadastroItem: {
    		top: 539,
    		left: 42
  	},
  	cadastroInner: {
    		top: 158,
    		left: 21
  	},
  	lineIcon: {
    		top: 462,
    		left: -15
  	},
  	rectangleView: {
    		top: 794,
    		left: -51
  	},
  	pngtreeblackPadlock6581266Icon: {
    		top: 388
  	},
  	pngtreeblackPadlock6581266Icon1: {
    		top: 429
  	},
  	cadastroChild1: {
    		top: -62,
    		left: 341
  	},
  	cadastro1: {
    		top: 88,
    		fontSize: 48,
    		textAlign: "left",
    		color: "#000",
    		fontFamily: "RampartOne-Regular",
    		left: 82,
    		position: "absolute"
  	},
  	pessoaloginIcon: {
    		top: 347
  	},
  	recShadowBox: {
    		opacity: 0.8,
    		borderWidth: 1,
    		borderColor: "#000",
    		backgroundColor: "#d9d9d9",
    		elevation: 20,
    		shadowRadius: 20,
    		left: "0%",
    		bottom: "0%",
    		right: "0%",
    		top: "0%",
    		height: "100%",
    		borderRadius: 10,
    		shadowOpacity: 1,
    		shadowOffset: {
      			width: 0,
      			height: 4
    		},
    		shadowColor: "rgba(0, 0, 0, 0.25)",
    		borderStyle: "solid",
    		position: "absolute",
    		width: "100%"
  	},
  	email: {
    		top: "12.9%",
    		left: "3.05%"
  	},
  	barraUsurio: {
    		top: 347
  	},
  	barraSenha: {
    		top: 388
  	},
  	barraSenha1: {
    		top: 431
  	},
  	cadastroChild2: {
    		top: 480,
    		shadowRadius: 4,
    		elevation: 4,
    		width: 247,
    		height: 36,
    		borderRadius: 10,
    		shadowOpacity: 1,
    		shadowOffset: {
      			width: 0,
      			height: 4
    		},
    		shadowColor: "rgba(0, 0, 0, 0.25)",
    		left: 82,
    		backgroundColor: "#0097b2",
    		position: "absolute"
  	},
  	cadastrar: {
    		top: "57.04%",
    		left: "41.48%"
  	},
  	cadastro: {
    		backgroundColor: "#fff",
    		flex: 1,
    		height: 852,
    		overflow: "hidden",
    		width: "100%"
  	}
});

export default Cadastro;
