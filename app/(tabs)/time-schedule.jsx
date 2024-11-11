import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthContext from "../../context/AuthContext";
import Spinner from "../../components/Spinner";
import { mergeLists } from "../../lib/utils";
import DataTable from "../../components/DataTable";

const MAX_TIMESCHEDULES = 8;

const TimeSchedule = () => {
    const [timeSchedules, setTimeSchedules] = useState([]);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    // const [defaultTimeSchedule, setDefaultTimeSchedule] = useState([]);

    const { user, getRequest } = useAuthContext();

    const fetchData = async () => {
        const userResponse = await getRequest(`student/${user.id}/`);
        const userData = await userResponse.json();
        setUserData(userData);

        const timeScheduleRequest = await getRequest(`time_schedule/?class_year=${userData.class_year?.id}`);
        const timeSchedulesData = await timeScheduleRequest.json();
        const defaultTimeScheduleTemp = Array.from({ length: MAX_TIMESCHEDULES }, () => ({})).map((item, index) => {
            item.hour = SHIFT_MORNING[index][0];
            item.minute = SHIFT_MORNING[index][1];
            item.monday_class_year_teacher_subject = null;
            item.tuesday_class_year_teacher_subject = null;
            item.wednesday_class_year_teacher_subject = null;
            item.thursday_class_year_teacher_subject = null;
            item.friday_class_year_teacher_subject = null;
            item.class_year = null;
            return item;
        });

        let newTimeSchedule = [];
        if (userData.class_year?._class.shift == "Tarde") {
            newTimeSchedule = defaultTimeScheduleTemp.map((item, index) => {
                return { ...item, hour: SHIFT_AFTERNOON[index][0], minute: SHIFT_AFTERNOON[index][1] };
            });
            newTimeSchedule = mergeLists(
                newTimeSchedule,
                timeSchedulesData.time_schedules,
                (item_first_list, item_second_list) => {
                    return (
                        item_first_list.hour == item_second_list.hour &&
                        item_first_list.minute == item_second_list.minute
                    );
                }
            );
        } else {
            newTimeSchedule = mergeLists(
                defaultTimeScheduleTemp,
                timeSchedulesData.time_schedules,
                (item_first_list, item_second_list) => {
                    return (
                        item_first_list.hour == item_second_list.hour &&
                        item_first_list.minute == item_second_list.minute
                    );
                }
            );
        }
        setLoading(false);
        setTimeSchedules(newTimeSchedule);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = React.useCallback(() => {
        // setRefreshing(true);
        setLoading(true);
        fetchData();
    }, []);

    if (loading) return <Spinner />;

    return (
        <SafeAreaView className="flex-1 bg-white p-4">
            <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}>
                <View className="my-6">
                    <Text className="font-inter-bold text-blue-600 text-4xl">Horários</Text>
                </View>
                <DataTable columns={columns} data={timeSchedules} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default TimeSchedule;

const MAX_WIDTH = "w-32";
const MAX_HEIGHT = "h-16";

const columns = [
    {
        accessorKey: "hour",
        header: ({ column }) => (
            <View className={`justify-center items-center ${MAX_HEIGHT}`}>
                <Text className={`font-inter-regular text-center w-20`}>Hora</Text>
            </View>
        ),
        cell: ({ row }) => (
            <View className={`justify-center items-center ${MAX_HEIGHT}`}>
                <Text className={`font-inter-regular text-center w-20`}>
                    {row.hour.toString() + "h" + (row.minute.toString() == "0" ? "" : row.minute.toString())}
                </Text>
            </View>
        ),
    },
    {
        accessorKey: "monday_class_year_teacher_subject",
        header: ({ column }) => (
            <View className={`justify-center items-center ${MAX_HEIGHT}`}>
                <Text className={`font-inter-regular text-center ${MAX_WIDTH}`}>Segunda</Text>
            </View>
        ),
        cell: ({ row }) => (
            <View className={`${MAX_WIDTH} justify-center items-center ${MAX_HEIGHT}`}>
                {row.monday_class_year_teacher_subject?.teacher_subject ? (
                    <>
                        <Text className="font-inter-semibold text-center">
                            {row.monday_class_year_teacher_subject?.teacher_subject.subject.name || "-"}
                        </Text>
                        <Text className="text-center text-[12px]">
                            {row.monday_class_year_teacher_subject?.teacher_subject.teacher.name}
                        </Text>
                    </>
                ) : (
                    <Text>-</Text>
                )}
            </View>
        ),
    },
    {
        accessorKey: "tuesday_class_year_teacher_subject",
        header: ({ column }) => (
            <View className={`justify-center items-center ${MAX_HEIGHT}`}>
                <Text className={`font-inter-regular text-center ${MAX_WIDTH}`}>Terça</Text>
            </View>
        ),
        cell: ({ row }) => (
            <View className={`${MAX_WIDTH} justify-center items-center ${MAX_HEIGHT}`}>
                {row.tuesday_class_year_teacher_subject?.teacher_subject ? (
                    <>
                        <Text className="font-inter-semibold text-center">
                            {row.tuesday_class_year_teacher_subject?.teacher_subject.subject.name || "-"}
                        </Text>
                        <Text className="text-center text-[12px]">
                            {row.tuesday_class_year_teacher_subject?.teacher_subject.teacher.name}
                        </Text>
                    </>
                ) : (
                    <Text>-</Text>
                )}
            </View>
        ),
    },
    {
        accessorKey: "wednesday_class_year_teacher_subject",
        header: ({ column }) => (
            <View className={`justify-center items-center ${MAX_HEIGHT}`}>
                <Text className={`font-inter-regular text-center ${MAX_WIDTH}`}>Quarta</Text>
            </View>
        ),
        cell: ({ row }) => (
            <View className={`${MAX_WIDTH} justify-center items-center ${MAX_HEIGHT}`}>
                {row.wednesday_class_year_teacher_subject?.teacher_subject ? (
                    <>
                        <Text className="font-inter-semibold text-center">
                            {row.wednesday_class_year_teacher_subject?.teacher_subject.subject.name || "-"}
                        </Text>
                        <Text className="text-center text-[12px]">
                            {row.wednesday_class_year_teacher_subject?.teacher_subject.teacher.name}
                        </Text>
                    </>
                ) : (
                    <Text>-</Text>
                )}
            </View>
        ),
    },
    {
        accessorKey: "thursday_class_year_teacher_subject",
        header: ({ column }) => (
            <View className={`justify-center items-center ${MAX_HEIGHT}`}>
                <Text className={`font-inter-regular text-center ${MAX_WIDTH}`}>Quinta</Text>
            </View>
        ),
        cell: ({ row }) => (
            <View className={`${MAX_WIDTH} justify-center items-center ${MAX_HEIGHT}`}>
                {row.thursday_class_year_teacher_subject?.teacher_subject ? (
                    <>
                        <Text className="font-inter-semibold text-center">
                            {row.thursday_class_year_teacher_subject?.teacher_subject.subject.name || "-"}
                        </Text>
                        <Text className="text-center text-[12px]">
                            {row.thursday_class_year_teacher_subject?.teacher_subject.teacher.name}
                        </Text>
                    </>
                ) : (
                    <Text>-</Text>
                )}
            </View>
        ),
    },
    {
        accessorKey: "friday_class_year_teacher_subject",
        header: ({ column }) => (
            <View className={`justify-center items-center ${MAX_HEIGHT}`}>
                <Text className={`font-inter-regular text-center ${MAX_WIDTH}`}>Sexta</Text>
            </View>
        ),
        cell: ({ row }) => (
            <View className={`${MAX_WIDTH} justify-center items-center ${MAX_HEIGHT}`}>
                {row.friday_class_year_teacher_subject?.teacher_subject ? (
                    <>
                        <Text className="font-inter-semibold text-center">
                            {row.friday_class_year_teacher_subject?.teacher_subject.subject.name || "-"}
                        </Text>
                        <Text className="text-center text-[12px]">
                            {row.friday_class_year_teacher_subject?.teacher_subject.teacher.name}
                        </Text>
                    </>
                ) : (
                    <Text>-</Text>
                )}
            </View>
        ),
    },
];

const SHIFT_MORNING = [
    [7, 0],
    [7, 50],
    [8, 40],
    [10, 0],
    [10, 50],
    [11, 40],
    [12, 30],
    [13, 20],
];
const SHIFT_AFTERNOON = [
    [13, 40],
    [14, 30],
    [15, 20],
    [16, 40],
    [17, 30],
    [18, 20],
    [19, 10],
    [20, 0],
];
