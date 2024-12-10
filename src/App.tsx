import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider'
import Layout from '@/layout/Layout'
import Dashboard from '@/pages/Dashboard'
import City from '@/pages/City'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5000,
			gcTime: 10000,
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
})

function App() {
	return (
		<QueryClientProvider client={queryClient}>
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
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export default App
