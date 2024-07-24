import { Image, StyleSheet, Platform, TextInput, View, SafeAreaView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useState } from 'react';
import QueryList from '../../components/QueryList';

type HomeScreenProps = {
  navigation?: any;
}
export default function HomeScreen({ navigation }: HomeScreenProps) {

  const [filter, setFilter] = useState('')
  useEffect(() => {
    navigation?.setOptions({ 
      title: "Launch List"
    })
  }, [])
  return (

    <SafeAreaView style={styles.container}>
      <TextInput onChangeText={(text) => setFilter(text)}
        style={{ borderColor: 'black', borderWidth: 1}}
        placeholder='Type a rocket name here to filter'
        value={filter}
        />
      <QueryList filter={filter} onPress={(id) => {
          navigation.navigate('pages/details', {
            id: id
          })
      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
