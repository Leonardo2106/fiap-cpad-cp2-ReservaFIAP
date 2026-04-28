import { Tabs, useRouter, useSegments } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

export default function Layout() {
    const router = useRouter();
    const segments = useSegments();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const verificarSessao = async () => {
            try {
                const session = await AsyncStorage.getItem('@reservafiap:session');
                const inAuthGroup = segments[0] === 'sign' || segments[0] === 'cadastro' || segments[0] === 'login';

                if (!session && !inAuthGroup) {
                    // Sem sessão e tentando acessar área protegida? Expulso para o sign.
                    router.replace('/sign');
                } else if (session && inAuthGroup) {
                    // Com sessão ativa e tentando acessar telas de login? Joga pra home.
                    router.replace('/');
                }
            } catch (error) {
                console.error('Erro ao verificar sessão', error);
            } finally {
                setIsReady(true);
            }
        };

        verificarSessao();
    }, [segments]);

    // Evita um flash da tela inicial antes da verificação terminar
    if (!isReady) {
        return (
            <View style={{ flex: 1, backgroundColor: '#202020', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#ff096f" />
            </View>
        );
    }

    return(
        <Tabs screenOptions={{ tabBarActiveTintColor: '#ff096f', tabBarStyle: {backgroundColor: '#202020', borderTopWidth: 0, elevation: 0, } }}>
            <Tabs.Screen 
                name='index'    
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />
                }}
            />

            <Tabs.Screen 
                name='reservar'
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Ionicons name="bug" size={24} color={color} />
                }}
            />

            <Tabs.Screen 
                name='profile'
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Entypo name="user" size={24} color={color}/>
                }}
            />

            <Tabs.Screen 
                name='cadastro'
                options={{
                    headerShown: false,
                    tabBarItemStyle: { display: 'none' },
                }}
            />

            <Tabs.Screen 
                name='sign'
                options={{
                    headerShown: false,
                    tabBarItemStyle: { display: 'none' },
                }}
            />

            <Tabs.Screen 
                name='login'
                options={{
                    headerShown: false,
                    tabBarItemStyle: { display: 'none' },
                }}
            />
        </Tabs>
    );
}