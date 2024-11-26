import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import Layout from '@/Layout/Layout'
import Dashboard from '@/Pages/Dashboard'
import City from '@/Pages/City'
import './App.css'

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider defaultTheme="dark">
				<Layout>
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/city/:city" element={<City />} />
					</Routes>
				</Layout>
			</ThemeProvider>
		</BrowserRouter>
	)
}

export default App
