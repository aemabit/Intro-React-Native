import React, { createContext, useState, useEffect } from "react";
import { AsyncStorage } from "react-native";

export const TasksContext = createContext();

export const TasksContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      let storedTasks = await AsyncStorage.getItem("TASKS");
      storedTasks = JSON.parse(storedTasks || "[]");
      return storedTasks;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchTasks() {
      setTasks(await getTasks());
    }
    fetchTasks();
  }, []);

  const addTask = async description => {
    try {
      const storedTasks = await getTasks();
      const newTask = {
        description,
        completed: false,
        id: String(Number(new Date()))
      };
      storedTasks.unshift(newTask);
      await AsyncStorage.setItem("TASKS", JSON.stringify(storedTasks));
      setTasks(storedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  const flipTask = async taskId => {
    try {
      let storedTasks = await getTasks();
      const index = storedTasks.findIndex(task => task.id === taskId);
      storedTasks[index].completed = !storedTasks[index].completed;
      await AsyncStorage.setItem("TASKS", JSON.stringify(storedTasks));
      setTasks(storedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async taskId => {
    try {
      let storedTasks = await getTasks();
      storedTasks = storedTasks.filter(task => task.id !== taskId);
      await AsyncStorage.setItem("TASKS", JSON.stringify(storedTasks));
      setTasks(storedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, flipTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};
