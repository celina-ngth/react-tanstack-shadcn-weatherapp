import Header from '@/components/Header'
import React, { PropsWithChildren } from 'react'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="bg-gradient-to-br from-background to-muted">
			<Header />

			<main className="min-h-screen container mx-auto px-4 py-8">
				{children}
			</main>

			<footer className="border-t backdrop-blur">
				<div className="container mx-auto flex justify-center py-8 text-gray-400">
					made with ❤️
				</div>
			</footer>
		</div>
	)
}

export default Layout
