import { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    Alert, StyleSheet, KeyboardAvoidingView, Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const STORAGE_KEY = '@reservafiap:user';

const formatarNumero = (texto) => {
    return texto
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{1,4})/, '$1-$2')
        .slice(0, 15);
}

export default function Cadastro() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [salvando, setSalvando] = useState(false);
    const [erros, setErros] = useState({});

    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');
    const [rm, setRm] = useState('');

    const validar = () => {
        const novosErros = {};
        if (!nome.trim()) novosErros.nome = 'Informe seu nome completo';
        if (!numero.trim()) novosErros.numero = 'Informe seu celular';
        if (!rm.trim()) novosErros.rm = 'Informe seu RM';
        if (!email.includes('@')) novosErros.email = 'E-mail inválido';
        if (senha.length < 6) novosErros.senha = 'Senha deve ter mínimo 6 caracteres';
        if (senha !== confirmSenha) novosErros.confirmSenha = 'As senhas não estão iguais';
        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const handleCadastro = async () => {
        if (!validar()) {
            return;
        }

        const usuario = {
            nome: nome.trim(),
            numero,
            rm: rm.trim(),
            email: email.trim().toLowerCase(),
            senha,
        };

        try {
            setSalvando(true);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));

            setNome('');
            setNumero('');
            setRm('');
            setEmail('');
            setSenha('');
            setConfirmSenha('');

            Alert.alert('Cadastro realizado!', `Usuário ${usuario.email} cadastrado com sucesso!`);
            router.replace('/login');
        } catch (error) {
            Alert.alert('Erro ao cadastrar', 'Não foi possível salvar os dados do usuário.');
        } finally {
            setSalvando(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Text style={styles.titulo}>Cadastro</Text>

            <Text style={styles.label}>Nome completo:</Text>
            <TextInput
                style={styles.input}
                placeholder='Nome completo'
                value={nome}
                onChangeText={setNome}
            />
            {erros.nome && <Text style={styles.erro}>{erros.nome}</Text>}

            <Text style={styles.label}>Número de celular:</Text>
            <TextInput
                style={styles.input}
                placeholder='Número de celular'
                value={numero}
                onChangeText={(texto) => setNumero(formatarNumero(texto))}
                keyboardType='numeric'
                maxLength={15}
            />
            {erros.numero && <Text style={styles.erro}>{erros.numero}</Text>}

            <Text style={styles.label}>RM:</Text>
            <TextInput
                style={styles.input}
                placeholder='RM'
                value={rm}
                onChangeText={setRm}
                keyboardType='numeric'
                maxLength={6}
            />
            {erros.rm && <Text style={styles.erro}>{erros.rm}</Text>}

            <Text style={styles.label}>E-mail:</Text>
            <TextInput
                style={styles.input}
                placeholder='E-mail'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
            />
            {erros.email && <Text style={styles.erro}>{erros.email}</Text>}
            <Text style={styles.label}>Senha:</Text>
            <View style={styles.senhaContainer}>
                <TextInput
                    style={[styles.input, { flex: 1, marginBottom: 0 }]}
                    placeholder="Senha"
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
            {erros.senha && <Text style={styles.erro}>{erros.senha}</Text>}
            <Text style={styles.label}>Confirmar senha:</Text>
            <View style={styles.senhaContainer}>
                <TextInput
                    style={[styles.input, { flex: 1, marginBottom: 0 }]}
                    placeholder="Confirmar senha"
                    value={confirmSenha}
                    onChangeText={setConfirmSenha}
                    secureTextEntry={!senhaVisivel}
                />
                <Text
                    onPress={() => setSenhaVisivel(!senhaVisivel)}
                    style={styles.olho}
                >
                    {senhaVisivel ? 'hide' : 'show'}
                </Text>
            </View>
            {erros.confirmSenha && <Text style={styles.erro}>{erros.confirmSenha}</Text>}

            <TouchableOpacity
                style={[styles.botao, salvando && styles.botaoDesabilitado]}
                onPress={handleCadastro}
                disabled={salvando}
            >
                <Text style={styles.botaoTexto}>
                    {salvando ? 'Cadastrando...' : 'Cadastrar'}
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView >
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
        borderRadius: 10, marginBottom: 8,
    },
    olho: { padding: 14, fontSize: 20, color: '#fff' },
    label: { color: '#fff' },
    erro: { color: 'red', marginBottom: 8, marginLeft: 4 },
    botao: {
        backgroundColor: '#ff096f', borderRadius: 10,
        padding: 16, marginTop: 16, alignItems: 'center',
    },
    botaoDesabilitado: {
        opacity: 0.7,
    },
    botaoTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
