import { act, renderHook } from '@testing-library/react'

import { useTasks } from '../hooks/use-tasks'

describe('useTasks', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('должен завершить созданную задачу', () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.addTask('Тестовая задача', 'Описание задачи')
    })

    const task = result.current.tasks[0]

    expect(result.current.tasks.length).toBe(1)
    expect(task.title).toBe('Тестовая задача')
    expect(task.description).toBe('Описание задачи')
    expect(task.completed).toBe(false)
    expect(task.createdAt).toBeInstanceOf(Date)

    act(() => {
      result.current.toggleTaskCompletion(task.id)
    })

    expect(result.current.tasks.length).toBe(1)
    expect(result.current.tasks[0].completed).toBe(true)
  })
})
