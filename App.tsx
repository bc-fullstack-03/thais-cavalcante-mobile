import React, { useContext, useEffect } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "./src/context/AuthContext";
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
import { House, User, UsersThree } from "phosphor-react-native";
import { Provider as PostsProvider } from "./src/context/PostsContext";
import { navigationRef } from "./src/RootNavigation";
import { Provider as ProfilesProvider } from "./src/context/ProfilesContext";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const AppTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: THEME.COLORS.BLACK,
  },
};
function App() {
  const { token, tryLocalLogin, isLoading } = useContext(AuthContext);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    tryLocalLogin();
  }, []);

  if (!fontsLoaded || isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer theme={AppTheme} ref={navigationRef}>
      {!token ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: THEME.COLORS.BLACK,
              borderTopColor: THEME.COLORS.GRAY_MEDIUM,
            },
            tabBarActiveTintColor: THEME.COLORS.CYAN,
            tabBarShowLabel: false,
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color }) => <House size={32} color={color} />,
            }}
          />
          <Tab.Screen
            name="Friends"
            component={Friends}
            options={{
              tabBarIcon: ({ color }) => <UsersThree size={32} color={color} />,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({ color }) => <User size={32} color={color} />,
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

export default () => {
  return (
    <AuthProvider>
      <PostsProvider>
        <ProfilesProvider>
          <App />
        </ProfilesProvider>
      </PostsProvider>
    </AuthProvider>
  );
};
