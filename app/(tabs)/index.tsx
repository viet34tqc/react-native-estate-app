import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import ExploreHeader from '@/components/explore/ExploreHeader';
import ListingsBottomSheet from '@/components/explore/ListingBottomSheet';
import ListingsMap from '@/components/explore/ListingsMap';
import { ListingCategory } from '@/libs/types';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
const Tabs = () => {
  const [category, setCategory] =
    useState<ListingCategory['name']>('Tiny homes');

  const onCategoryChanged = (category: string) => {
    setCategory(category);
  };
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      {/* Normally we can define custom header in the _Layout.txt of (tabs) */}
      {/* However, the state only belongs to Explore tab, so I move it here */}
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onCategoryChanged} />,
        }}
      />
      {/* <Listings category={category} /> */}
      <ListingsMap listings={listingsDataGeo} />
      <ListingsBottomSheet category={category} />
    </View>
  );
};

export default Tabs;
