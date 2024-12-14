import { Coordinates } from '@/api/types'
import { useEffect, useState } from 'react'

interface GeolocationState {
	coordinates: Coordinates | null
	isLoading: boolean
	error: string | null
}

export function useGeolocation() {
	const [locationData, setLocationData] = useState<GeolocationState>({
		coordinates: null,
		isLoading: true,
		error: null,
	})

	const getLocation = () => {
		setLocationData((previous) => ({
			...previous,
			isLoading: true,
			error: null,
		}))

		if (!navigator.geolocation) {
			setLocationData(() => ({
				coordinates: null,
				isLoading: false,
				error: 'Geolocation is not supported by your browser',
			}))
			return
		}

		navigator.geolocation.getCurrentPosition(
			(position) =>
				setLocationData(() => ({
					coordinates: {
						lat: position.coords.latitude,
						lon: position.coords.longitude,
					},
					isLoading: false,
					error: null,
				})),
			(error) =>
				setLocationData(() => ({
					coordinates: null,
					isLoading: false,
					error: `An error is occuring, please check CODE: ${error.message}`,
				})),
			{
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0,
			}
		)
	}

	useEffect(() => {
		getLocation()
	}, [])

	return {
		...locationData,
		getLocation,
	}
}
