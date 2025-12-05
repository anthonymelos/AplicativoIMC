import { Text, View } from '@/components/Themed';
import { ScrollView, StyleSheet } from 'react-native';

export default function TabThreeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Sobre o IMC</Text>

        {/* O que é IMC */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>O que é IMC?</Text>
          <Text style={styles.text}>
            O Índice de Massa Corporal (IMC) é uma medida internacional usada 
            para calcular se uma pessoa está no peso ideal.
          </Text>
        </View>

        {/* Tabela de Classificação */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Classificação</Text>
          
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableHeaderText}>IMC</Text>
              <Text style={styles.tableHeaderText}>Classificação</Text>
            </View>

            <View style={[styles.tableRow, { backgroundColor: '#e3f2fd' }]}>
              <Text style={styles.tableCell}>Abaixo de 18,5</Text>
              <Text style={[styles.tableCell, { color: '#e74c3c' }]}>Abaixo do peso</Text>
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
          <Text style={styles.sectionTitle}>Dicas Importantes</Text>
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
          <Text style={styles.sectionTitle}>Sobre o App</Text>
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
    backgroundColor: '#F5F7FA', // AJUSTE 1: Background global
  },

  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: '600', // AJUSTE 2: Reduzir de bold
    marginBottom: 30,
    textAlign: 'center',
    color: '#2E7D9C', // AJUSTE 3: Cor primária
  },

  // AJUSTE 4: Seção com melhor espaçamento
  section: {
    marginBottom: 30,
    backgroundColor: 'transparent',
  },

  // AJUSTE 5: Título da seção com cor
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    color: '#2E7D9C', // AJUSTE 6: Cor primária
  },

  // AJUSTE 7: Texto com melhor legibilidade
  text: {
    fontSize: 15,
    lineHeight: 26,
    color: '#fff8f8ff',
    fontWeight: '400',
  },

  // AJUSTE 8: Fórmula com card melhorado
  formula: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    padding: 20, // Aumentar de 15
    backgroundColor: '#E8F4F8', // Azul claro em vez de #f0f0f0
    borderRadius: 12, // Aumentar de 10
    borderLeftWidth: 4,
    borderLeftColor: '#2E7D9C', // AJUSTE 9: Adicionar borda colorida
    color: '#2E7D9C',
  },

  // AJUSTE 10: Tabela melhorada
  table: {
    borderWidth: 1,
    borderColor: '#ECF0F1',
    borderRadius: 12,
    overflow: 'hidden',
    // AJUSTE 11: Adicionar sombra à tabela
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },

  // AJUSTE 12: Header da tabela com cor primária
  tableHeader: {
    backgroundColor: '#2E7D9C', // Usar cor primária em vez de #333
  },

  tableHeaderText: {
    flex: 1,
    padding: 12,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },

  // AJUSTE 13: Células com melhor estilo
  tableCell: {
    flex: 1,
    padding: 14,
    textAlign: 'center',
    fontSize: 14,
    color: '#555555',
    fontWeight: '500',
  },

  smallText: {
    fontSize: 12,
    color: '#999999', // AJUSTE 14: Cor mais clara
    marginTop: 10,
    fontStyle: 'italic',
  },
});