import type { MenuProps } from 'antd';
import { Button, Dropdown, Input , Space } from 'antd';
import { Search } from 'lucide-react'

import styles from './filter-bar.module.scss'

interface FilterBarProps {
  filterStatus: 'all' | 'active' | 'completed'
  setFilterStatus: (status: 'all' | 'active' | 'completed') => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  sortOrder: 'newest' | 'oldest' | 'custom'
  setSortOrder: (order: 'newest' | 'oldest' | 'custom') => void
}

export default function FilterBar({
  filterStatus,
  setFilterStatus,
  searchQuery,
  setSearchQuery,
  sortOrder,
  setSortOrder,
}: FilterBarProps) {

  const items: MenuProps['items'] = [
    {
      label: (
        <Button
          type='default'
          className='dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600'
          onClick={() => setSortOrder('newest')}
        >
          Сначала новые
        </Button>
      ),
      key: '0',
    },
    {
      label: (
        <Button
          type='default'
          className='dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600'
          onClick={() => setSortOrder('oldest')}
        >
          Сначала старые
        </Button>
      ),
      key: '1',
    },
    {
      label: (
        <Button
          type='default'
          className='dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600'
          onClick={() => setSortOrder('custom')}
        >
          Свой порядок
        </Button>
      ),
      key: '3',
    },
  ];

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow p-4'>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='flex-1'>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <Search className='h-4 w-4 text-gray-400' />
            </div>
            <Input
              className={styles.Input}
              type='text'
              placeholder='Поиск по названию'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Dropdown.Button style={{width: 'auto'}} menu={{ items }} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {sortOrder === 'newest' ? 'Сначала новые' : sortOrder === 'oldest' ? 'Сначала старые' : 'Свой порядок'}
            </Space>
          </a>
        </Dropdown.Button>
      </div>

      <div className='flex flex-wrap gap-2 mt-4'>
        <Button
          type={filterStatus === 'all' ? 'primary' : 'default'}
          onClick={() => setFilterStatus('all')}
          className='flex-1 sm:flex-none dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-600'
        >
          Все
        </Button>
        <Button
          type={filterStatus === 'active' ? 'primary' : 'default'}
          onClick={() => setFilterStatus('active')}
          className='flex-1 sm:flex-none dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-600'
        >
          Активные
        </Button>
        <Button
          type={filterStatus === 'completed' ? 'primary' : 'default'}
          onClick={() => setFilterStatus('completed')}
          className='flex-1 sm:flex-none dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-600'
        >
          Выполненные
        </Button>
      </div>
    </div>
  )
}
