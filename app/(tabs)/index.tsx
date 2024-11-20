import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

const index = () => {
  return (
    <View>
      <Link href="/login">Login</Link>
      <Link href="/listing/1">Login</Link>
    </View>
  );
};

export default index;
