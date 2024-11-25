import { router } from "expo-router";
import { default as React, useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "../../components/Spinner";
import useAuthContext from "../../context/AuthContext";
import { mergeLists } from "../../lib/utils";
import Option from "../../components/Option";

const GradeCard = ({ item, unit = 1 }) => {
    return (
        <>
            <View className="rounded-t-lg p-4 gap-5 justify-center bg-blue-600">
                <Text className="text-lg text-white font-inter-bold">{item.teacher_subject.subject.name}</Text>
            </View>
            <View className="border-x border-b border-slate-400 rounded-b-lg">
                <View className="flex-row justify-between p-2">
                    <Text className="font-inter-regular text-balance" textBreakStrategy="balanced" numberOfLines={3}>
                        AV1
                    </Text>
                    <View className="w-12 px-2 justify-center items-center">
                        <Text>{item[`av1_${unit}`] ?? "-"}</Text>
                    </View>
                </View>
                <View className="flex-row justify-between p-2 bg-slate-200">
                    <Text className="font-inter-regular text-balance" textBreakStrategy="balanced" numberOfLines={3}>
                        AV2
                    </Text>
                    <View className="w-12 px-2 justify-center items-center">
                        <Text>{item[`av2_${unit}`] ?? "-"}</Text>
                    </View>
                </View>
                <View className="flex-row justify-between p-2">
                    <Text className="font-inter-regular text-balance" textBreakStrategy="balanced" numberOfLines={3}>
                        Menção da Unidade
                    </Text>
                    <View className="w-12 px-2 justify-center items-center">
                        <Text>{item[`mu_${unit}`] ?? "-"}</Text>
                    </View>
                </View>
                <View className="flex-row justify-between p-2 bg-slate-200">
                    <Text className="font-inter-regular text-balance" textBreakStrategy="balanced" numberOfLines={3}>
                        NOA
                    </Text>
                    <View className="w-12 px-2 justify-center items-center">
                        <Text>{item[`noa_${unit}`] ?? "-"}</Text>
                    </View>
                </View>
                <View className="flex-row justify-between p-2">
                    <Text className="font-inter-regular text-balance" textBreakStrategy="balanced" numberOfLines={3}>
                        Conceito Final
                    </Text>
                    <View className="w-12 px-2 justify-center items-center">
                        <Text>{item[`cf_${unit}`] ?? "-"}</Text>
                    </View>
                </View>
            </View>
        </>
    );
};

const selectOptions = ["Unidade 1", "Unidade 2", "Unidade 3"];

function Index() {
    const { user, getRequest } = useAuthContext();
    const [grades, setGrades] = useState([]);
    const [unit, setUnit] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchGrades = async () => {
        // IMPLEMENTAR PARA PEGAR SOMENTE AS DISCIPLINAS ATRIBUIDAS A UMA TURMA /all_teacher_subject_class/<class_year>
        const response = await getRequest("subject/");
        const data = await response.json();
        const gradesList = data.subjects.map((subject) => {
            return {
                teacher_subject: { subject: { name: subject.name } },
                av1_1: null,
                av2_1: null,
                mu_1: null,
                noa_1: null,
                cf_1: null,
                av1_2: null,
                av2_2: null,
                mu_2: null,
                noa_2: null,
                cf_2: null,
                av1_3: null,
                av2_3: null,
                mu_3: null,
                noa_3: null,
                cf_3: null,
            };
        });

        const gradesResponse = await getRequest(`grade/${user.id}/2024/`);
        const gradesData = await gradesResponse.json();
        setGrades(
            mergeLists(
                gradesList,
                gradesData.grades,
                (item, first_list_item) =>
                    item.teacher_subject.subject.name === first_list_item.teacher_subject.subject.name
            )
        );
        setLoading(false);
    };

    useEffect(() => {
        fetchGrades();
    }, []);

    function onRefresh() {
        setLoading(true);
        fetchGrades();
    }

    const renderItem = useCallback(
        ({ item }) => {
            return <GradeCard item={item} unit={unit} />;
        },
        [unit]
    );

    if (loading) return <Spinner />;

    return (
        <SafeAreaView className="flex-1 p-4 bg-white">
            {/* <UnitCard unit={1}></UnitCard>
            <UnitCard unit={2}></UnitCard>
            <UnitCard unit={3}></UnitCard> */}
            <FlatList
                data={grades}
                keyExtractor={(_, index) => index}
                renderItem={renderItem}
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
                keyboardShouldPersistTaps="always"
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                ListHeaderComponent={<ListHeaderComponent setUnit={setUnit} user={user} />}
            />
        </SafeAreaView>
    );
}

const ListHeaderComponent = ({ setUnit, user }) => {
    const onOptionChange = ({ selected }) => {
        if (selected == 0) {
            setUnit(selected + 1);
        }
        if (selected == 1) {
            setUnit(selected + 1);
        }
        if (selected == 2) {
            setUnit(selected + 1);
        }
    };

    return (
        <View className="my-6">
            <Text className="font-inter-bold text-blue-600 text-4xl">Conceitos</Text>
            <Option options={selectOptions} onChange={onOptionChange} />
        </View>
    );
};

export default Index;
