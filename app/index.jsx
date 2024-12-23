import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView, View } from "react-native";
import Spinner from "../components/Spinner";

export default function App() {
    // const { user } = useAuthContext();
    // console.log(user)
    // return user?.type == "STUDENT" ? <Redirect href="/announcements" /> : <Login />;
    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* <Image
                source={require("../assets/splash.png")}
            /> */}
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
