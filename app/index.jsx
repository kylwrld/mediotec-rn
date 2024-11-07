import { Redirect } from "expo-router";
import useAuthContext from "../context/AuthContext";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import Spinner from "../components/Spinner";
import Login from "./login";
import { StatusBar } from "expo-status-bar";

export default function App() {
    // const { user } = useAuthContext();
    // console.log(user)
    // return user?.type == "STUDENT" ? <Redirect href="/announcements" /> : <Login />;
    return (
        <SafeAreaView className="flex-1 bg-white">
            <Spinner />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

// export default function App() {
//     const [user, setUser] = useState({})
//     const { decodeToken } = useAuthContext();
//     useEffect(() => {
//         const getUser = async () => {
//             setUser(await decodeToken())
//         }
//         getUser()
//     }, [user])
//     // const { user } = useAuthContext();
// }
