import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Bell, Calendar, FileText, UserRound, Info } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

const Icon = ({ children }) => {
    return (
        <View className="justify-center items-center flex-1 w-full">
            {children}
        </View>
    )
}

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "#2563eb",
                    // tabBarInactiveTintColor: "#cbd5e1",
                    tabBarInactiveTintColor: "#94a3b8",
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        //   backgroundColor: "#161622",
                        //   borderTopWidth: 1,
                        //   borderTopColor: "#232533",
                        height: 60,
                    },
                }}>
                <Tabs.Screen
                    name="announcements"
                    options={{
                        title: "Comunicados",
                        tabBarIcon: ({ color, focused }) => <Icon><Bell color={color} /></Icon>,
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="grades"
                    options={{
                        title: "Conceitos",
                        tabBarIcon: ({ color, focused }) => <Icon><FileText color={color} /></Icon>,
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="time-schedule"
                    options={{
                        title: "Conceitos",
                        tabBarIcon: ({ color, focused }) => <Icon><Calendar color={color} /></Icon>,
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Perfil",
                        tabBarIcon: ({ color, focused }) => <Icon><UserRound color={color} /></Icon>,
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="info"
                    options={{
                        title: "Informações",
                        tabBarIcon: ({ color, focused }) => <Icon><Info color={color} /></Icon>,
                        headerShown: false,
                    }}
                />
            </Tabs>
            <StatusBar backgroundColor="#ffffff" style="auto" />
        </>
    );
};

export default TabsLayout;
