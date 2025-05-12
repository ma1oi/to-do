import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import type { Task } from '@/types/task';

export function useTasks() {
	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		const storedTasks = localStorage.getItem('tasks');

		if (storedTasks) {
			try {
				const parsedTasks: Task[] = (JSON.parse(storedTasks) as Task[]).map((task) => ({
					...task,
					createdAt: new Date(task.createdAt),
				}));

				setTasks(parsedTasks);
			} catch (error) {
				console.error('Ошибка в парсинге localStorage: ', error);
				setTasks([]);
			}
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	const addTask = (title: string, description: string) => {
		const newTask: Task = {
			id: uuidv4(),
			title,
			description: description || undefined,
			completed: false,
			createdAt: new Date(),
		};

		setTasks((prevTasks) => [newTask, ...prevTasks]);
	};

	const updateTask = (updatedTask: Task) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
		);
	};

	const deleteTask = (id: string) => {
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
	};

	const toggleTaskCompletion = (id: string) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
		);
	};

	return {
		tasks,
		addTask,
		updateTask,
		deleteTask,
		toggleTaskCompletion,
	};
}
