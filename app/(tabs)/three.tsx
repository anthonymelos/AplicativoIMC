import { Text, View } from '@/components/Themed';
import { ScrollView, StyleSheet } from 'react-native';

export default function TabThreeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Sobre o IMC</Text>

        {/* O que é IMC */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 O que é IMC?</Text>
          <Text style={styles.text}>
            O Índice de Massa Corporal (IMC) é uma medida internacional usada 
            para calcular se uma pessoa está no peso ideal.
          </Text>
        </View>

        {/* Tabela de Classificação */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Classificação</Text>
          
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableHeaderText}>IMC</Text>
              <Text style={styles.tableHeaderText}>Classificação</Text>
            </View>

            <View style={[styles.tableRow, { backgroundColor: '#e3f2fd' }]}>
              <Text style={styles.tableCell}>Abaixo de 18,5</Text>
              <Text style={[styles.tableCell, { color: '#3498db' }]}>Abaixo do peso</Text>
            </View>

            <View style={[styles.tableRow, { backgroundColor: '#e8f5e9' }]}>
              <Text style={styles.tableCell}>18,5 - 24,9</Text>
              <Text style={[styles.tableCell, { color: '#2ecc71' }]}>Peso normal</Text>
            </View>

            <View style={[styles.tableRow, { backgroundColor: '#fff3e0' }]}>
              <Text style={styles.tableCell}>25,0 - 29,9</Text>
              <Text style={[styles.tableCell, { color: '#f39c12' }]}>Sobrepeso</Text>
            </View>

            <View style={[styles.tableRow, { backgroundColor: '#ffebee' }]}>
              <Text style={styles.tableCell}>Acima de 30,0</Text>
              <Text style={[styles.tableCell, { color: '#e74c3c' }]}>Obesidade</Text>
            </View>
          </View>
        </View>

        {/* Dicas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Dicas Importantes</Text>
          <Text style={styles.text}>
            • O IMC é apenas uma referência inicial{'\n'}
            • Consulte sempre um profissional de saúde{'\n'}
            • Pratique exercícios regularmente{'\n'}
            • Mantenha uma alimentação equilibrada{'\n'}
            • Hidrate-se adequadamente
          </Text>
        </View>

        {/* Créditos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ Sobre o App</Text>
          <Text style={styles.text}>
            Aplicativo desenvolvido como trabalho acadêmico de Desenvolvimento de Aplicativos Mobile.
          </Text>
          <Text style={styles.text}>Alunos: Anthony de Melo e Pedro Sales</Text>
          <Text style={styles.text}>Professor: Karithon Gomes</Text>

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  formula: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeader: {
    backgroundColor: '#333',
  },
  tableHeaderText: {
    flex: 1,
    padding: 12,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    padding: 12,
    textAlign: 'center',
    fontSize: 14,
  },
  smallText: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 10,
    fontStyle: 'italic',
  },
});