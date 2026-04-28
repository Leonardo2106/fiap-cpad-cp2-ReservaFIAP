import { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    Alert, StyleSheet, KeyboardAvoidingView, Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const STORAGE_KEY = '@reservafiap:user';

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const handleLogin = async () => {
        if (!email.trim() || !senha.trim()) {
            Alert.alert('Erro', 'Por favor, preencha e-mail e senha.');
            return;
        }

        try {
            setCarregando(true);
            const userJson = await AsyncStorage.getItem(STORAGE_KEY);

            if (!userJson) {
                Alert.alert('Erro', 'Nenhum usuário cadastrado encontrado no dispositivo.');
                return;
            }

            const usuario = JSON.parse(userJson);

            if (usuario.email === email.trim().toLowerCase() && usuario.senha === senha) {
                // Cria a sessão ativa do usuário
                await AsyncStorage.setItem('@reservafiap:session', 'active');
                
                // Redireciona para a home
                router.replace('/');
            } else {
                Alert.alert('Acesso negado', 'E-mail ou senha incorretos.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível acessar os dados de login.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Text style={styles.titulo}>Login</Text>

            <Text style={styles.label}>E-mail:</Text>
            <TextInput
                style={styles.input}
                placeholder='Digite seu e-mail'
                placeholderTextColor='#8a8a8e'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
            />

            <Text style={styles.label}>Senha:</Text>
            <View style={styles.senhaContainer}>
                <TextInput
                    style={[styles.input, { flex: 1, marginBottom: 0 }]}
                    placeholder="Digite sua senha"
                    placeholderTextColor='#8a8a8e'
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={!senhaVisivel}
                />
                <Text
                    onPress={() => setSenhaVisivel(!senhaVisivel)}
                    style={styles.olho}
                >
                    {senhaVisivel ? 'hide' : 'show'}
                </Text>
            </View>

            <TouchableOpacity
                style={[styles.botao, carregando && styles.botaoDesabilitado]}
                onPress={handleLogin}
                disabled={carregando}
            >
                <Text style={styles.botaoTexto}>
                    {carregando ? 'Entrando...' : 'Entrar'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.botaoCadastro} 
                onPress={() => router.push('/cadastro')}
            >
                <Text style={styles.textoCadastro}>Ainda não tem conta? Cadastre-se</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center',
        padding: 24, backgroundColor: '#252525',
    },
    titulo: {
        fontSize: 32, fontWeight: 'bold',
        textAlign: 'center', marginBottom: 32, color: '#ff096f',
    },
    input: {
        backgroundColor: '#4a4a4a', borderWidth: 1, borderColor: '#ff096f',
        borderRadius: 10, padding: 14, marginBottom: 8, fontSize: 16, color: '#fff'
    },
    senhaContainer: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#4a4a4a',
        borderRadius: 10, marginBottom: 16,
    },
    olho: { padding: 14, fontSize: 18, color: '#fff' },
    label: { color: '#fff', marginBottom: 4 },
    botao: {
        backgroundColor: '#ff096f', borderRadius: 10,
        padding: 16, marginTop: 16, alignItems: 'center',
    },
    botaoDesabilitado: {
        opacity: 0.7,
    },
    botaoTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    botaoCadastro: {
        marginTop: 20,
        alignItems: 'center',
    },
    textoCadastro: {
        color: '#fff',
        fontSize: 16,
        textDecorationLine: 'underline',
    }
});