import { AlarmClock, Brain, Calendar, CircleAlert, LogOut, Mail, Users } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "../../components/Spinner";
import useAuthContext from "../../context/AuthContext";

const SettingsItem = ({ children, onPress }) => {
    return (
        // <View className="flex-row gap-2">
        <TouchableOpacity onPress={onPress} className="items-center w-full flex-row gap-5">
            {children}
        </TouchableOpacity>
        // {/* </View> */}
    );
};

const ProfileItem = ({ children, icon }) => {
    return (
        <View className="items-start flex-row gap-5">
            <View className="pl-1 pt-1">{icon}</View>
            <View className="">{children}</View>
        </View>
    );
};

const Profile = () => {
    const [userData, setUserData] = useState({});
    const { user, getRequest, logout } = useAuthContext();
    const [loading, setLoading] = useState(true);

    const fetchUserData = async () => {
        const response = await getRequest(`student/${user.id}/`);
        const data = await response.json();
        setUserData(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const onRefresh = React.useCallback(() => {
        setLoading(true);
        fetchUserData();
    }, []);

    if (loading) return <Spinner />;

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}>
                <View className="gap-10">
                    <View className="h-60 justify-center items-center gap-5">
                        {userData.image && (
                            <View className="w-32 h-32 rounded-full p-[4px]">
                                <Image
                                    className="w-full h-full rounded-full"
                                    source={{ uri: userData.image }}
                                    resizeMode="contain"
                                />
                            </View>
                        )}
                        <Text className="font-inter-extrabold text-4xl">{userData.name}</Text>
                    </View>
                    <View className="px-10 gap-5">
                        <ProfileItem icon={<Mail color="#2563eb" />}>
                            <Text className="text-lg font-inter-regular text-slate-500">Email</Text>
                            <Text className="text-xl font-inter-regular">{userData.email}</Text>
                        </ProfileItem>

                        <ProfileItem icon={<Users color="#2563eb" />}>
                            <Text className="text-lg font-inter-regular text-slate-500">Turma</Text>
                            <Text className="text-xl font-inter-regular">
                                {userData.class_year?._class.name || "Não encontrado"}
                            </Text>
                        </ProfileItem>

                        <ProfileItem icon={<Calendar color="#2563eb" />}>
                            <Text className="text-lg font-inter-regular text-slate-500">Ano</Text>
                            <Text className="text-xl font-inter-regular">
                                {userData.class_year?._class.degree || "Não encontrado"}
                            </Text>
                        </ProfileItem>

                        <ProfileItem icon={<AlarmClock color="#2563eb" />}>
                            <Text className="text-lg font-inter-regular text-slate-500">Turno</Text>
                            <Text className="text-xl font-inter-regular">
                                {userData.class_year?._class.shift || "Não encontrado"}
                            </Text>
                        </ProfileItem>

                        <ProfileItem icon={<Brain color="#2563eb" />}>
                            <Text className="text-lg font-inter-regular text-slate-500">Curso</Text>
                            <Text className="text-xl font-inter-regular">
                                {userData.class_year?._class.type || "Não encontrado"}
                            </Text>
                        </ProfileItem>

                        <ProfileItem icon={<CircleAlert color="#2563eb" />}>
                            <Text className="text-lg font-inter-regular text-slate-500">Faltas</Text>
                            <Text className="text-xl font-inter-regular">
                                {userData.attendances || "Não encontrado"}
                            </Text>
                        </ProfileItem>
                        {/* <View className="border-t border-slate-300">
                        </View> */}
                        <SettingsItem onPress={logout}>
                            <View className="pl-1 pt-1">
                                <LogOut color="#2563eb" />
                            </View>
                            <Text className="font-inter-regular text-xl">Sair</Text>
                        </SettingsItem>
                    </View>
                </View>
            </ScrollView>
            {/* <View className="px-10" style={{ paddingVertical: 25 }}></View> */}
        </SafeAreaView>
    );
};

export default Profile;
