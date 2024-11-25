import { default as React, useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthContext from "../../context/AuthContext";
import { mergeLists } from "../../lib/utils";
import Spinner from "../../components/Spinner";

const DayCard = ({ day, timeSchedules, keyExtractor }) => {
    return (
        <View>
            <View className="rounded-t-lg p-4 justify-center bg-blue-600">
                <Text className="text-lg text-white font-inter-bold">{day}</Text>
            </View>
            {/* <View className="bg-red-600 w-fit border-x border-b border-slate-400 rounded-b-lg"> */}
                {timeSchedules
                    ? timeSchedules.map((timeSchedule, index) => (
                          <View
                              className={`flex-row justify-between items-center border-x border-slate-400
                                            ${index % 2 == 0 && "bg-slate-200"}
                                            ${index == timeSchedules.length - 1 && "rounded-b-lg border-b"}
                                            px-2 py-[2px]`}
                              key={index}>
                              <Text
                                  className="font-inter-regular text-balance"
                                  textBreakStrategy="balanced">
                                  {timeSchedule.hour + "h" + (timeSchedule.minute == "0" ? "00" : timeSchedule.minute)}
                              </Text>
                              <View className="px-2 justify-center items-end">
                                  {timeSchedule[keyExtractor]?.teacher_subject.subject.name ? (
                                      <View className="items-end">
                                          <Text className="font-inter-semibold">
                                              {timeSchedule[keyExtractor]?.teacher_subject.subject.name ?? "-"}
                                          </Text>
                                          <Text className="font-inter-regular text-sm">
                                              {timeSchedule[keyExtractor]?.teacher_subject.teacher.name ?? "-"}
                                          </Text>
                                      </View>
                                  ) : (
                                      <View className="p-2">
                                          <Text>-</Text>
                                      </View>
                                  )}
                              </View>
                          </View>
                      ))
                    : null}
            {/* </View> */}
        </View>
    );
};

function TimeSchedule() {
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

        setTimeSchedules(newTimeSchedule);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = React.useCallback(() => {
        setLoading(true);
        fetchData();
    }, []);

    if (loading) return <Spinner />;

    return (
        <SafeAreaView className="flex-1 bg-white p-4 mt-6">
            <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}>
                <Text className="font-inter-bold text-blue-600 text-4xl">Horários</Text>
                <View className="my-6 gap-4">
                    <DayCard
                        day="Segunda"
                        timeSchedules={timeSchedules}
                        keyExtractor="monday_class_year_teacher_subject"
                    />
                    <DayCard
                        day="Terça"
                        timeSchedules={timeSchedules}
                        keyExtractor="tuesday_class_year_teacher_subject"
                    />
                    <DayCard
                        day="Quarta"
                        timeSchedules={timeSchedules}
                        keyExtractor="wednesday_class_year_teacher_subject"
                    />
                    <DayCard
                        day="Quinta"
                        timeSchedules={timeSchedules}
                        keyExtractor="thursday_class_year_teacher_subject"
                    />
                    <DayCard
                        day="Sexta"
                        timeSchedules={timeSchedules}
                        keyExtractor="friday_class_year_teacher_subject"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default TimeSchedule;

const MAX_TIMESCHEDULES = 8;

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
