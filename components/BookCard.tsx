import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Book } from '../types';

// Update BookCard component with edit button:
interface BookCardProps {
  book: Book;
  onDelete: (id: number) => void;
  onEdit: () => void;
}

export function BookCard({ book, onDelete, onEdit }: BookCardProps) {
  return (
    <View style={styles.card}>
      <Image
        // source={{ uri: book.imageUrl }}
        source={require('@/assets/img/placeholder.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>by {book.author}</Text>
        <Text style={styles.price}>${book.price}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {book.description}
        </Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.editButton]}
            onPress={onEdit}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.deleteButton]}
            onPress={() => onDelete(book.id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  button: {
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#2196F3',
    marginRight: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 150,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginTop: 8,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});