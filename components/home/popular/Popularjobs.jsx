import { View, Text, ActivityIndicator, FlatList, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from "react";

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard';

import useFetch from '../../../hook/useFetch';

const Popularjobs = () => {

  const router = useRouter();

  const [selectedJob, setSelectedJob] = useState();

  const { data, isLoading, error } = useFetch("search", {
    query: "React developer",
    num_pages: "1",
  });

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <Pressable onPress={() => router.push('/popular')}>
          <Text style={styles.headerBtn}>Show All</Text>
        </Pressable>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => <PopularJobCard
            item={item}
            selectedJob={selectedJob}
            handleCardPress={handleCardPress}/>}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{columnGap: SIZES.medium}}
            horizontal
          />
        )}
      </View>
    </View>
  )
}

export default Popularjobs