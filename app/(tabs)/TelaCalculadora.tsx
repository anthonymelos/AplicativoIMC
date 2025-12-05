import { Text, View } from '@/components/Themed';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

type RootStackParamList = {
  TabTwo: undefined;
  FoodRecommendations: {
    imc: number;
    classificacao: string;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TabTwo'>;

export default function TabTwoScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState<number | null>(null);
  const [classificacao, setClassificacao] = useState('');
  const [corClassificacao, setCorClassificacao] = useState('#000');

  const calcularIMC = () => {
    if (!peso || !altura) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos!');
      return;
    }

    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaNum = parseFloat(altura.replace(',', '.'));

    if (isNaN(pesoNum) || isNaN(alturaNum) || pesoNum <= 0 || alturaNum <= 0) {
      Alert.alert('Erro', 'Por favor, insira valores válidos!');
      return;
    }

    const imcCalculado = pesoNum / (alturaNum * alturaNum);
    setImc(imcCalculado);

    let classif = '';
    let cor = '';

    if (imcCalculado < 18.5) {
      classif = 'Abaixo do peso';
      cor = '#3498db'; 
    } else if (imcCalculado < 25) {
      classif = 'Peso normal';
      cor = '#2ecc71'; 
    } else if (imcCalculado < 30) {
      classif = 'Sobrepeso';
      cor = '#f39c12'; 
    } else {
      classif = 'Obesidade';
      cor = '#e74c3c';
    }

    setClassificacao(classif);
    setCorClassificacao(cor);
  };
//alterar
  const navegarParaRecomendacoes = () => {
    if (imc !== null) {
      navigation.navigate('TelaAlimentos', {
        imc,
        classificacao,
      });
    }
  };

  // FUNÇÃO PARA LIMPAR
  const limpar = () => {
    setPeso('');
    setAltura('');
    setImc(null);
    setClassificacao('');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Calculadora de IMC</Text>
        
        {/*Peso */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Peso (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 70"
            keyboardType="numeric"
            value={peso}
            onChangeText={setPeso}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Altura (m)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 1.75"
            keyboardType="numeric"
            value={altura}
            onChangeText={setAltura}
          />
        </View>

        {/* Botões */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.buttonCalcular]}
            onPress={calcularIMC}
          >
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.buttonLimpar]}
            onPress={limpar}
          >
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {/* Resultado */}
        {imc !== null && (
          <View style={styles.resultadoContainer}>
            <Text style={styles.resultadoTitulo}>Seu IMC:</Text>
            <Text style={[styles.imcValor, { color: corClassificacao }]}>
              {imc.toFixed(2)}
            </Text>
            <Text style={[styles.classificacao, { color: corClassificacao }]}>
              {classificacao}
            </Text>
            <TouchableOpacity 
              style={styles.buttonRecomendacoes}
              onPress={navegarParaRecomendacoes}
            >
              <Text style={styles.buttonRecomendacoesText}>
                Busque alimentos
              </Text>
                </TouchableOpacity>
          </View>
        )}

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
    color: '#2E7D9C', // AJUSTE 3: Usar cor primária
  },

  inputContainer: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },

  // AJUSTE 4: Label com melhor estilo
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
    color: '#34495E', // Cinza escuro
    textTransform: 'uppercase', // AJUSTE 5: Maiúsculas para destaque
    letterSpacing: 0.5,
  },

  // AJUSTE 6: Input com melhor design
  input: {
    borderWidth: 2, // Aumentar de 1 para mais destaque
    borderColor: '#ECF0F1', // Cor secundária
    borderRadius: 12, // AJUSTE 7: Aumentar de 10
    padding: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF', // Branco em vez de #f9f9f9
    color: '#333333',
    fontWeight: '500',
    // AJUSTE 8: Adicionar transição visual (focus)
    // (Em React Native, use onFocus para mudar borderColor)
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: 'transparent',
    gap: 10, // AJUSTE 9: Adicionar espaçamento entre botões
  },

  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12, // AJUSTE 10: Aumentar de 10
    alignItems: 'center',
    marginHorizontal: 5,
    // AJUSTE 11: Adicionar transição
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  // AJUSTE 12: Substituir #007AFF pela cor primária
  buttonCalcular: {
    backgroundColor: '#2E7D9C',
  },

  // AJUSTE 13: Melhorar cor do botão limpar
  buttonLimpar: {
    backgroundColor: '#95A5A6',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600', // Reduzir de bold
  },

  // AJUSTE 14: Card de resultado com design premium
  resultadoContainer: {
    backgroundColor: '#FFFFFF', // Branco em vez de #f0f0f0
    padding: 30, // Aumentar de 25
    borderRadius: 16, // Aumentar de 15
    alignItems: 'center',
    marginBottom: 20,
    borderTopWidth: 4, // AJUSTE 15: Adicionar borda superior colorida
    borderTopColor: '#2E7D9C',
    // AJUSTE 16: Adicionar sombra
    shadowColor: '#2E7D9C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },

  resultadoTitulo: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666666',
    fontWeight: '500',
    letterSpacing: 1, // AJUSTE 17: Adicionar espaçamento entre letras
  },

  // AJUSTE 18: Número IMC mais destacado
  imcValor: {
    fontSize: 56, // Aumentar de 48
    fontWeight: '700', // Aumentar de bold
    marginBottom: 15,
    fontVariant: ['tabular-nums'], // Garantir proporcionalidade
  },

  // AJUSTE 19: Classificação com estilo melhorado
  classificacao: {
    fontSize: 20, // Aumentar de 22 para melhor proporção
    fontWeight: '600',
    marginBottom: 20,
    textTransform: 'capitalize',
  },

  // AJUSTE 20: Botão de recomendações com design premium
  buttonRecomendacoes: {
    backgroundColor: '#27AE60', // Usar cor success
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginTop: 15,
    width: '100%', // AJUSTE 21: Fazer botão ocupar 100% da largura
    // AJUSTE 22: Adicionar sombra
    shadowColor: '#27AE60',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  buttonRecomendacoesText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});