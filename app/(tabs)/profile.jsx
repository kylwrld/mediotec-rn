import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthContext from "../../context/AuthContext";
import { LogOut } from "lucide-react-native";
import Spinner from "../../components/Spinner";

const SettingsItem = ({ children, onPress }) => {
    return (
        // <View className="flex-row gap-2">
        <TouchableOpacity onPress={onPress} className="w-full flex-row gap-3">
            {children}
        </TouchableOpacity>
        // {/* </View> */}
    );
};

const Profile = () => {
    const [userData, setUserData] = useState({});
    const { user, getRequest, logout } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);

    const fetchUserData = async () => {
        const response = await getRequest(`student/${user.id}/`);
        const data = await response.json();
        setUserData(data);
        setLoading(false);
        setRefreshing(false);
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchUserData()
    }, []);

    if (loading || refreshing) return <Spinner />;

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View className="h-40 justify-center items-center">
                    <Text className="font-inter-extrabold text-4xl">{userData.name}</Text>
                </View>
                <View className="px-10">
                    <View>
                        <Text className="text-xl font-inter-regular">{userData.attendances} Faltas</Text>
                    </View>
                    <View>
                        <Text className="text-xl font-inter-regular">Email {userData.email}</Text>
                    </View>
                    <View>
                        <Text className="text-xl font-inter-regular">Turma {userData.class_year._class.name}</Text>
                    </View>
                    <View>
                        <Text className="text-xl font-inter-regular">Ano {userData.class_year._class.degree}</Text>
                    </View>
                    <View>
                        <Text className="text-xl font-inter-regular">Turno {userData.class_year._class.shift}</Text>
                    </View>
                    <View>
                        <Text className="text-xl font-inter-regular">Curso {userData.class_year._class.type}</Text>
                    </View>
                </View>
                <View className="flex-1 px-10"></View>
            </ScrollView>
            <View className="px-10" style={{ paddingVertical: 25 }}>
                <SettingsItem onPress={logout}>
                    <LogOut color="black" />
                    <Text className="font-inter-regular text-xl">Sair</Text>
                </SettingsItem>
            </View>
        </SafeAreaView>
    );
};

export default Profile;
