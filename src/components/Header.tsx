import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from './theme-provider'
import { Moon, Sun } from 'lucide-react'

const Header: React.FC = () => {
	const { theme, setTheme } = useTheme()

	const isDark = theme === 'dark'

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<Link to={'/'}>
					<div>LOGO</div>
				</Link>

				<div className="flex gap-4">
					{/* <SearchBar /> */}
					<div
						onClick={() => setTheme(isDark ? 'light' : 'dark')}
						className={`cursor-pointer flex items-center transition-transform duration-500 +
							${isDark ? 'rotate-180' : 'rotate-0'}
						`}
					>
						{isDark ? (
							<Sun className="h-5 w-6 text-yellow-400 rotate-0 transition-all" />
						) : (
							<Moon className="h-5 w-6 text-blue-400 rotate-0 transition-" />
						)}
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
