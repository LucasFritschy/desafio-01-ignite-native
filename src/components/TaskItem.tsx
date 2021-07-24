import React, { useEffect, useRef, useState } from 'react'
import { Image, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import penIcon from '../assets/icons/pen/pen.png'
import closeIcon from '../assets/icons/close/close.png'

import { Task } from './TasksList'

interface TaskItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTaskTitle: string) => void;
}

export function TaskItem({ index, task, editTask, removeTask, toggleTaskDone }: TaskItemProps) {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [newValue, setNewValue] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsBeingEdited(true);
  }

  function handleCancelEditing() {
    setNewValue(task.title);
    setIsBeingEdited(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, newValue);
    setIsBeingEdited(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      isBeingEdited ? textInputRef.current.focus() : textInputRef.current.blur();
    }
  }, [isBeingEdited])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>
          <TextInput
            value={newValue}
            onChangeText={setNewValue}
            editable={isBeingEdited}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
            selectTextOnFocus
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsWrapper}>
        <TouchableOpacity
          onPress={isBeingEdited ? handleCancelEditing : handleStartEditing}
          style={styles.buttons}
        >
          {
            isBeingEdited ? <Image style={{ marginRight: 4 }} source={closeIcon} /> : <Image source={penIcon} />
          }
        </TouchableOpacity>

        <View style={
          {
            width: 1,
            height: 24,
            backgroundColor: 'rgba(196, 196, 196, 0.24)'
          }} />

        <TouchableOpacity
          testID={`trash-${index}`}
          onPress={() => removeTask(task.id)}
          disabled={isBeingEdited}
          style={[styles.buttons, isBeingEdited && { opacity: 0.2 }]}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  buttons: {
    padding: 8,
  },
  buttonsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12
  }
})