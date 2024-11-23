import ExploreHeader from '@/components/explore/ExploreHeader';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { useState } from 'react';
const TabsLayout = () => {
  const [category, setCategory] = useState<Category['name']>('Tiny homes');

  const onCategoryChanged = (category: string) => {
    setCategory(category);
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: {
          fontFamily: 'mon-sb',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Explore',
          header: () => <ExploreHeader onCategoryChanged={onCategoryChanged} />,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
