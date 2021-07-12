import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
}

export function Home() {
  const [skill, setSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greeting, setGreeting] = useState('');

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: skill
    }
    setMySkills([...mySkills, data]);
    setSkill('');
  }

  function handleRemoveSkill(id: string) {
    setMySkills(mySkills.filter(
      skill => skill.id !== id
    ));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();
    currentHour < 12
      ? setGreeting('Good morning!')
      : currentHour >= 12 && currentHour < 18
        ? setGreeting('Good afternoon!')
        : setGreeting('Good night!');
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome, Geovane
      </Text>
      <Text style={styles.greetings}>
        {greeting}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setSkill}
        value={skill}
        onSubmitEditing={handleAddNewSkill}
      />
      <Button
        title="Add"
        onPress={handleAddNewSkill}
      />
      <Text style={[styles.title, { marginVertical: 50 }]}>
        My Skills
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillCard
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1F1E25',
    color: '#FFFFFF',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 5
  },
  button: {
    backgroundColor: '#A370F7',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  greetings: {
    color: '#FFFFFF'
  }
})