import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {View,Text,SafeAreaView,ScrollView,ActivityIndicator,RefreshControl} from "react-native";
import {Company,JobAbout,JobFooter,JobTabs,ScreenHeaderBtn,Specifics} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

const tabs = ["About", "Qualification", "Responsibilities"];

const jobDetails = () => {
    const params = useLocalSearchParams();

    const router = useRouter();

    const [refreshing, setRefreshing] = useState(false);

    const [activeTab, setActiveTab] = useState(tabs[0])

    const onRefresh = useCallback(() => {})

    const { data, isLoading, refetch } = useFetch("job-details", {
        job_id: params.id,
    });

    console.log("data", data);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => router.back()}/>
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="60%"/>
                    ),
                    headerTitle: ''
                }}
            />
            <>
            <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            >
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary}/>
                ) : data === null ? (
                    <Text>No data found</Text>
                ) : (
                    <View style={{padding: SIZES.medium, paddingBottom: 100}}>
                    <Company
                        companyLogo={data[0]?.employer_logo}
                        jobTitle={data[0]?.job_title}
                        companyName={data[0]?.employer_name}
                        location={data[0]?.job_country}
                    />
                    <JobTabs
                        tabs={tabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    </View>
                )}
            </ScrollView>
            </>
        </SafeAreaView>
    )
}

export default jobDetails