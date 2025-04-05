import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Card, Text, IconButton, useTheme } from 'react-native-paper'
import Jogador from './Jogador'

export default function Time(props) {
  const { nome, anoFundacao, mascote, imagem, jogadores } = props
  const theme = useTheme()

  return (
    <Card style={[styles.cardContainer, { backgroundColor: theme.colors.surface }]}>
      <Card.Title 
        title={nome} 
        subtitle={`Fundado em ${anoFundacao}`}
        titleStyle={[styles.title, { color: theme.colors.primary }]}
        subtitleStyle={styles.subtitle}
        left={(props) => (
          <View style={styles.teamBadge}>
            <Text style={styles.teamInitial}>{nome.charAt(0)}</Text>
          </View>
        )}
        right={(props) => (
          <IconButton 
            icon="heart-outline" 
            onPress={() => console.log('Favoritado')}
          />
        )}
      />
      
      <Card.Cover 
        source={{ uri: imagem }} 
        style={styles.cardImage}
        theme={{ roundness: 0 }}
      />
      
      <Card.Content style={styles.content}>
        <View style={styles.mascotContainer}>
          <Text variant="bodyLarge" style={styles.mascotLabel}>
            🏆 Mascote: 
          </Text>
          <Text variant="bodyMedium" style={styles.mascotName}>
            {mascote}
          </Text>
        </View>
      </Card.Content>
      
      <View style={styles.playersHeader}>
        <Text variant="titleSmall" style={[styles.playersTitle, { color: theme.colors.primary }]}>
          👥 Elenco ({jogadores.length} jogadores)
        </Text>
      </View>
      
      <Card.Content style={styles.playersContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={jogadores}
          keyExtractor={(item) => item.numero.toString()}
          renderItem={({ item }) => (
            <View style={styles.playerWrapper}>
              <Jogador
                nome={item.nome}
                numero={item.numero}
                imagem={item.imagem}
              />
            </View>
          )}
          contentContainerStyle={styles.flatListContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
  },
  teamBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  teamInitial: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardImage: {
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  mascotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  mascotLabel: {
    fontWeight: '600',
    marginRight: 8,
  },
  mascotName: {
    color: '#E53935',
    fontWeight: 'bold',
  },
  playersHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
  },
  playersTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  playersContainer: {
    paddingVertical: 12,
  },
  flatListContent: {
    paddingHorizontal: 16,
  },
  playerWrapper: {
    marginRight: 8,
  },
  separator: {
    width: 12,
  },
})