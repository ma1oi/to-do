import type React from 'react';
import { useEffect, useState } from 'react';
import { Button, Input } from 'antd';

import styles from './task-form.module.scss';

import type { Task } from '@/types/task';

const { TextArea } = Input;

interface TaskFormProps {
	onAddTask: (title: string, description: string) => void;
	editingTask: Task | null;
	onUpdateTask: (task: Task) => void;
	onCancelEdit: () => void;
}

export default function TaskForm({
	onAddTask,
	editingTask,
	onUpdateTask,
	onCancelEdit,
}: TaskFormProps) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		if (editingTask) {
			setTitle(editingTask.title);
			setDescription(editingTask.description ?? '');
		} else {
			setTitle('');
			setDescription('');
		}
		setError('');
	}, [editingTask]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!title.trim()) {
			setError('Название задачи обязательно');
			return;
		}

		if (editingTask) {
			onUpdateTask({
				...editingTask,
				title: title.trim(),
				description: description.trim() || undefined,
			});
		} else {
			onAddTask(title.trim(), description.trim());
		}

		setTitle('');
		setDescription('');
		setError('');
	};

	return (
		<form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
			<h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
				{editingTask ? 'Редактировать задачу' : 'Добавить новую задачу'}
			</h2>

			<div className="space-y-4">
				<div>
					<label
						htmlFor="title"
						className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
					>
						Название*
					</label>
					<Input
						className={styles.Input}
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Введите название задачи"
					/>
					{error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
				</div>

				<div>
					<label
						htmlFor="description"
						className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
					>
						Описание
					</label>

					<TextArea
						className={styles.Input}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Введите описание задачи (необязательно)"
					/>
				</div>

				<div className="flex justify-end space-x-3 pt-2">
					{editingTask && (
						<Button type="default" onClick={onCancelEdit}>
							Отмена
						</Button>
					)}
					<Button type="primary" htmlType="submit">
						{editingTask ? 'Сохранить' : 'Добавить задачу'}
					</Button>
				</div>
			</div>
		</form>
	);
}
