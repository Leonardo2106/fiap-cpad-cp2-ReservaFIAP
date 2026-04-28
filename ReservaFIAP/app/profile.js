import { useRouter } from 'expo-router';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Profile() {
    const router = useRouter();
    
    return (
        <View style={styles.container}>
            {/* Cabeçalho do Perfil */}
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>FS</Text>
                </View>
                <Text style={styles.userName}>Fulano da Silva</Text>
                <Text style={styles.userRM}>RM 999999</Text>
            </View>

            {/* Informações Acadêmicas */}
            <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Curso: <Text style={styles.infoValue}>Ciência da Computação</Text></Text>
                <Text style={styles.infoLabel}>Semestre: <Text style={styles.infoValue}>1º</Text></Text>
                <Text style={styles.infoLabel}>Turma: <Text style={styles.infoValue}>1CCPX</Text></Text>
            </View>

            {/* Seção de Reserva Atual */}
            <View style={styles.reservationSection}>
                <Text style={styles.reservationTitle}>Reserva atual:</Text>
                <View style={styles.reservationCard}>
                    {/* Aqui você pode renderizar os dados da reserva ativa futuramente */}
                    <Text style={{ color: 'gray', fontStyle: 'italic' }}>Nenhuma reserva ativa no momento</Text>
                </View>
            </View>

            {/* Botão Opcional de Logout */}
            <TouchableOpacity style={styles.logoutButton} onPress={() => router.push('/sign')}>
                <Text style={styles.logoutText}>Sair da conta</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#202020', 
        paddingHorizontal: 30,
        paddingTop: 60 
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#D9D9D9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#202020',
    },
    userName: {
        fontSize: 24,
        fontWeight: '700',
        color: 'white',
    },
    userRM: {
        fontSize: 16,
        color: 'gray',
        marginTop: 4,
    },
    infoSection: {
        marginBottom: 40,
    },
    infoLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    infoValue: {
        color: 'gray',
        fontWeight: '400',
    },
    reservationSection: {
        flex: 1,
    },
    reservationTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 15,
    },
    reservationCard: {
        height: 180,
        borderWidth: 1,
        borderColor: '#ff096f',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed', // Estilo opcional para quando está vazio
    },
    logoutButton: {
        marginBottom: 30,
        alignItems: 'center',
    },
    logoutText: {
        color: '#ff096f',
        fontWeight: 'bold',
    }
});