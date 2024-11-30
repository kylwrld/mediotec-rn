import { Text, View, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { openURL, canOpenURL } from 'expo-linking'

const info = () => {

  const [canOpenTelephone, setCanOpenTelephone] = useState(false);
  canOpenURL("tel:+5581987019406").then(canOpen => setCanOpenTelephone(canOpen));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="my-4 p-4">
        <Text className="font-inter-bold text-blue-600 text-4xl">Informações</Text>
      </View>
        <View className="p-4 gap-4">
        <Text className="font-inter-regular text-2xl text-slate-500 pb-4">Mediotec Recife</Text>
          <TouchableOpacity className="rounded-md bg-blue-600 flex-start mx-16 p-4" onPress={() => openURL("whatsapp://send?text=Olá&phone=+5581987019406")}>
            <Text className="font-inter-regular text- text-white text-center">Número Coordenação</Text>
          </TouchableOpacity>
          <TouchableOpacity className="rounded-md bg-blue-600 flex-start mx-16 p-4" onPress={() => openURL("mailto:admtest@gmail.com")}>
            <Text className="font-inter-regular text- text-white text-center">Email Coordenação</Text>
          </TouchableOpacity>
          <TouchableOpacity className="rounded-md bg-blue-600 flex-start mx-16 p-4" onPress={() => openURL("https:https//www.youtube.com/watch?v=Iig0kFj9Glg")}>
            <Text className="font-inter-regular text- text-white text-center">Financeiro</Text>
          </TouchableOpacity>
        </View>
          <View className="p-4 gap-4">
          <Text className="font-inter-regular text-2xl text-slate-500 pb-4">Mediotec Paulista</Text>
            <TouchableOpacity className="rounded-md bg-blue-600 flex-start mx-16 p-4" onPress={() => openURL("whatsapp://send?text=Olá&phone=+5581987019406")}>
              <Text className="font-inter-regular text- text-white text-center">Número Coordenação</Text>
            </TouchableOpacity>
            <TouchableOpacity className="rounded-md bg-blue-600 flex-start mx-16 p-4" onPress={() => openURL("mailto:admtest@gmail.com")}>
              <Text className="font-inter-regular text- text-white text-center">Email Coordenação</Text>
            </TouchableOpacity>
            <TouchableOpacity className="rounded-md bg-blue-600 flex-start mx-16 p-4" onPress={() => openURL("https://www.youtube.com/watch?v=Iig0kFj9Glg")}>
              <Text className="font-inter-regular text- text-white text-center">Financeiro</Text>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  );
}

export default infoS