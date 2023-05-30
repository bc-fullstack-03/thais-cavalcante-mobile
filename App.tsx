import * as React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./src/Screens/Login";
import Register from "./src/Screens/Register";
import Home from "./src/Screens/Home";
import Profile from "./src/Screens/Profile";
import Friends from "./src/Screens/Friends";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { THEME } from "./src/theme";
import Loading from "./src/components/Loading";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const AppTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: THEME.COLORS.BACKGROUND_900,
  },
};
function App() {
  const isLoggedIn = false;

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <NavigationContainer theme={AppTheme}>
      {!isLoggedIn ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            statusBarStyle: "dark",
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Friends" component={Friends} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
