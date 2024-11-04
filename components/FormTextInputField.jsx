import { View, Text, TextInput } from "react-native";
import React from "react";

import "../global.css";

const FormTextInputField = ({ label, value, placeholder, onChangeText, error }) => {
    return (
        <View className="w-full gap-2">
            <Text className="font-inter-regular">{label}</Text>
            {/* <View className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-secondary flex flex-row items-center"> */}
            <TextInput
                className="font-inter-regular w-full px-4 py-2 rounded-lg border border-slate-300"
                placeholder={placeholder}
                placeholderTextColor="#94a3b8"
                onChangeText={onChangeText}
                value={value}
            />
            <View>
                {error && <Text className="font-inter-regular text-red-600">{error}</Text>}
            </View>
            {/* </View> */}
        </View>
    );
};

export default FormTextInputField;
