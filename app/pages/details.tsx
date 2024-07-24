import { Image, StyleSheet, Platform, Button } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import LAUNCH_DETAILS from '../queries/details';
import { useLocalSearchParams } from 'expo-router';

type LaunchDetailsProps = {
  route?: any;
  navigation?: any;
}
export default function LaunchDetails({ route, navigation }: LaunchDetailsProps) {
  const local = useLocalSearchParams();

  useEffect(() => {
    navigation?.setOptions({ 
      title: "Launch Details"
    })
  }, [])


  const { loading, error, data } = useQuery(LAUNCH_DETAILS, {
    variables: { 
      launchId: local?.id ?? route?.params?.id 
      // launchId: "5eb87d0dffd86e000604b35b" using this id for testing the graphql query
    }
  });

  return (
    <ThemedView style={styles.titleContainer}>
         {loading && !error && <ThemedText>Loading...</ThemedText>}
         {error && (
          <ThemedView style={styles.error}>
            <ThemedText>There was an error when we tried to fetch. Go back and try again {error?.message}</ThemedText>
            <Button title="Back to previous screen" 
            onPress={() => navigation.goBack()} />
          </ThemedView>
          )
          }
{!loading && !error && data && (
        <>
          <ThemedText>{`ID: ${ route?.params?.id}`}</ThemedText>
          {data?.launch?.rocket?.rocket_name && <ThemedText>{`Rocket Name: ${data?.launch?.rocket?.rocket_name}`}</ThemedText>}
          {data?.launch?.mission_name && <ThemedText>{`Mission Name: ${data?.launch?.mission_name}`}</ThemedText>}
          {data?.launch?.details && <ThemedText>{`Details: ${data?.launch?.details}`}</ThemedText>}
          {data?.launch?.launch_date_utc && <ThemedText>{`Date: ${data?.launch?.launch_date_utc}`}</ThemedText>}
          {data?.launch?.launch_site && <ThemedText>{`Site: ${data?.launch?.launch_site}`}</ThemedText>}
          {data?.launch?.links?.article_link && <ThemedText>{`Article: ${data?.launch?.links?.article_link}`}</ThemedText>}
          {data?.launch?.links?.video_link && <ThemedText>{`Video: ${data?.launch?.links?.video_link}`}</ThemedText>}
          </>
        )}
      
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'flex-start',
    flex: 1,
    gap: 8,
    margin: 8
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    margin: 8
  }
});
