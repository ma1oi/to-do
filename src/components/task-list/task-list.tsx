import { AnimatePresence, motion } from 'framer-motion';

import TaskItem from '../task-item/task-item';

import type { Task } from '@/types/task';

interface TaskListProps {
	tasks: Task[];
	onToggleCompletion: (id: string) => void;
	onDeleteTask: (id: string) => void;
	onEditTask: (task: Task) => void;
}

export default function TaskList({
	tasks,
	onToggleCompletion,
	onDeleteTask,
	onEditTask,
}: TaskListProps) {
	if (tasks.length === 0) {
		return (
			<div className="text-center py-10 dark:bg-gray-800 dark:text-gray-400 rounded-lg shadow">
				<p className="text-gray-400">Нет задач для отображения</p>
			</div>
		);
	}

	return (
		<div className="space-y-2">
			<AnimatePresence mode="popLayout">
				{tasks.map((task) => (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						key={task.id}
						layout
					>
						<TaskItem
							task={task}
							onToggleCompletion={onToggleCompletion}
							onDeleteTask={onDeleteTask}
							onEditTask={onEditTask}
						/>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}
