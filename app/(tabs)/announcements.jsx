import { router } from "expo-router";
import { Pin, SendHorizontal } from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Keyboard, Pressable, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Option from "../../components/Option";
import Spinner from "../../components/Spinner";
import useAuthContext from "../../context/AuthContext";
import { dateDiff } from "../../lib/utils";
import { StatusBar } from "expo-status-bar";

const AnnouncementCard = ({ item }) => {
    const { postRequest } = useAuthContext();
    const [comment, setComment] = useState("");
    const { id } = item;

    async function sendComment() {
        const data = { body: comment, announcement: id };
        await postRequest("/comment/", data);
        setComment("")
        Keyboard.dismiss()
    }

    return (
        <Pressable
            style={styles.shadowProp}
            className="w-full bg-white rounded-lg"
            onPress={() => router.push({ pathname: `/announcement/[id]`, params: { id: item.id } })}>
            <View className="border border-slate-400 rounded-t-lg p-4 gap-5">
                <View className="justify-between flex-row">
                    <View className="flex-row justify-center items-center gap-2">
                        <Text className="text-xl font-bold">{item.user.name}</Text>
                        {/* <Text className="text-[#64748b]">{new Date(item.created_at).toLocaleString("pt-BR")}</Text> */}
                        <View className="h-[5px] w-[5px] bg-slate-400 rounded-full"></View>
                        <Text className="text-[#64748b]">{dateDiff(new Date(), new Date(item.created_at))}</Text>
                        {/* <Text className="text-slate-400">{dateDiff(new Date(), new Date(item.created_at))}</Text> */}
                    </View>

                    {item.fixed && <Pin color="black" />}
                </View>
                <View className="gap-3">
                    <Text className="text-2xl font-bold">{item.title}</Text>
                    <Text className="text-lg">{item.body}</Text>
                </View>
            </View>
            <View className="flex-row border-b border-x border-slate-400 rounded-b-lg p-2">
                <TextInput
                    className="flex-1"
                    placeholder="Escreva um comentário..."
                    placeholderTextColor="#64748b"
                    value={comment}
                    onChangeText={setComment}
                />
                <TouchableOpacity className="p-2" onPress={sendComment}>
                    <SendHorizontal color="#64748b" />
                </TouchableOpacity>
            </View>
        </Pressable>
    );
};

const selectOptions = ["Todos", "Turma", "Fixados"];

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [filter, setFilter] = useState(() => (announcement) => announcement);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(0);
    const { getRequest, user } = useAuthContext();

    const fetchAnnouncements = async () => {
        const response = await getRequest("announcement/");
        const data = await response.json();
        setAnnouncements(data.announcements);
        setLoading(false);
    };
    useEffect(() => {
        fetchAnnouncements();
    }, []);

    function onRefresh() {
        setLoading(true);
        fetchAnnouncements();
    }

    const renderItem = useCallback(({ item }) => {
        return <AnnouncementCard item={item} />;
    }, []);

    if (loading || loading) return <Spinner />;

    return (
        <SafeAreaView className="flex-1 p-4 bg-white">
            <FlatList
                data={announcements.filter(filter)}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
                keyboardShouldPersistTaps="always"
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                ListHeaderComponent={() => (
                    <View className="my-6">
                        <Text className="font-inter-bold text-blue-600 text-4xl">Avisos</Text>
                        <Option
                            options={selectOptions}
                            state={selectedOption}
                            setState={setSelectedOption}
                            onChange={({ selectedOption }) => {
                                if (selectedOption == 0) {setFilter(() => (announcement) => announcement);}
                                if (selectedOption == 1) {setFilter(() => (announcement) => announcement.class_year?._class.id == user.class_id);}
                                if (selectedOption == 2) {setFilter(() => (announcement) => announcement.fixed);}
                            }}
                        />
                    </View>
                )}
            />
            <StatusBar backgroundColor="#fff" />
        </SafeAreaView>
    );
};

export default Announcements;

const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});
