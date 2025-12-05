import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function TabOneScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Calculadora de IMC</Text>
      
      <Text style={styles.subtitle}>
        Calcule seu Índice de Massa Corporal e veja a tabela nutricional!
      </Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/TelaCalculadora')} // Navega para aba da calculadora
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
    backgroundColor: '#F5F7FA',
  },
  iconContainer: {
    marginBottom: 30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8F4F8', 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2E7D9C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },

  icon: {
    fontSize: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#2E7D9C',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
    color: '#666666',
    lineHeight: 22,
  },

  button: {
    backgroundColor: '#2E7D9C', 
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#2E7D9C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  infoContainer: {
    marginTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#27AE60',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  infoText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555555', 
    lineHeight: 22,
  },
});
