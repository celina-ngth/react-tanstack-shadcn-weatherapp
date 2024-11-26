import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from './theme-provider'

const Header: React.FC = () => {
	const { theme, setTheme } = useTheme()

	const isDark = theme === 'dark'

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<Link to={'/'}>
					<img
						src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'}
						className="h-14"
					/>
				</Link>

				<div className="flex gap-4">
					{/* <SearchBar /> */}
					<div onClick={() => setTheme(isDark ? 'light' : 'dark')}>TOOGLE</div>
				</div>
			</div>
		</header>
	)
}

export default Header
