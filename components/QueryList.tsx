import { Image, StyleSheet, Platform, FlatList, Pressable, View, Text } from 'react-native';
import React from 'react';
import { useQuery } from '@apollo/client';
import LIST_LAUNCHES from '../app/queries/list';
import { Link, useNavigation } from 'expo-router';

type QueryListType = {
  filter?: string
  onPress: (id: string) => void
}
type RocketType = {
  rocket_name?: string
  rocket_type?: string
}
type LaunchType = { 
  id: string
  mission_name?: string
  rocket?: RocketType
  details?: string
  launch_date_utc?: string
}
export default function QueryList({ filter, onPress } : QueryListType ) {
    const { loading, error, data } = useQuery(LIST_LAUNCHES);
    
    const navigation = useNavigation()
    console.log({ loading, error, data })
  return (
    <View>
         {loading && <Text>Loading...</Text>}
         {error && <Text>Error! {error.message}</Text>}
{!loading && !error && data && (
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={filter ? data?.launches
            ?.filter((item: LaunchType) => {
              if (item?.rocket?.rocket_name?.toLowerCase()?.includes(filter?.toLowerCase())) {
                return item
              }
          }) : ( data?.launches ?? [])}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>  
            <Pressable onPress={() => onPress(item.id)}>
                <View style={{ backgroundColor: 'dark-blue', borderWidth: 1, borderColor: 'black', margin: 4}}>
                    {item?.id && <Text>{`Id: ${item?.id}`}</Text>}
                    {item?.mission_name && <Text>{`Mission Name: ${item?.mission_name}`}</Text>}
                    {item?.rocket?.rocket_name &&<Text>{`Rocket Name: ${item?.rocket?.rocket_name}`}</Text>}
                    {item?.launch_date_utc && <Text>{`Launch Date (UTC): ${item?.launch_date_utc}`}</Text>}
                </View>
             </Pressable>
          // </Link>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
