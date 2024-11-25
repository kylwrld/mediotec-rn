import React, { memo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Option = ({ options = [], onChange = () => {} }) => {
    const [selectedOption, setSelectedOption] = useState(0);
    // useEffect(() => {
    //     onChange({ selectedOption })
    // }, [selectedOption])

    function _onChange(selected) {
        setSelectedOption(selected)
        onChange({ selected });
    }

    return (
        <View className="pt-4 flex-row w-full gap-4 justify-between">
            <View className="flex-1 flex-row justify-between gap-4">
                {options.map((option, index) => {
                    if (selectedOption == index) {
                        return (
                            <TouchableOpacity
                                key={index}
                                className="bg-orange-600 flex-1 h-12 rounded-full justify-center items-center"
                                onPress={() => _onChange(index)}>
                                <Text className="font-inter-semibold text-white" numberOfLines={1}>{option}</Text>
                            </TouchableOpacity>
                        );
                    } else {
                        return (
                            <TouchableOpacity
                                key={index}
                                className="border border-slate-400 flex-1 h-12 rounded-full justify-center items-center"
                                onPress={() => _onChange(index)}>
                                <Text className="font-inter-semibold" numberOfLines={1}>{option}</Text>
                            </TouchableOpacity>
                        );
                    }
                })}
            </View>
        </View>
    );
};

export default Option;
