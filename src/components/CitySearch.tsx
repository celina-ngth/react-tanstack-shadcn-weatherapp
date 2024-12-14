import React, { useState } from 'react'
import { format } from 'date-fns'
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { Search, Loader2, Clock, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLocationSearch } from '@/hooks/useWeather'
import { useSearchHistory } from '@/hooks/useSearchHistory'

const CitySearch: React.FC = () => {
	const [open, setOpen] = useState(false)
	const [query, setQuery] = useState('')

	const navigate = useNavigate()

	const { data: locations, isLoading } = useLocationSearch(query)
	const { history, addToHistory, clearHistory } = useSearchHistory()

	const handleSelect = (cityData: string) => {
		const [lat, lon, name, country] = cityData.split('|')

		addToHistory.mutate({
			query,
			lat: parseFloat(lat),
			lon: parseFloat(lon),
			name,
			country,
		})

		setOpen(false)
		setQuery('')
		navigate(`city/${name}?lat=${lat}&lon=${lon}`)
	}

	return (
		<>
			<Button
				variant="outline"
				className="justify-start md:w-64 text-muted-foreground"
				onClick={() => setOpen(true)}
			>
				<Search className="mr-1 h-4 w-4" />
				Search city
			</Button>

			<CommandDialog
				open={open}
				onOpenChange={setOpen}
				aria-describedby="dialog-description"
			>
				<Command>
					<CommandInput
						placeholder="Search city..."
						value={query}
						onValueChange={setQuery}
					/>

					<CommandList>
						{query.length > 2 && !isLoading && (
							<CommandEmpty>No city found</CommandEmpty>
						)}
						<CommandGroup heading="Favorites cities">
							<CommandItem></CommandItem>
						</CommandGroup>

						{history.length > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<div className="flex items-center justify-between px-2 my-2">
										<p className="text-xs text-muted-foreground">
											Recent Searches
										</p>
										<Button
											variant="link"
											className="text-xs text-muted-foreground"
											onClick={() => clearHistory.mutate()}
										>
											<X className="h-4 w-4" />
											clear
										</Button>
									</div>

									{history.map((item) => (
										<CommandItem
											key={item.id}
											value={`${item.lat}|${item.lon}|${item.name}|${item.country}`}
											onSelect={handleSelect}
										>
											<Clock className="mr-2 h-2 w-2 text-muted-foreground" />
											<span>{item.name}</span>
											{item.state && (
												<span className="text-sm text-muted-foreground">
													, {item.state}
												</span>
											)}
											<span className="text-sm text-muted-foreground">
												, {item.country}
											</span>
											<span className="ml-auto text-xs text-muted-foreground">
												{format(item.searchedAt, 'MMM d, h:mm a')}
											</span>
										</CommandItem>
									))}
								</CommandGroup>
							</>
						)}

						{locations && locations.length > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup heading="Suggestions">
									{isLoading && (
										<div className="flex items-center justify-center p-4">
											<Loader2 className="h-4 w-4 animate-spin" />
										</div>
									)}

									{locations?.map((location, index) => (
										<CommandItem
											key={`${location.lat}-${location.lon}-${index}`}
											value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
											onSelect={handleSelect}
										>
											<Search className="h-4 w-4 mr-2" />
											<span>{location.name}</span>
											{location.state && <span>, {location.state}</span>}
											<span>, {location.country}</span>
										</CommandItem>
									))}
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</CommandDialog>
		</>
	)
}

export default CitySearch
