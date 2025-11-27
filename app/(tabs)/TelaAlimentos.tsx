import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { useState } from 'react';

import { fetchDados, NutricaoInfo } from '@/app/src/services/foodApi';
// Dicionário de tradução PT-BR → EN
const TRADUCAO_ALIMENTOS: { [key: string]: string } = {
  // Frutas
  'banana': 'banana',
  'maçã': 'apple',
  'maca': 'apple',
  'laranja': 'orange',
  'morango': 'strawberry',
  'uva': 'grape',
  'melancia': 'watermelon',
  'abacaxi': 'pineapple',
  'manga': 'mango',
  'pera': 'pear',
  'limão': 'lemon',
  'limao': 'lemon',
  'abacate': 'avocado',
  
  // Carnes
  'frango': 'chicken',
  'peito de frango': 'chicken breast',
  'carne': 'beef',
  'bife': 'steak',
  'porco': 'pork',
  'peixe': 'fish',
  'salmão': 'salmon',
  'salmao': 'salmon',
  'atum': 'tuna',
  
  // Ovos e Laticínios
  'ovo': 'egg',
  'ovos': 'eggs',
  'leite': 'milk',
  'queijo': 'cheese',
  'iogurte': 'yogurt',
  'manteiga': 'butter',
  
  // Grãos e Cereais
  'arroz': 'rice',
  'feijão': 'beans',
  'feijao': 'beans',
  'lentilha': 'lentils',
  'grão de bico': 'chickpeas',
  'grao de bico': 'chickpeas',
  'aveia': 'oats',
  'pão': 'bread',
  'pao': 'bread',
  'macarrão': 'pasta',
  'macarrao': 'pasta',
  
  // Vegetais
  'batata': 'potato',
  'batata doce': 'sweet potato',
  'tomate': 'tomato',
  'cenoura': 'carrot',
  'brócolis': 'broccoli',
  'brocolis': 'broccoli',
  'alface': 'lettuce',
  'cebola': 'onion',
  'alho': 'garlic',
  'espinafre': 'spinach',
  
  // Outros
  'chocolate': 'chocolate',
  'açúcar': 'sugar',
  'acucar': 'sugar',
  'sal': 'salt',
  'azeite': 'olive oil',
  'óleo': 'oil',
  'oleo': 'oil',
};

// Dicionário de tradução EN → PT-BR para nomes de alimentos
const TRADUCAO_NOMES_EN_PT: { [key: string]: string } = {
  'banana': 'Banana',
  'apple': 'Maçã',
  'orange': 'Laranja',
  'strawberry': 'Morango',
  'grape': 'Uva',
  'watermelon': 'Melancia',
  'pineapple': 'Abacaxi',
  'mango': 'Manga',
  'pear': 'Pera',
  'lemon': 'Limão',
  'avocado': 'Abacate',
  'chicken': 'Frango',
  'chicken breast': 'Peito de Frango',
  'beef': 'Carne Bovina',
  'steak': 'Bife',
  'pork': 'Carne Suína',
  'fish': 'Peixe',
  'salmon': 'Salmão',
  'tuna': 'Atum',
  'egg': 'Ovo',
  'eggs': 'Ovos',
  'milk': 'Leite',
  'cheese': 'Queijo',
  'yogurt': 'Iogurte',
  'butter': 'Manteiga',
  'rice': 'Arroz',
  'beans': 'Feijão',
  'lentils': 'Lentilha',
  'chickpeas': 'Grão de Bico',
  'oats': 'Aveia',
  'bread': 'Pão',
  'pasta': 'Macarrão',
  'potato': 'Batata',
  'sweet potato': 'Batata Doce',
  'tomato': 'Tomate',
  'carrot': 'Cenoura',
  'broccoli': 'Brócolis',
  'lettuce': 'Alface',
  'onion': 'Cebola',
  'garlic': 'Alho',
  'spinach': 'Espinafre',
  'chocolate': 'Chocolate',
  'sugar': 'Açúcar',
  'salt': 'Sal',
  'olive oil': 'Azeite de Oliva',
  'oil': 'Óleo',
};

