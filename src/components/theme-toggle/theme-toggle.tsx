import { Button } from 'antd';
import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/hooks/use-theme'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      onClick={toggleTheme}
      type='default'
      className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
      aria-label={theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
    >
      {theme === 'dark' ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
    </Button>
  )
}
