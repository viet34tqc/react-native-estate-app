import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const ListingDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log('id', id);
  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

export default ListingDetail;
