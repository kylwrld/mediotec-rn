import { View, Text, FlatList, ActivityIndicator, RefreshControl, TextInput, Pressable, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import useAuthContext from "../../context/AuthContext";
import { Pin, SendHorizontal } from "lucide-react-native";

const AnnouncementCard = ({ item }) => {
    const { postRequest } = useAuthContext();
    const [comment, setComment] = useState("");
    const { id } = item;

    async function sendComment() {
        const data = { body: comment, announcement: id };
        await postRequest("/comment/", data);
    }

    return (
        <Pressable
            style={styles.shadowProp}
            className="w-full"
            onPress={() => router.push({ pathname: `/announcement/[id]`, params: { id: item.id } })}>
            <View className="border border-gray-400 rounded-t-lg p-4 gap-5">
                <View className="justify-between flex-row">
                    <View>
                        <Text className="text-xl font-bold">{item.user.name}</Text>
                        <Text className="text-[#64748b]">{new Date(item.created_at).toLocaleString("pt-BR")}</Text>
                    </View>

                    {item.fixed && <Pin color="black" />}
                </View>
                <View className="gap-3">
                    <Text className="text-2xl font-bold">{item.title}</Text>
                    <Text className="text-lg">{item.body}</Text>
                </View>
            </View>
            <View className="flex-row border-b border-x border-gray-400 rounded-b-lg p-2">
                <TextInput
                    className="flex-1"
                    placeholder="Escreva um comentário..."
                    value={comment}
                    onChangeText={setComment}
                />
                <TouchableOpacity className="p-2" onPress={sendComment}>
                    <SendHorizontal color="#9ca3af" />
                </TouchableOpacity>
            </View>
        </Pressable>
    );
};

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const { id } = useLocalSearchParams();
    const { getRequest } = useAuthContext();

    const fetchAnnouncements = async () => {
        const response = await getRequest("announcement/");
        const data = await response.json();
        setAnnouncements(data.announcements);
    };
    useEffect(() => {
        setLoading(true);
        fetchAnnouncements();
        setLoading(false);
    }, []);

    function onRefresh() {
        setRefreshing(true);
        fetchAnnouncements();
        setRefreshing(false);
    }

    if (loading) return <ActivityIndicator />;

    return (
        <SafeAreaView className="flex-1 p-4 bg-white">
            <FlatList
                data={announcements}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return <AnnouncementCard item={item} />;
                }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                ListHeaderComponent={() => (
                    <View className="my-6">
                        <Text className="font-inter-bold text-blue-600 text-4xl">Avisos</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default Announcements;

const styles = StyleSheet.create({
    shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
  });
