import { StyleSheet, View, TouchableOpacity, Text } from "react-native"; // Adicionado Text
import { useRouter } from 'expo-router';

export default function Sign() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => router.push('/cadastro')}
            >
                <Text style={styles.logoutText}>Ir para Cadastro</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, { marginTop: 20 }]} 
                onPress={() => router.replace('/login')}
            >
                <Text style={styles.logoutText}>Ir para Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        padding: 24, 
        backgroundColor: '#252525',
    },
    button: {
        backgroundColor: '#444',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center'
    },
    logoutText: {
        color: '#FFF',
        fontWeight: 'bold'
    }
});
