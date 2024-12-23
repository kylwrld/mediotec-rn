import { Text, View, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { openURL, canOpenURL } from 'expo-linking'
import { Building, CircleDollarSign, Mail, Phone } from 'lucide-react-native'

const Info = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="my-6 p-4">
        <Text className="font-inter-bold text-blue-600 text-4xl">Informações</Text>
      </View>
        <View className="p-4 gap-4">
        <Text className="font-inter-semibold text-xl text-black">Mediotec Recife</Text>
          <TouchableOpacity className="rounded-md bg-orange-600 flex-start mx-16 p-4" onPress={() => openURL("whatsapp://send?text=Bom dia&phone=+558134136666")}>
            <View className="flex-row justify-center gap-2">
                <Phone color="#fff"></Phone>
                <Text className="font-inter-semibold text-white text-center">Número</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="rounded-md bg-orange-600 flex-start mx-16 p-4" onPress={() => openURL("mailto:senac@pe.senac.br")}>
            <View className="flex-row justify-center gap-2">
                <Mail color="#fff"></Mail>
                <Text className="font-inter-semibold text-white text-center">Email</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="rounded-md bg-orange-600 flex-start mx-16 p-4" onPress={() => openURL("https://www.google.com/")}>
            <View className="flex-row justify-center gap-2">
                <CircleDollarSign color="#fff"></CircleDollarSign>
                <Text className="font-inter-semibold text-white text-center">Financeiro</Text>
            </View>
          </TouchableOpacity>
        </View>
          <View className="p-4 gap-4">
            <Text className="font-inter-semibold text-xl text-black">Mediotec Recife</Text>
            <TouchableOpacity className="rounded-md bg-orange-600 flex-start mx-16 p-4" onPress={() => openURL("whatsapp://send?text=Bom dia&phone=+558133728250")}>
            <View className="flex-row justify-center gap-2">
                <Phone color="#fff"></Phone>
                <Text className="font-inter-semibold text-white text-center">Número</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity className="rounded-md bg-orange-600 flex-start mx-16 p-4" onPress={() => openURL("mailto:senac@pe.senac.br")}>
            <View className="flex-row justify-center gap-2">
                <Mail color="#fff"></Mail>
                <Text className="font-inter-semibold text-white text-center">Email</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity className="rounded-md bg-orange-600 flex-start mx-16 p-4" onPress={() => openURL("https://www.google.com/")}>
            <View className="flex-row justify-center gap-2">
                <CircleDollarSign color="#fff"></CircleDollarSign>
                <Text className="font-inter-semibold text-white text-center">Financeiro</Text>
            </View>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  );
}

export default Info
