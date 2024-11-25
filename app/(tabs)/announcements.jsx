import { router } from "expo-router";
import { Pin, SendHorizontal } from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
    FlatList,
    Image,
    Keyboard,
    Pressable,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
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
        await postRequest("comment/", data);
        setComment("");
        Keyboard.dismiss();
    }

    return (
        <Pressable
            style={styles.shadowProp}
            className="w-full bg-white rounded-lg"
            onPress={() => router.push({ pathname: `/announcement/[id]`, params: { id: item.id } })}>
            <View className="">
                <View className="bg-blue-600 justify-between items-center flex-row rounded-t-lg p-4 gap-4">
                    <View className="flex-1 flex-row justify-center items-center gap-4">
                        {item.user.image && (
                            <View className="w-12 h-12">
                                <Image
                                    className="w-full h-full rounded-full"
                                    source={{ uri: item.user.image }}
                                    resizeMode="cover"
                                />
                            </View>
                        )}
                        <Text className="text-xl font-inter-bold flex-1 text-white" numberOfLines={1}>{item.title}</Text>
                    </View>

                    {item.fixed && <Pin color="white" />}
                </View>
                <View className="border-x border-slate-400 pb-4">
                    <View className="p-2 items-center flex-row gap-2">
                        <Text className="text-md font-inter-regular text-slate-500">{item.user.name}</Text>
                        <View className="h-[5px] w-[5px] bg-slate-500 rounded-full"></View>
                        <Text className="font-inter-regular text-[#64748b] text-slate-500">
                            {dateDiff(new Date(), new Date(item.created_at))} atrás
                        </Text>
                    </View>
                    {/* <View className="w-full h-[1px] bg-slate-400"></View> */}
                    <View className="p-2 justify-center">
                        <Text className="font-inter-regular text-lg">{item.body}</Text>
                    </View>
                </View>
            </View>
            <View className="flex-row border border-slate-400 rounded-b-lg p-2">
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
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                // updateCellsBatchingPeriod={500}
                // removeClippedSubviews={true}
                // windowSize={10}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
                keyboardShouldPersistTaps="always"
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                ListHeaderComponent={<ListHeaderComponent setFilter={setFilter} user={user} />}
            />
            <StatusBar backgroundColor="#fff" />
        </SafeAreaView>
    );
};

export default Announcements;

const ListHeaderComponent = ({ setFilter, user }) => {
    const onOptionChange = ({ selected }) => {
        if (selected == 0) {setFilter(() => (announcement) => announcement);}
        if (selected == 1) {setFilter(() => (announcement) => announcement.class_year?._class.id == user.class_id);}
        if (selected == 2) {setFilter(() => (announcement) => announcement.fixed);}
    };

    return (
        <View className="my-6">
            <Text className="font-inter-bold text-blue-600 text-4xl">Avisos</Text>
            <Option options={selectOptions} onChange={onOptionChange} />
        </View>
    );
};

const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});
