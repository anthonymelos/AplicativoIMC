import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function TabTwoScreen() {
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
          </View>
        )}

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
  buttonCalcular: {
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
  imcValor: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  classificacao: {
    fontSize: 22,
    fontWeight: '600',
  },
  fraseContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  fraseTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  fraseTexto: {
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 22,
  },
  fraseAutor: {
    fontSize: 13,
    textAlign: 'right',
    fontWeight: '600',
    marginTop: 5,
  },
  buttonNovaFrase: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    alignSelf: 'center',
  },
  buttonNovaFraseText: {
    fontSize: 14,
    fontWeight: '600',
  },
});