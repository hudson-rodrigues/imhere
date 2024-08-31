import { Text, TextInput, TouchableOpacity, View, FlatList, Alert } from 'react-native';
import { styles } from './styles';
import React, { useState } from 'react';
import { Participant } from '../components/Participant';

export default function Home() {
    const [participants, setParticipants] = useState <string[]>([]);
    const [participantName, setParticipantName] = useState ('');

    function handleParticipantAdd() {
        console.log("ADICIONANDO NOVO USUARIO");
        if(participantName === '')
            return Alert.alert("Vazio", "Campo vazio");
        if(participants.includes(participantName)) {
            return Alert.alert("Participante Existe", "Já existe uma participante na lista com esse Nome");
        }
        setParticipants(prevState => [...prevState, participantName]);
        setParticipantName('');
    }

    function handleParticipantRemove(name: string) {
        Alert.alert("Remover", `Remover o participante ${name}?`, [
            {
                text: 'Sim',
                onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name)),
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ])
    }

    return (
      <View style={styles.container}>
        <Text style={styles.eventName}>
          Nome do evento
        </Text>

        <Text style={styles.eventDate}>
          Sexta, 5 de Novembro de 2022
        </Text>

        <View style={styles.form}>
            <TextInput 
                style={styles.input}
                placeholder="Nome do participante"
                placeholderTextColor="#6B6B6B"
                onChangeText={setParticipantName}
                value={participantName}
            />

            <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                <Text style={styles.buttonText}>
                    +
                </Text>
            </TouchableOpacity>
        </View>

        <FlatList 
            data={participants} 
            keyExtractor={item => item}
            renderItem={({item }) => (
                <Participant 
                    key={item}
                    name={item} 
                    onRemove={() => handleParticipantRemove(item)}/>
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
                <Text style={styles.listEmptyText}>
                    Ninguém chegou no evento ainda ? Adicione participantes a sua lista de presença
                </Text>
            )}
        />
      </View>
    );
  }