import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import FormTextInputField from "../components/FormTextInputField";
import Spinner from "../components/Spinner";
import useAuthContext from "../context/AuthContext";

const BG_ONE = "bg-white";
const BG_TWO = "bg-blue-600";

export default function Login() {
    const { postLogin, decodeToken, user } = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    async function onSubmit() {
        setErrors({ email: "", password: "" });

        const newErrors = {};
        if (!email.includes("@")) {
            newErrors.email = 1;
            setErrors({ ...newErrors, email: "Formato de email inválido." });
        }

        if (Object.keys(newErrors).length != 0) return;

        setLoading(true);

        try {
            const res = await postLogin({ email, password });
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
        <View className={`flex-1 ${BG_ONE}`}>
            <ScrollView keyboardShouldPersistTaps="always">
                <View className={`jutify-center items-center w-full h-60 rounded-br-[120px] ${BG_TWO}`}>
                    <Image
                        className="max-w-[260px] h-full"
                        source={require("../assets/images/mediotec-mobile.webp")}
                        resizeMode="contain"
                    />
                    {/* <View className="items-center justify-center w-full h-full">
                        <Text className="font-inter-semibold text-4xl text-white">Login</Text>
                    </View> */}
                </View>
                <View className={`flex-1 ${BG_TWO}`}>
                    <View className={`flex-1 pt-24 items-center rounded-tl-[120px] px-10 gap-10 ${BG_ONE}`}>
                        {loading ? (
                            <Spinner />
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
                                    className="justify-center items-center w-full bg-orange-600 p-4 rounded-lg"
                                    onPress={onSubmit}>
                                    <Text className="text-lg text-white font-bold">Login</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
                <StatusBar backgroundColor="#2563eb" style="light" />
            </ScrollView>
        </View>
    );
}
