import { useAuth } from '@clerk/clerk-expo';
import React from 'react';
import { Text, View } from 'react-native';

const Profile = () => {
  const { userId } = useAuth();
  return (
    <View>
      <Text>{userId && userId}</Text>
    </View>
  );
};

export default Profile;
