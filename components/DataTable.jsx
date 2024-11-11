import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";

// columns { accessor, header }

const DataTable = ({ columns = [], data = [] }) => {
    const renderItem = ({ item: row, index }) => {
        const needBorder = index != data.length - 1;
        return (
            // row
            <View className={`flex-row justify-between p-2 ${needBorder ? "border-b border-slate-400" : ""}`}>
                {/* cell */}
                {columns.map((column, index) => (
                    <View key={index}>{column.cell({ row })}</View>
                ))}
            </View>
        );
    };

    return (
        <ScrollView className="h-fit">
            <ScrollView className="h-fit" horizontal>
                <View className="h-fit w-full border border-slate-400 rounded-lg gap-2">
                    <View className="flex-row justify-between py-2 border-b border-slate-400">
                        {/* pass header as render function like cell */}
                        {columns.map((column, index) => (
                            <View className="px-2 justify-center items-center" key={index}>
                                {column.header({ column })}
                            </View>
                        ))}
                    </View>

                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </ScrollView>
        </ScrollView>
    );
};

export default DataTable;
