import { useLocalSearchParams } from "expo-router";
import { Dot, SendHorizontal, Users } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "../../components/Spinner";
import useAuthContext from "../../context/AuthContext";

const AnnouncementId = () => {
    const { id } = useLocalSearchParams();
    const [announcement, setAnnouncement] = useState({});
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");

    const { getRequest, postRequest } = useAuthContext();

    const fetchAnnouncement = async () => {
        const response = await getRequest(`announcement/${id}`);
        const data = await response.json();
        setAnnouncement(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchAnnouncement();
    }, [announcement]);

    if (loading) return <Spinner />;

    async function sendComment() {
        if (comment.trim() == "") return;
        const data = { body: comment, announcement: id };
        const response = await postRequest("/comment/", data);
        const commentData = (await response.json()).comment;
        setAnnouncement({ ...announcement, comments: [...announcement.comments, commentData] });
    }

    return (
        <SafeAreaView className="flex-1 bg-white p-4 gap-10">
            <ScrollView>
                <View className="gap-2">
                    <Text className="font-inter-bold text-2xl my-6">{announcement.title}</Text>
                    {/* <Text className="font-inter-regular text-xl">ASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASD ASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASD</Text> */}
                    <View className="flex-row items-center">
                        <Text className="font-inter-regular text-lg text-gray-500">{announcement.user.name}</Text>
                        <Dot color="#6b7280" />
                        <Text className="font-inter-regular text-lg text-gray-500">
                            {new Date(announcement.created_at).toLocaleString("pt-BR")}
                        </Text>
                    </View>
                    <View className="border-t-[1px] border-slate-300 my-2"></View>
                </View>
                <View className="py-4">
                    <Text className="font-inter-regular text-xl">{announcement.body}</Text>
                    {/* <Text className="font-inter-regular text-xl">ASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASD ASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASDASDPJASDIASD DASIASDJASDIOJASD ASDIASDJIOASD DIJASD</Text> */}
                </View>
                <View className="h-full gap-4">
                    <View className="border-t-[1px] border-slate-300 my-2"></View>
                    <View className="w-full gap-4">
                        <View className="flex-row gap-2">
                            <Users color="black" />
                            {announcement.comments.length > 0 ? (
                                <Text className="font-inter-regular ">
                                    {announcement.comments.length} comentário da turma
                                </Text>
                            ) : announcement.comments.length > 1 ? (
                                <Text className="font-inter-regular ">
                                    {announcement.comments.length} comentários da turma
                                </Text>
                            ) : (
                                <Text className="font-inter-regular ">Comentários da turma</Text>
                            )}
                        </View>
                        <View className="w-full gap-5">
                            {announcement.comments.length > 0
                                ? announcement.comments.map((commentObj) => (
                                      <View key={commentObj.id}>
                                          <View className="flex-row gap-3">
                                              <Text className="font-inter-semibold">{commentObj.user.name}</Text>
                                              <Text className="font-inter-regular text-gray-500">
                                                  {new Date(commentObj.created_at).toLocaleString("pt-BR")}
                                              </Text>
                                          </View>
                                          <Text className="font-inter-regular ">{commentObj.body}</Text>
                                      </View>
                                  ))
                                : null}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View className="flex-row items-center gap-2">
                <TextInput
                    placeholder="Adicionar comentário para a turma..."
                    className="font-inter-regular flex-1 border-[1px] border-slate-300 rounded-lg px-4 py-2 focus:border-slate-500"
                    value={comment}
                    onChangeText={setComment}
                />
                <TouchableOpacity className="px-2" onPress={sendComment}>
                    <SendHorizontal color="#9ca3af" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default AnnouncementId;
