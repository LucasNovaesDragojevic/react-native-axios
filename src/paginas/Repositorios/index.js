import React, { useEffect, useState } from 'react'
import { Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native'
import estilos from './estilos'
import { pegarRepositoriosDoUsuario, pegarRepositoriosDoUsuarioPeloNome } from '../../servicos/requisicoes/repositorios'
import { useIsFocused } from '@react-navigation/native'

export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([])
    const [repositoryNameToSearch, setRepositoryNameToSearch] = useState('')
    const estaNaTela = useIsFocused()

    useEffect(async () => {
        const resultado = await pegarRepositoriosDoUsuario(route.params.id)
        setRepo(resultado)
    },[estaNaTela])

    async function findRepositoryWithName() {
        const result = await pegarRepositoriosDoUsuarioPeloNome(route.params.id, repositoryNameToSearch)
        setRepo(result)
        setRepositoryNameToSearch('')
    }

    return (
        <View style={estilos.container}>
                <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
                
                <TouchableOpacity 
                    style={estilos.botao}
                    onPress={() => navigation.navigate('CriarRepositorio', {id: route.params.id})}>
                    <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
                </TouchableOpacity>

                <TextInput style={estilos.entrada}
                    placeholder="Busque por um repositório"
                    autoCapitalize="none"
                    value={repositoryNameToSearch}
                    onChangeText={setRepositoryNameToSearch}/>

                <TouchableOpacity style={estilos.botao}
                    onPress={findRepositoryWithName}>
                    <Text style={estilos.textoBotao}>Buscar</Text>
                </TouchableOpacity>

                <FlatList 
                    data={repo}
                    style={{width: '100%'}}
                    keyExtractor={repo => repo.id}
                    renderItem={({item}) => (
                        <TouchableOpacity style={estilos.repositorio}
                            onPress={() => navigation.navigate('InfoRepositorio',{item})}>
                            <Text style={estilos.repositorioNome}>{item.name}</Text>
                            <Text style={estilos.repositorioNome}>Atualizado em {item.data}</Text>
                        </TouchableOpacity>
                    )}/>
        </View>
    );
}
