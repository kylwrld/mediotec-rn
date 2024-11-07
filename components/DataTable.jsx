import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";

// columns { accessor, header }

const DataTable = ({ columns = [], data = [] }) => {
    const renderItem = ({ item: row }) => {
        return (
            <View className="flex-row justify-between p-2">
                {columns.map((column, index) => (
                    <View key={index}>{column.cell({ row })}</View>
                ))}
            </View>
        );
    };

    return (
        <ScrollView className="h-fit" horizontal>
            <View className="h-fit w-full border border-slate-300 rounded-lg gap-2">
                <View className="flex-row justify-between py-2 border-b border-slate-300">
                    {columns.map((column, index) => (
                        <View className="px-2 justify-center items-center" key={index}>
                            <Text className="font-inter-regular text-center w-32">{column.header}</Text>
                        </View>
                    ))}
                </View>

                <FlatList
                    data={data}
                    renderItem={renderItem}
                    // keyExtractor={(item) => item.id}
                />
            </View>
        </ScrollView>
    );
};

export default DataTable;
