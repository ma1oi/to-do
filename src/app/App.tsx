import { ConfigProvider } from 'antd';

import HomePage from '../pages/home/home.tsx';

import './App.css';
import './globals.scss';

const App = () => {
	return (
		<ConfigProvider
			theme={{
				components: {
					Input: {
						activeBg: 'var(--color-gray-700)',
						activeBorderColor: 'var(--color-gray-700)',
						hoverBg: 'var(--color-gray-700)',
						hoverBorderColor: 'var(--color-gray-700)',
						addonBg: 'var(--color-gray-700)',
					},
				},
			}}
		>
			<HomePage />
		</ConfigProvider>
	);
};

export default App;
