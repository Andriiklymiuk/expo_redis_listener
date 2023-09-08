import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

function useFetchApi() {
  const [latestMessage, setLatestMessage] = useState<string | null>(null);
  const [totalRequests, setTotalRequests] = useState<number>(0);

  async function fetchData() {
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      const response = await fetch(apiUrl!);
      const data = await response.json();

      setLatestMessage(data.latestMessage);
      setTotalRequests(data.totalRequests);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    latestMessage,
    totalRequests,
    fetchData,
  };
}

export default function App() {
  const { latestMessage, totalRequests, fetchData } = useFetchApi();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.message}><Text style={styles.title}>Server highlight message:</Text></Text>
        <Text style={styles.message}>{latestMessage}</Text>
        <Text style={styles.message}><Text style={styles.title}>Total requests:</Text> {totalRequests}</Text>
        <Button title="Fetch Again" onPress={fetchData} />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title:{
    fontWeight:'500'
  },
  message: {
    marginTop:16,
    paddingHorizontal:16,
    fontSize: 18,
  },
});