// import { buscarAlimento } from '@/app/src/services/foodApi';

export default function TelaAlimentos() {
  const router = useRouter();

  const [busca, setBusca] = useState('');
  const [dados, setDados] = useState<NutricaoInfo[]>([]);
  const [carregando, setCarregando] = useState(false);

  const traduzirParaIngles = (termo: string): string => {
    const termoLower = termo.toLowerCase().trim();
    return TRADUCAO_ALIMENTOS[termoLower] || termo;
  };

  const traduzirNomeParaPortugues = (nomeIngles: string): string => {
    return TRADUCAO_NOMES_EN_PT[nomeIngles.toLowerCase()] || nomeIngles;
  };

  const buscarDados = async (termoBusca: string) => {
    if (!termoBusca.trim()) {
      Alert.alert('Erro', 'Por favor, insira um alimento válido.');
      return;
    }
    
    // Traduz de PT para EN para buscar na API
    const termoTraduzido = traduzirParaIngles(termoBusca.trim());
    setCarregando(true);

    try {
      const resultados = await fetchDados(termoTraduzido);
      
      // Traduz os nomes dos resultados de EN para PT
      const resultadosTraduzidos = resultados.map(item => ({
        ...item,
        name: traduzirNomeParaPortugues(item.name)
      }));
      
      setDados(resultadosTraduzidos);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar os dados. Tente novamente mais tarde.');
      setDados([]);
    } finally {
      setCarregando(false);
    }
  };

  const limparBusca = () => {
    setBusca('');
    setDados([]);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Informações Nutricionais</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite o alimento (ex: banana, chicken...)"
          value={busca}
          onChangeText={setBusca}
          onSubmitEditing={() => buscarDados(busca)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonBuscar]}
            onPress={() => buscarDados(busca)}
            disabled={carregando || !busca.trim()}
          >
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonLimpar]}
            onPress={limparBusca}
          >
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {carregando && (
          <ActivityIndicator size="large" color="#27ae60"/>
        )}

        {!carregando && dados.length > 0 && (
          <View style={styles.resultadosWrapper}>
            {dados.map((item, index) => (
              <View key={index} style={styles.resultadoContainer}>
                <Text style={styles.itemNome}>{item.name}</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Porção:</Text>
                  <Text style={styles.infoValor}>{item.serving_size_g.toFixed(0)}g</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Carboidratos:</Text>
                  <Text style={styles.infoValor}>{item.carbohydrates_total_g.toFixed(1)}g</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Gorduras:</Text>
                  <Text style={styles.infoValor}>{item.fat_total_g.toFixed(1)}g</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Fibras:</Text>
                  <Text style={styles.infoValor}>{item.fiber_g.toFixed(1)}g</Text>
                </View>
                {item.sugar_g !== undefined && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Açúcares:</Text>
                    <Text style={styles.infoValor}>{item.sugar_g.toFixed(1)}g</Text>
                  </View>
                )}
                {item.sodium_mg !== undefined && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Sódio:</Text>
                    <Text style={styles.infoValor}>{item.sodium_mg.toFixed(0)}mg</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
        {!carregando && dados.length === 0 && (
          <View>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>Nenhum dado encontrado. Por favor, faça uma busca.</Text>
          </View>
        )
      }

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/(tabs)/three')}>
          <Text style={[styles.buttonText, { marginTop: 20, paddingHorizontal: 30, }]}>Ir para Página de agradecimentos!</Text>
        </TouchableOpacity>
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
  inputContainer: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonBuscar: {
    backgroundColor: '#007AFF',
  },
  buttonLimpar: {
    backgroundColor: '#95a5a6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultadoContainer: {
    backgroundColor: '#f0f0f0',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  resultadoTitulo: {
    fontSize: 18,
    marginBottom: 10,
  },
  itemTitulo: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
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
  resultadosWrapper: {
    backgroundColor: 'transparent',
  },
  itemNome: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textTransform: 'capitalize',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    backgroundColor: 'transparent',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: 'transparent',
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
});
