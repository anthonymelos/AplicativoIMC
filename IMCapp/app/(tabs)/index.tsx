import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';

export default function TabOneScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>⚖️</Text>
      </View>

      <Text style={styles.title}>Calculadora de IMC</Text>
      
      <Text style={styles.subtitle}>
        Calcule seu Índice de Massa Corporal e mais!
      </Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/two')} // Navega para aba da calculadora
      >
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>

    
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          💡 O IMC é uma medida internacional usada para calcular se uma pessoa está no peso ideal.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  iconContainer: {
    marginBottom: 30,
  },
  icon: {
    fontSize: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
    opacity: 0.7,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 50,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.6,
    lineHeight: 20,
  },
});