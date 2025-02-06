import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Tela_Home from '../screens/Tela_Home';
import { auth_module } from '../firebase/config';
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {

  const userEmail = useSelector((state) => state.login.email); //acessar o estado atual do email armazenado na store
  const navigation = useNavigation();

  //logout do app
  const sair = async () => {
    try {
      await signOut(auth_module);
      console.log('Usuário deslogado com sucesso');
      navigation.popToTop();
    }
    catch (error) {
      console.log('Erro ao fazer logout: ' + error)
    }
  }

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text style={styles.textoEmail}>{userEmail}</Text>
      </View>
      <View style={styles.divider} />
      <DrawerItemList {...props} />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.botaoSair} onPress={sair}>
          <Icon name="sign-out" size={30} color={'#fff'} marginRight={5} />
          <Text style={styles.txtBotaoSair}>Sair</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Tela_Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={styles.drawerScreenOptions}>
      <Drawer.Screen
        name="Tela_Home"
        component={Tela_Home}
        options={{
          drawerLabel: () => <Text style={styles.drawerLabel}>Pesquisas</Text>,
          drawerIcon: () => <Icon name="file-text" size={30} color={'#fff'} />,
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },

  textoEmail: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'AveriaLibre-Regular',
  },

  divider: {
    height: 2,
    backgroundColor: '#fff',
    marginBottom: 15,
    width: '75%',
    alignSelf: 'center',
  },

  drawerLabel: {
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 27,
    textAlign: 'flex-start',
    width: '100%',
    color: '#fff',
  },

  drawerScreenOptions: {
    drawerStyle: {
      backgroundColor: '#2B1F5C',
    },

    headerStyle: {
      backgroundColor: '#2B1D62', // Cor do header desta tela
    },
    headerTintColor: '#FFFFFF', // Cor do texto no header desta tela
    headerTitle: '',

    drawerItemStyle: {
      borderWidth: 0,
      backgroundColor: '#2B1F5C',
      marginBottom: '45%'
    },
  },

  footer: {
    marginLeft: '5%',
  },

  botaoSair: {
    Color: '#fff',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },

  txtBotaoSair: {
    fontSize: 27,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'AveriaLibre-Regular',
  },
});

export default DrawerNavigator;
