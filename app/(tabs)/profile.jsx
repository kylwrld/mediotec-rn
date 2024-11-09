import { AlarmClock, Brain, Calendar, CircleAlert, LogOut, Mail, Users } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "../../components/Spinner";
import useAuthContext from "../../context/AuthContext";

const SettingsItem = ({ children, onPress }) => {
    return (
        // <View className="flex-row gap-2">
        <TouchableOpacity onPress={onPress} className="w-full flex-row gap-5">
            {children}
        </TouchableOpacity>
        // {/* </View> */}
    );
};

const ProfileItem = ({ children, icon }) => {
    return (
        <View className="flex-row gap-5">
            <View className="pl-1 pt-1">{icon}</View>
            <View>{children}</View>
        </View>
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
        fetchUserData();
    }, []);

    if (loading || refreshing) return <Spinner />;

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View className="h-40 justify-center items-center">
                    <Text className="font-inter-extrabold text-4xl">{userData.name}</Text>
                </View>
                <View className="px-10 gap-5">
                    <ProfileItem icon={<Mail color="#64748b" />}>
                        <Text className="text-lg font-inter-regular text-slate-500">Email</Text>
                        <Text className="text-xl font-inter-regular">{userData.email}</Text>
                    </ProfileItem>

                    <ProfileItem icon={<Users color="#64748b" />}>
                        <Text className="text-lg font-inter-regular text-slate-500">Turma</Text>
                        <Text className="text-xl font-inter-regular">{userData.class_year._class.name}</Text>
                    </ProfileItem>

                    <ProfileItem icon={<Calendar color="#64748b" />}>
                        <Text className="text-lg font-inter-regular text-slate-500">Ano</Text>
                        <Text className="text-xl font-inter-regular">{userData.class_year._class.degree}</Text>
                    </ProfileItem>

                    <ProfileItem icon={<AlarmClock color="#64748b" />}>
                        <Text className="text-lg font-inter-regular text-slate-500">Turno</Text>
                        <Text className="text-xl font-inter-regular">{userData.class_year._class.shift}</Text>
                    </ProfileItem>

                    <ProfileItem icon={<Brain color="#64748b" />}>
                        <Text className="text-lg font-inter-regular text-slate-500">Curso</Text>
                        <Text className="text-xl font-inter-regular">{userData.class_year._class.type}</Text>
                    </ProfileItem>

                    <ProfileItem icon={<CircleAlert color="#64748b" />}>
                        <Text className="text-lg font-inter-regular text-slate-500">Faltas</Text>
                        <Text className="text-xl font-inter-regular">{userData.attendances}</Text>
                    </ProfileItem>
                    <SettingsItem onPress={logout}>
                        <View className="pl-1 pt-1">
                            <LogOut color="black" />
                        </View>
                        <Text className="font-inter-regular text-xl">Sair</Text>
                    </SettingsItem>
                </View>
                <View className="flex-1 px-10"></View>
            </ScrollView>
            <View className="px-10" style={{ paddingVertical: 25 }}></View>
        </SafeAreaView>
    );
};

export default Profile;
