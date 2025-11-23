import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';


// Ícone das abas
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}>
      
      {/*Início*/}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      
      {/*Calculadora */}
      <Tabs.Screen
        name="two"
        options={{
          title: 'Calculadora',
          tabBarIcon: ({ color }) => <TabBarIcon name="calculator" color={color} />,
        }}
      />
      
      {/*Sobre*/}
      <Tabs.Screen
        name="three"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color }) => <TabBarIcon name="info-circle" color={color} />,
        }}
        />

        {/*Recomendações*/}
       <Tabs.Screen
        name="TelaAlimentos" 
        options={{
          title: 'Recomendações Alimentares',
          tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={color} />,
          headerShown: true,
        }}

      />
    </Tabs>
  );
}