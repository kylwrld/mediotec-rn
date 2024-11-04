import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import FormTextInputField from "../components/FormTextInputField";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthContext from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";

export default function App() {
    const { postLogin, decodeToken, user } = useAuthContext();
    // if (isLogged) return <Redirect href="/announcements" />;

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    async function onSubmit() {
        setErrors({email: "", password: ""})

        const newErrors = {}
        if (!email.includes("@")) {
            newErrors.email = 1
            setErrors({ ...newErrors, email: "Formato de email inválido." });
        }

        if (Object.keys(newErrors).length != 0) return

        setLoading(true);

        try {
            const res = await postLogin({ email, password });
            console.log(user)
            const userData = await decodeToken();
            if (res.ok) {
                router.replace({ pathname: "/announcements", params: { id: userData.class_id } });
            }
        } catch (e) {
            throw e;
        } finally {
            setLoading(false);
        }
    }

    return (
        <View className="flex-1 bg-white">
            <ScrollView>
                <View className="jutify-center items-center bg-blue-600 w-full h-60 rounded-br-[120px]">
                    <Image
                        className="max-w-[260px] h-full"
                        source={require("../assets/images/mediotec-mobile.webp")}
                        resizeMode="contain"
                    />
                    {/* <View className="items-center justify-center w-full h-full">
                        <Text className="font-inter-semibold text-4xl text-white">Login</Text>
                    </View> */}
                </View>
                <View className="bg-blue-600 flex-1">
                    <View className="flex-1 pt-24 items-center bg-white rounded-tl-[120px] px-10 gap-10">
                        {loading ? (
                            <View className="w-full flex-1 justify-center items-center">
                                <ActivityIndicator size={70} color="#2563eb" />
                            </View>
                        ) : (
                            <>
                                <Text className="font-inter-semibold text-4xl">Login</Text>
                                <FormTextInputField
                                    label="Email"
                                    value={email}
                                    error={errors.email}
                                    onChangeText={setEmail}
                                    placeholder="Digite seu email"
                                />

                                <FormTextInputField
                                    label="Senha"
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Digite sua senha"
                                />

                                <TouchableOpacity
                                    className="justify-center items-center w-full bg-blue-600 p-4 rounded-lg"
                                    onPress={onSubmit}>
                                    <Text className="text-lg text-white font-bold">Login</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
