import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

import { AuthProvider } from "../context/AuthContext";
import "../global.css";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    // const [fontsLoaded, error] = useFonts({
    //     Inter_100Thin,
    //     Inter_400Regular,
    //     Inter_500Medium,
    //     Inter_600SemiBold,
    //     Inter_700Bold,
    //     Inter_900Black,
    // })
    const [fontsLoaded, error] = useFonts({
        "Inter-Black": require("../assets/fonts/Inter_18pt-Black.ttf"),
        "Inter-Bold": require("../assets/fonts/Inter_18pt-Bold.ttf"),
        "Inter-ExtraBold": require("../assets/fonts/Inter_18pt-ExtraBold.ttf"),
        "Inter-Light": require("../assets/fonts/Inter_18pt-Light.ttf"),
        "Inter-Medium": require("../assets/fonts/Inter_18pt-Medium.ttf"),
        "Inter-Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
        "Inter-SemiBold": require("../assets/fonts/Inter_18pt-SemiBold.ttf"),
    });

    useEffect(() => {
        if (error) throw error;
        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error]);

    if (!fontsLoaded && !error) null;

    return (
        <AuthProvider>
            <StatusBar backgroundColor="#2563eb" style="light" />
            <Stack>
                {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} /> */}
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="announcement/[id]" options={{ headerShown: false }} />
            </Stack>
        </AuthProvider>
    );
};

export default RootLayout;

const styles = StyleSheet.create({});
