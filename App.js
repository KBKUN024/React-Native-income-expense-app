import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AllExpenses, ManageExpenses, RecentExpenses } from "./screens";
import { GloablStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { IconButton } from "./components/ui/IconButton";
import { ExpensesContextProvider } from "./store/expenses-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function Tabs() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GloablStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GloablStyles.colors.primary500 },
        tabBarActiveTintColor: GloablStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate("ManageExpenses")}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: "red",
        },
        headerStyle: { backgroundColor: GloablStyles.colors.primary500 },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="ExpensensOverview"
        component={Tabs}
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen name="ManageExpenses" component={ManageExpenses} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
