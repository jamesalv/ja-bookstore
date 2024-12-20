import { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  RefreshControl,
  Alert,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { useAuth } from '../../../context/AuthContext';
import { BookCard } from '../../../components/BookCard';
import * as api from '../../../services/api';
import type { Book } from '../../../types';

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  async function loadBooks() {
    try {
      const data = await api.getBooks(searchQuery);
      setBooks(data);
    } catch (error) {
      console.error('Error loading books:', error);
    }
  }

  // useEffect(() => {
  //   loadBooks();
  // }, [searchQuery]);

  useFocusEffect(useCallback(() => {
    loadBooks();
  }, []));

  async function handleDelete(id: number) {
    Alert.alert(
      "Delete Book",
      "Are you sure you want to delete this book?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await api.deleteBook(id);
              setBooks(books.filter(book => book.id !== id));
            } catch (error) {
              Alert.alert('Error', 'Failed to delete book');
            }
          }
        }
      ]
    );
  }

  async function handleRefresh() {
    setRefreshing(true);
    await loadBooks();
    setRefreshing(false);
  }

  function handleEdit(bookId: number) {
    router.push(`/edit/${bookId}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search books..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Pressable style={styles.searchButton} onPress={loadBooks}>
          <Text style={styles.searchButtonText}>Search</Text>
        </Pressable>
      </View>
      <FlatList
        data={books}
        renderItem={({ item }) => (
          <BookCard 
            book={item} 
            onDelete={handleDelete}
            onEdit={() => handleEdit(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginRight: 16,
  },
  logoutButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  listContainer: {
    flexGrow: 1,
  },
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
  searchButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});