import { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as api from '../../../services/api';
import { Book } from '../../../types';

export default function EditBook() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState<Book | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadBook();
  }, [id]);

  async function loadBook() {
    try {
      const data = await api.getBookById(parseInt(id));
      setBook(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load book');
      router.back();
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    if (!book) return;

    try {
      await api.updateBook(parseInt(id), book);
      Alert.alert('Success', 'Book updated successfully', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update book');
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Text>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={book.title}
        onChangeText={(text) => setBook({ ...book, title: text })}
      />
      <Text>Author</Text>
      <TextInput
        style={styles.input}
        placeholder="Author"
        value={book.author}
        onChangeText={(text) => setBook({ ...book, author: text })}
      />
      <Text>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={book.description}
        onChangeText={(text) => setBook({ ...book, description: text })}
        multiline
        numberOfLines={4}
      />
      <Text>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={book.price.toString()}
        onChangeText={(text) => setBook({ ...book, price: parseFloat(text) || 0 })}
        keyboardType="decimal-pad"
      />
      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Update Book</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    minHeight: 48,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});