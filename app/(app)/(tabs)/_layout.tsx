import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable, Text } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function TabsLayout() {
  const { logout } = useAuth();
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Books',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="book" size={size} color={color} />
          ),
          animation: 'fade',
          headerRight: () => (
            <Pressable
              style={{ marginRight: 16, flexDirection: 'row', alignItems: 'center' }}
              onPress={logout}
            >
              <Text style={{marginRight: 4}}>Logout</Text>
              <FontAwesome name="sign-out" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add Book',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-square" size={size} color={color} />
          ),
          animation: 'fade',
        }}
      />
    </Tabs>
  );
}