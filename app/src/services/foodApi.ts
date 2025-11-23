const API_CONFIG = {
  BASE_URL: 'https://api.api-ninjas.com/v1/nutrition',
  NINJA_APP_KEY: 'eTA+dYaPDUE1Ek3DIj5G9g==5VhWFPgyChU5lrEu',
};

export interface NutricaoInfo {
  name: string;
  carbohydrates_total_g: number;
  fat_total_g: number;
  fiber_g: number;
  serving_size_g: number;
  sugar_g?: number;
  sodium_mg?: number;
}

export const fetchDados = async (query: string): Promise<NutricaoInfo[]> => {
  
  if (!query.trim()) {
    throw new Error('Query vazia');
  }

  if (!API_CONFIG.NINJA_APP_KEY || API_CONFIG.NINJA_APP_KEY === 'undefined') {
    throw new Error('API_KEY não configurada. Verifique suas variáveis de ambiente.');
  }

  try {
    const url = `${API_CONFIG.BASE_URL}?query=${encodeURIComponent(query)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': API_CONFIG.NINJA_APP_KEY,
        'Content-Type': 'application/json',
      },
    });

    console.log(' Status da resposta:', response.status);
    console.log('Status text:', response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
    }

    const json: NutricaoInfo[] = await response.json();
    console.log('JSON recebido:', json);

    if (!json || json.length === 0) {
      throw new Error('Nenhum alimento encontrado para esta busca');
    }

    return json;
    
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};