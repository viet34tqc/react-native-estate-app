import { Link } from 'expo-router';
import React from 'react';
import { Button, View } from 'react-native';

const index = () => {
  return (
    <View>
      <Link href="/login" asChild>
        <Button title="Login" />
      </Link>
      <View style={{ marginTop: 10 }}></View>
      <Link href="/listing/1" asChild style={{ marginTop: 10 }}>
        <Button title="Listing detail" />
      </Link>
    </View>
  );
};

export default index;
