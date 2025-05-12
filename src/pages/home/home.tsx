import {useEffect, useState} from 'react';

import FilterBar from '@/components/filter-bar/filter-bar.tsx';
import TaskForm from '@/components/task-form/task-form.tsx';
import TaskList from '@/components/task-list/task-list.tsx';
import ThemeToggle from '@/components/theme-toggle/theme-toggle.tsx';
import { useTasks } from '@/hooks/use-tasks.ts';
import type {Task} from '@/types/task.ts';

const HomePage = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskCompletion } = useTasks()

  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks)
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'custom'>('custom')

  useEffect(() => {
    let result = [...tasks]

    if (filterStatus === 'active') {
      result = result.filter((task) => !task.completed)
    } else if (filterStatus === 'completed') {
      result = result.filter((task) => task.completed)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((task) => task.title.toLowerCase().includes(query))
    }

    if (sortOrder === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (sortOrder === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }

    setFilteredTasks(result)
  }, [tasks, filterStatus, searchQuery, sortOrder])

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
  }

  const handleUpdateTask = (updatedTask: Task) => {
    updateTask(updatedTask)
    setEditingTask(null)
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
  }

  return (
    <main className='min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>Список задач</h1>
          <ThemeToggle />
        </div>

        <div className='space-y-6'>
          <FilterBar sortOrder={sortOrder} setSortOrder={setSortOrder} filterStatus={filterStatus} setFilterStatus={setFilterStatus} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <TaskForm onAddTask={addTask} editingTask={editingTask} onUpdateTask={handleUpdateTask} onCancelEdit={handleCancelEdit} />
          <TaskList tasks={filteredTasks} onToggleCompletion={toggleTaskCompletion} onDeleteTask={deleteTask} onEditTask={handleEditTask} />
        </div>
      </div>
    </main>
  )
};

export default HomePage;
