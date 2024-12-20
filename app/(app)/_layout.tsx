import { Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Redirect } from 'expo-router';

export default function AppLayout() {
  const { token } = useAuth();

  if (!token) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="edit/[id]"
        options={{ 
          headerTitle: "Edit Book",
          headerBackTitle: "Back"
        }}
      />
    </Stack>
  );
}