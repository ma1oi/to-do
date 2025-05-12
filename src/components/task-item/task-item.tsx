import { clsx } from 'clsx';
import { Check, Pencil, Trash2, X } from 'lucide-react';

import type { Task } from '@/types/task';
import { formatDate } from '@/utils.ts';

interface TaskItemProps {
	task: Task;
	onToggleCompletion: (id: string) => void;
	onDeleteTask: (id: string) => void;
	onEditTask: (task: Task) => void;
}

export default function TaskItem({
	task,
	onToggleCompletion,
	onDeleteTask,
	onEditTask,
}: TaskItemProps) {
	return (
		<div
			className={`transition-colors duration-700 bg-white dark:bg-gray-800 rounded-lg shadow p-4 ${
				task.completed ? 'border-l-4 border-green-500' : 'border-l-4 border-yellow-500'
			}`}
		>
			<div className="flex items-start justify-between">
				<div className="flex-1">
					<h3
						className={clsx(
							'text-lg font-medium transition-colors duration-500',
							task.completed
								? 'text-gray-500 dark:text-gray-400 line-through'
								: 'text-gray-900 dark:text-gray-100',
						)}
					>
						{task.title}
					</h3>

					{task.description && (
						<p
							className={`mt-1 text-sm ${task.completed ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'}`}
						>
							{task.description}
						</p>
					)}

					<p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
						Создано: {formatDate(task.createdAt)}
					</p>
				</div>

				<div className="flex items-center space-x-2 ml-4">
					<button
						onClick={() => onToggleCompletion(task.id)}
						className={`p-1.5 rounded-full ${
							task.completed
								? 'bg-gray-100 text-gray-500 hover:bg-gray-200'
								: 'bg-green-100 text-green-600 hover:bg-green-200'
						}`}
						aria-label={task.completed ? 'Отметить как невыполненную' : 'Отметить как выполненную'}
					>
						{task.completed ? <X size={16} /> : <Check size={16} />}
					</button>

					<button
						onClick={() => onEditTask(task)}
						className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
						aria-label="Редактировать задачу"
					>
						<Pencil size={16} />
					</button>

					<button
						onClick={() => onDeleteTask(task.id)}
						className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
						aria-label="Удалить задачу"
					>
						<Trash2 size={16} />
					</button>
				</div>
			</div>
		</div>
	);
}
