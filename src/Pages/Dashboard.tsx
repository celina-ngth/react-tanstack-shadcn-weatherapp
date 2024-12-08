import CurrentWeather from '@/components/CurrentWeather'
import HourlyTemperature from '@/components/HourlyTemperature'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useGeolocation } from '@/hooks/useGeolocation'
import {
	useForecastQuery,
	useReverseGeocodeQuery,
	useWeatherQuery,
} from '@/hooks/useWeather'
import { AlertCircle, RefreshCcw } from 'lucide-react'
import React from 'react'

const Dashboard: React.FC = () => {
	const {
		coordinates,
		isLoading: locationLoading,
		error: locationError,
		getLocation,
	} = useGeolocation()

	const locationQuery = useReverseGeocodeQuery(coordinates)
	const weatherQuery = useWeatherQuery(coordinates)
	const forecastQuery = useForecastQuery(coordinates)

	const handleRefresh = () => {
		getLocation()

		if (coordinates) {
			locationQuery.refetch()
			weatherQuery.refetch()
			forecastQuery.refetch()
		}
	}

	if (locationLoading) {
		return <LoadingSkeleton />
	}

	if (locationError || !coordinates) {
		return (
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Position error</AlertTitle>
				<AlertDescription>
					<p>{locationError}</p>
					<p>Please share your location</p>

					<Button
						onClick={getLocation}
						variant="outline"
						className="w-fit mt-3"
					>
						Clic here to try again
					</Button>
				</AlertDescription>
			</Alert>
		)
	}

	const locationName = locationQuery.data?.[0]

	if (weatherQuery.error || forecastQuery.error) {
		return (
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					<p>Failed to fetch weather data, please try again.</p>

					<Button
						onClick={handleRefresh}
						variant="outline"
						className="w-fit mt-3"
					>
						<RefreshCcw />
						Click here to try again
					</Button>
				</AlertDescription>
			</Alert>
		)
	}

	if (!weatherQuery.data || !forecastQuery.data) {
		return <LoadingSkeleton />
	}

	return (
		<div className="space-y-4">
			{/* Mes villes favorites */}

			<div className="flex items-center justify-between">
				<h1 className="text-xl font-bold tracking-tight">My location</h1>
				<Button
					variant="outline"
					size="icon"
					onClick={handleRefresh}
					disabled={weatherQuery.isFetching || forecastQuery.isFetching}
				>
					<RefreshCcw
						className={`'h-4 w-4'${
							weatherQuery.isFetching ? 'animate-spin' : ''
						}`}
					/>
				</Button>
			</div>

			<div className="flex flex-col lg:flex-row gap-4">
				<CurrentWeather data={weatherQuery.data} locationName={locationName} />

				<HourlyTemperature data={forecastQuery.data} />
			</div>

			<div>
				{/* details */}
				{/* forecast */}
			</div>
		</div>
	)
}

export default Dashboard
