import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Bell, NotepadText, UserRound, UsersRound } from "lucide-react-native";
import React from "react";

const TabsLayout = () => {
    return (
        <>
            <Tabs screenOptions={{
                tabBarActiveTintColor: "#2563eb",
                tabBarInactiveTintColor: "#CDCDE0",
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
                        tabBarIcon: ({ color, focused }) => <Bell color={color} /> ,
                        headerShown: false,
                    }}
                    />
                <Tabs.Screen
                    name="grades"
                    options={{
                        title: "Conceitos",
                        tabBarIcon: ({ color, focused }) => <NotepadText color={color} />,
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Perfil",
                        tabBarIcon: ({ color, focused }) => <UserRound color={color} />,
                        headerShown: false,
                    }}
                />
            </Tabs>
            <StatusBar style="auto" />
        </>
    );
};

export default TabsLayout;
