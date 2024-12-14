import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useWeatherQuery, useForecastQuery } from '@/hooks/useWeather'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import CurrentWeather from '@/components/CurrentWeather'
import HourlyTemperature from '@/components/HourlyTemperature'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import WeatherDetails from '@/components/WeatherDetails'
import FavoriteButton from '@/components/FavoriteButton'

const City: React.FC = () => {
	const [searchParams] = useSearchParams()
	const params = useParams()

	const lat = parseFloat(searchParams.get('lat') ?? '0')
	const lon = parseFloat(searchParams.get('lon') ?? '0')
	const coordinates = { lat, lon }

	const weatherQuery = useWeatherQuery(coordinates)
	const forecastQuery = useForecastQuery(coordinates)

	if (weatherQuery.error || forecastQuery.error) {
		return (
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					<p>Failed to load weather data, please try again.</p>
				</AlertDescription>
			</Alert>
		)
	}

	if (!weatherQuery.data || !forecastQuery.data || !params.city) {
		return <LoadingSkeleton />
	}

	return (
		<>
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-bold tracking-tight">
						{params.city}, {weatherQuery.data.sys.country}
					</h1>
					<div>
						<FavoriteButton
							data={{ ...weatherQuery.data, name: params.city }}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-4">
					<CurrentWeather data={weatherQuery.data} />
					<HourlyTemperature data={forecastQuery.data} />
				</div>

				<div>
					<WeatherDetails data={weatherQuery.data} />
				</div>
			</div>
		</>
	)
}

export default City
