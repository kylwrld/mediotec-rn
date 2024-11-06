import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthContext from "../../context/AuthContext";
import { mergeLists } from "../../lib/utils";
import Spinner from "../../components/Spinner";
import DataTable from "../../components/DataTable";

const Grades = () => {
    const { user, getRequest } = useAuthContext();
    const [subjects, setSujects] = useState([]);
    const [grades, setGrades] = useState([]);
    const [defaultGrades, setDefaultGrades] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubjects = async () => {
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
            setGrades(mergeLists(gradesList, gradesData.grades, (item, first_list_item) => item.teacher_subject.subject.name === first_list_item.teacher_subject.subject.name));
            setLoading(false);
        };

        fetchSubjects()
    }, []);

    if (loading) return <Spinner />

    return (
        <SafeAreaView className="p-4 flex-1 bg-white">
            <View className="my-6">
                <Text className="font-inter-bold text-blue-600 text-4xl">Conceitos</Text>
            </View>
            <DataTable columns={columns} data={grades} />
        </SafeAreaView>
    );
};

const columns = [
    {
        accessorKey: "teacher_subject",
        header: "Disciplina",
        cell: ({ row }) => <View className="justify-center"><Text className="font-inter-regular max-w-32 text-center w-32">{row.teacher_subject.subject.name}</Text></View>,
    },
    {
        accessorKey: "av1_1",
        header: "AV1",
        cell: ({ row }) => <View className="justify-center"><Text className="font-inter-regular max-w-32 text-center w-32">{row.av1_1 || "-"}</Text></View>,
    },
    {
        accessorKey: "av2_1",
        header: "AV2",
        cell: ({ row }) => <View className="justify-center"><Text className="font-inter-regular max-w-32 text-center w-32">{row.av2_1 || "-"}</Text></View>,
    },
    {
        accessorKey: "mu_1",
        header: "Menção da Unidade",
        cell: ({ row }) => <View className="justify-center"><Text className="font-inter-regular max-w-32 text-center w-32">{row.mu_1 || "-"}</Text></View>,
    },
    {
        accessorKey: "noa_1",
        header: "NOA",
        cell: ({ row }) => <View className="justify-center"><Text className="font-inter-regular max-w-32 text-center w-32">{row.noa_1 || "-"}</Text></View>,
    },
    {
        accessorKey: "cf_1",
        header: "Conceito Final",
        cell: ({ row }) => <View className="justify-center"><Text className="font-inter-regular max-w-32 text-center w-32">{row.cf_1 || "-"}</Text></View>,
    },

    {
        accessorKey: "av1_2",
        header: "AV1",
        cell: ({ row }) => <View className="justify-center"><Text className="font-inter-regular max-w-32 text-center w-32">{row.av1_2 || "-"}</Text></View>,
    },
    {
        accessorKey: "av2_2",
        header: "AV2",
        cell: ({ row }) => <View className="justify-center"><Text className="font-inter-regular max-w-32 text-center w-32">{row.av2_2 || "-"}</Text></View>,
    },
    {
        accessorKey: "mu_2",
        header: "Menção da Unidade",
        cell: ({ row }) => <View className="justify-center"><Text className="font-inter-regular max-w-32 text-center w-32">{row.mu_2 || "-"}</Text></View>,
    },
    {
        accessorKey: "noa_2",
        header: "NOA",
        cell: ({ row }) => <View className="justify-center"><Text className="font-inter-regular max-w-32 text-center w-32">{row.noa_2 || "-"}</Text></View>,
    },
    {
        accessorKey: "cf_2",
        header: "Conceito Final",
        cell: ({ row }) => <View className="justify-center"><Text className="font-inter-regular max-w-32 text-center w-32">{row.cf_2 || "-"}</Text></View>,
    },

    {
        accessorKey: "av1_3",
        header: "AV1",
        cell: ({ row }) => <View className="justify-center"><Text className="font-inter-regular max-w-32 text-center w-32">{row.av1_3 || "-"}</Text></View>,
    },
    {
        accessorKey: "av2_3",
        header: "AV2",
        cell: ({ row }) => <View className="justify-center"><Text className="font-inter-regular max-w-32 text-center w-32">{row.av2_3 || "-"}</Text></View>,
    },
    {
        accessorKey: "mu_3",
        header: "Menção da Unidade",
        cell: ({ row }) => <View className="justify-center"><Text className="font-inter-regular max-w-32 text-center w-32">{row.mu_3 || "-"}</Text></View>,
    },
    {
        accessorKey: "noa_3",
        header: "NOA",
        cell: ({ row }) => <View className="justify-center"><Text className="font-inter-regular max-w-32 text-center w-32">{row.noa_3 || "-"}</Text></View>,
    },
    {
        accessorKey: "cf_3",
        header: "Conceito Final",
        cell: ({ row }) => <View className="justify-center"><Text className="font-inter-regular max-w-32 text-center w-32">{row.cf_3 || "-"}</Text></View>,
    },
];

export default Grades;
