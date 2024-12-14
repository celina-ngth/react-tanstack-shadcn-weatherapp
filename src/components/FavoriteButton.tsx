import React from 'react'
import { WeatherData } from '@/api/types'
import { useFavorites } from '@/hooks/useFavorites'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import { toast } from 'sonner'

interface FavoriteButtonProps {
	data: WeatherData
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ data }) => {
	const { addToFavorites, removeFavorite, isFavorite } = useFavorites()

	const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon)

	const handleToggleFavorites = () => {
		if (isCurrentlyFavorite) {
			removeFavorite.mutate(`${(data.coord.lat, data.coord.lon)}`)
			toast.error(`Removed ${data.name} from favorites`)
		} else {
			addToFavorites.mutate({
				name: data.name,
				lat: data.coord.lat,
				lon: data.coord.lon,
				country: data.sys.country,
			})
			toast.success(`Added ${data.name} to favorites`)
		}
	}

	return (
		<Button
			variant={isCurrentlyFavorite ? 'default' : 'outline'}
			size="icon"
			className={isCurrentlyFavorite ? 'bg-yellow-500' : ''}
			onClick={handleToggleFavorites}
		>
			<Star
				className={`h-4 w-4 ${isCurrentlyFavorite ? 'fill-current' : ''}`}
			/>
		</Button>
	)
}

export default FavoriteButton
