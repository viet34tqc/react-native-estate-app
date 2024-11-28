import listingData from '@/assets/data/airbnb-listings.json';
import Colors from '@/constants/Colors';
import { LISTING_DETAIL_IMG_HEIGHT } from '@/constants/commons';
import { defaultStyles } from '@/constants/DefaultStyles';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  SlideInDown,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

const width = Dimensions.get('window').width;

const ListingDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const listing = (listingData as Record<string, any>[]).find(
    item => item.id === id
  );
  const navigation = useNavigation();

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  useLayoutEffect(() => {
    // Customize the default header of the page
    navigation.setOptions({
      headerBackground: () => (
        <Animated.View
          style={[headerAnimatedStyle, styles.header]}
        ></Animated.View>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="share-outline" size={22} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="heart-outline" size={22} color={'#000'} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={'#000'} />
        </TouchableOpacity>
      ),
    });
  }, []);

  // Paralax header image
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [
              -LISTING_DETAIL_IMG_HEIGHT,
              0,
              LISTING_DETAIL_IMG_HEIGHT,
              LISTING_DETAIL_IMG_HEIGHT,
            ],
            [
              -LISTING_DETAIL_IMG_HEIGHT / 2,
              0,
              LISTING_DETAIL_IMG_HEIGHT * 0.75,
            ]
          ),
        },
      ],
    };
  });

  // When scroll, the header transition from transparent to opaque
  // scrollOffset.value = 0 => opacity: 0
  // scrollOffset.value = LISTING_DETAIL_IMG_HEIGHT / 1.5 => opacity: 1
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOffset.value,
        [0, LISTING_DETAIL_IMG_HEIGHT / 1.5],
        [0, 1]
      ),
    };
  }, []);

  if (!listing) return <Text>Listing not found</Text>;

  return (
    <View style={styles.container}>
      {/* This must be Animated scroll view because useScrollViewOffset requires  */}
      <Animated.ScrollView
        ref={scrollRef}
        // Add some bottom padding to scroll view, using `style` doesn't work
        // This value must be higher than the height of the footer
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Animated.Image
          source={{ uri: listing?.xl_picture_url }}
          style={[styles.image, imageAnimatedStyle]}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{listing.name}</Text>
          <Text style={styles.location}>
            {listing.room_type} in {listing.smart_location}
          </Text>
          <Text style={styles.rooms}>
            {listing.guests_included} guests · {listing.bedrooms} bedrooms ·{' '}
            {listing.beds} bed · {listing.bathrooms} bathrooms
          </Text>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Ionicons name="star" size={16} />
            <Text style={styles.ratings}>
              {listing.review_scores_rating / 20} · {listing.number_of_reviews}{' '}
              reviews
            </Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.hostView}>
            <Image
              source={{ uri: listing.host_picture_url }}
              style={styles.host}
            />

            <View>
              <Text style={{ fontWeight: '500', fontSize: 16 }}>
                Hosted by {listing.host_name}
              </Text>
              <Text>Host since {listing.host_since}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>{listing.description}</Text>
        </View>
      </Animated.ScrollView>

      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(300)}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice}>€{listing.price}</Text>
            <Text>night</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]}
          >
            <Text style={defaultStyles.btnText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: LISTING_DETAIL_IMG_HEIGHT,
    width: width,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'mon-sb',
  },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: 'mon',
  },
  ratings: {
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerText: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: 'mon-sb',
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'mon',
  },
});

export default ListingDetail;
