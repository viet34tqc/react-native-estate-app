import ExploreHeader from '@/components/explore/ExploreHeader';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';

const Tabs = () => {
  const [category, setCategory] = useState<Category['name']>('Tiny homes');

  const onCategoryChanged = (category: string) => {
    setCategory(category);
  };
  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      {/* Normally we can define custom header in the _Layout.txt of (tabs) */}
      {/* However, the state only belongs to Explore tab, so I move it here */}
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onCategoryChanged} />,
        }}
      />
    </View>
  );
};

export default Tabs;
