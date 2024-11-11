import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Option = ({ options = [], onChange = () => {}, state, setState = () => {} }) => {
    // useEffect(() => {
    //     onChange({ selectedOption })
    // }, [selectedOption])

    function _onChange(selectedOption) {
        setState(selectedOption);
        onChange({ selectedOption });
    }

    return (
        <View className="pt-4 flex-row w-full gap-4 justify-between">
            {options.map((option, index) => {
                if (state == index) {
                    return (
                        <TouchableOpacity
                            key={index}
                            className="bg-orange-600 w-32 h-12 rounded-full justify-center items-center"
                            onPress={() => _onChange(index)}>
                            <Text className="font-inter-semibold text-white">{option}</Text>
                        </TouchableOpacity>
                    );
                } else {
                    return (
                        <TouchableOpacity
                            key={index}
                            className="border border-slate-400 w-32 h-12 rounded-full justify-center items-center"
                            onPress={() => _onChange(index)}>
                            <Text className="font-inter-semibold">{option}</Text>
                        </TouchableOpacity>
                    );
                }
            })}
        </View>
    );
};

export default Option;
