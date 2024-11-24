import Colors from '@/constants/Colors';
import { Categories } from '@/constants/commons';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  onCategoryChanged: (category: string) => void;
};

function ExploreHeader({ onCategoryChanged }: Props) {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<View | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);

    // Measure the current item location and scroll to it
    selected?.measure(x => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });

    // Add vibration when press
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(Categories[index].name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.actionRow}>
        <Link href={'/(modals)/booking'} asChild>
          <TouchableOpacity>
            <View style={styles.searchBtn}>
              <Ionicons name="search" size={24} />
              <View>
                <Text style={{ fontFamily: 'mon-sb' }}>Where to?</Text>
                <Text style={{ color: Colors.grey, fontFamily: 'mon' }}>
                  Anywhere · Any week
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          gap: 20,
          paddingHorizontal: 16,
        }}
      >
        {Categories.map((item, index) => (
          <TouchableOpacity
            ref={el => (itemsRef.current[index] = el)}
            key={index}
            style={
              activeIndex === index
                ? { ...styles.categoriesBtn, ...styles.categoriesBtnActive }
                : styles.categoriesBtn
            }
            onPress={() => selectCategory(index)}
          >
            <MaterialIcons
              name={item.icon as any}
              size={24}
              color={activeIndex === index ? '#000' : Colors.grey}
            />
            <Text
              style={
                activeIndex === index
                  ? { ...styles.categoryText, ...styles.categoryTextActive }
                  : styles.categoryText
              }
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 150,
    elevation: 2, // Add a drop shadow to the container
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    paddingBlock: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 16,
  },

  searchBtn: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 10,
    padding: 14,
    alignItems: 'center',
    width: 260,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#c2c2c2',
    borderRadius: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#A2A0A2',
    borderRadius: 24,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'mon-sb',
    color: Colors.grey,
  },
  categoryTextActive: {
    color: '#000',
  },
  categoriesBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    borderBottomColor: '#000',
    borderBottomWidth: 2,
  },
});

export default ExploreHeader;
