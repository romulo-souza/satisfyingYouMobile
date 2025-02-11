import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import NovaConta from './src/screens/NovaConta';
import RecuperarSenha from './src/screens/RecuperarSenha';
import NewSearch from './src/screens/NewSearch';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DrawerNavigator from './src/components/DrawerNavigator';
import AcoesPesquisa from './src/screens/AcoesPesquisa';
import ModificarPesquisa from './src/screens/ModifySearch';
import Coleta from './src/screens/Coleta';
import Agradecimento from './src/screens/Agradecimento';
import Tela_Relatorio from './src/screens/Tela_Relatorio';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Orientation from 'react-native-orientation-locker';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#372775', //cor de fundo do app (evitar flash branco na transição entre telas)
  },
};

const App = () => {

  //travar orientação na horizontal
  useEffect(() => {
    Orientation.lockToLandscape();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: '#2B1D62' }, //Header automatico
            headerTitleStyle: {
              fontSize: 35,
              fontFamily: 'AveriaLibre-Regular',
              color: '#FFFFFF',
            },
            headerBackImage: () => (
              <Icon name="arrow-back" size={35} color="#573FBA" />
            ),
            animation: 'slide_from_right', //animação mais suave de transição entre telas
          }}>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="NovaConta" component={NovaConta} options={{ headerTitle: 'Nova Conta' }} />
          <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} options={{ headerTitle: 'Recuperação de senha' }} />
          <Stack.Screen name="NewSearch" component={NewSearch} options={{ headerTitle: 'Nova pesquisa' }} />
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="AcoesPesquisa" component={AcoesPesquisa} />
          <Stack.Screen name="ModificarPesquisa" component={ModificarPesquisa} options={{ headerTitle: 'Modificar pesquisa' }} />
          <Stack.Screen name="Coleta" component={Coleta} options={{ headerShown: false }} />
          <Stack.Screen name="Agradecimento" component={Agradecimento} options={{ headerShown: false }} />
          <Stack.Screen name="Tela_Relatorio" component={Tela_Relatorio} options={{ headerTitle: 'Relatório' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
