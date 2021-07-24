import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const duplicateTask = tasks.find(task => task.title === newTaskTitle)

    Boolean(duplicateTask) ? Alert.alert('Você não pode cadastrar duas tarefas com o mesmo nome')
      :
      setTasks([...tasks, { id: new Date().getTime(), title: newTaskTitle, done: false }])
  }

  function handleToggleTaskDone(id: number) {
    setTasks(
      tasks.map(task => task.id === id ? { ...task, done: !task.done } : task)
    )
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Alerta",
      "A tarefa será apagada definitivamente",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => setTasks(tasks.filter(task => task.id !== id)) }
      ]
    );
  }

  function handleEditTask(id: number, newTaskTitle: string) {
    setTasks(
      tasks.map(task => task.id === id ? { ...task, title: newTaskTitle } : task)
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})