import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthContext from "../../context/AuthContext";
import { LogOut } from "lucide-react-native";

const SettingsItem = ({ children, onPress }) => {
    return (
        // <View className="flex-row gap-2">
            <TouchableOpacity onPress={onPress} className="w-full flex-row gap-3">
                    {/* <Text className="font-inter-regular text-xl">Sair</Text> */}
                    {children}
            </TouchableOpacity>
        // {/* </View> */}
    )
}

const Profile = () => {
    const [userData, setUserData] = useState({});
    const { user, getRequest, logout } = useAuthContext()
    const [loading, setLoading] = useState(true);
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await getRequest(`student/${user.id}/`)
            const data = await response.json()
            setUserData(data)
        }
        const fetchGrades = async () => {
            const response = await getRequest(`grade/${user.id}/2024`)
            const data = await response.json()
            setGrades(data.grades)
            setLoading(false)
        }

        fetchUserData()
        fetchGrades()
    }, [])

    console.log(loading)
    if (loading) return <ActivityIndicator />
    console.log(userData)



    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="h-40 justify-center items-center">
                <Text className="font-inter-extrabold text-4xl">{userData.name}</Text>
            </View>
            <View className="h-32 px-10">
                <Text className="font-inter-regular">{userData.attendances} Faltas</Text>
            </View>
            <View className="flex-1 px-10">
            </View>
            <View className="px-10 py-4">
                <SettingsItem onPress={logout}>
                    <LogOut color="black"/>
                    <Text className="font-inter-regular text-xl">Sair</Text>
                </SettingsItem>
            </View>
        </SafeAreaView>
    );
};

export default Profile;
