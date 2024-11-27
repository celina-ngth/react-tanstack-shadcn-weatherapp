import LoadingSkeleton from '@/components/LoadingSkeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useGeolocation } from '@/hooks/useGeolocation'
import { AlertCircle, RefreshCcw } from 'lucide-react'
import React from 'react'

const Dashboard: React.FC = () => {
	const {
		coordinates,
		isLoading: locationLoading,
		error: locationError,
		getLocation,
	} = useGeolocation()

	console.log({ coordinates })

	const handleRefresh = () => {
		getLocation()

		if (coordinates) {
			// refresh
		}
	}

	if (locationLoading) {
		return <LoadingSkeleton />
	}

	if (locationError || !coordinates) {
		return (
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Erreur de position</AlertTitle>
				<AlertDescription>
					<p>{locationError}</p>
					<p>Veuillez autoriser le partage de position</p>

					<Button
						onClick={getLocation}
						variant="outline"
						className="w-fit mt-3"
					>
						Cliquez ici pour rééssayer
					</Button>
				</AlertDescription>
			</Alert>
		)
	}

	return (
		<div className="space-y-4">
			{/* Mes villes favorites */}

			<div className="flex items-center justify-between">
				<h1 className="text-xl font-bold tracking-tight">Ma localication</h1>
				<Button
					variant="outline"
					size="icon"
					onClick={handleRefresh}
					// disabled={ }
				>
					<RefreshCcw />
				</Button>
			</div>

			{/* Météo actuelle et à venir */}
		</div>
	)
}

export default Dashboard
