import React from 'react'
import { SafeAreaView } from 'react-native'
import { TasksContextProvider } from './context/TasksContext'
import TasksList from './components/TasksList'
import Form from './components/Form'
 
export default () => (
  <TasksContextProvider>
    <SafeAreaView>
      <Form />
      <TasksList />
    </SafeAreaView>
  </TasksContextProvider>
)