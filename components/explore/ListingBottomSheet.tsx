import React from 'react';
import { Text, View } from 'react-native';

// This component display the listings from the bottom sheet
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Listings from './Listings';

interface Props {
  category: string;
}

// Bottom sheet that wraps our Listings component
const ListingsBottomSheet = ({ category }: Props) => {
  const snapPoints = useMemo(() => ['10%', '100%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [refresh, setRefresh] = useState<number>(0);

  const onShowMap = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  };

  return (
    <GestureHandlerRootView style={styles.sheetContainer}>
      <BottomSheet
        ref={bottomSheetRef}
        // index 1 means the bottomSheet display at the first snap point in snapPoints array
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        handleIndicatorStyle={{ backgroundColor: Colors.grey }}
      >
        <View style={styles.contentContainer}>
          <Listings refresh={refresh} category={category} />

          {/* Click this button to return to the map */}
          <View style={styles.mapButtonWrapper}>
            <TouchableOpacity onPress={onShowMap} style={styles.btn}>
              <Text style={{ fontFamily: 'mon-sb', color: '#fff' }}>Map</Text>
              <Ionicons
                name="map"
                size={20}
                style={{ marginLeft: 10 }}
                color={'#fff'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.grey,
  },
  mapButtonWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 14,
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
});

export default ListingsBottomSheet;
