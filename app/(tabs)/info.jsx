import { StyleSheet, Text, View, Linking, Button} from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { openURL, canOpenURL } from 'expo-linking'

const info = () => {

  const [canOpenTelephone, setCanOpenTelephone] = useState(false);
  canOpenURL("tel:+5581987019406").then(canOpen => setCanOpenTelephone(canOpen));

  return (
    <SafeAreaView className="justify-center items-center flex-1">
        {/* <Text className="justify-center items-center"> Número Coordenação </Text> */}
        <Button className= "bg-white"
        onPress={() => openURL("tel:+5581987019406")} title="Número Coordenação"/>
        <Button className= "bg-white"
        onPress={() => openURL("mailto:admtest@gmail.com")} title="Email Coordenação"/>
    </SafeAreaView>
);
}

export default info