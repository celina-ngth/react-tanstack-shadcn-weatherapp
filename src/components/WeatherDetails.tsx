import { WeatherData } from '@/api/types'
import { Compass, Gauge, Sunrise, Sunset } from 'lucide-react'
import React from 'react'
import { format } from 'date-fns'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'

interface WeatherDetailsProps {
	data: WeatherData
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ data }) => {
	const { wind, main, sys } = data

	const formatTime = (timestamp: number) => {
		return format(new Date(timestamp * 1000), 'h:mm a')
	}

	const windDirection = (degree: number) => {
		const direction = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
		const index = Math.round(
			(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8
		)

		return direction[index]
	}

	const details = [
		{
			title: 'Sunrise',
			value: formatTime(sys.sunrise),
			icon: Sunrise,
			color: 'text-orange-500',
		},
		{
			title: 'Sunset',
			value: formatTime(sys.sunset),
			icon: Sunset,
			color: 'text-blue-500',
		},
		{
			title: 'Wind',
			value: `${windDirection(wind.deg)} (${wind.deg}) `,
			icon: Compass,
			color: 'text-green-500',
		},
		{
			title: 'Pressure',
			value: `${main.pressure} hPa `,
			icon: Gauge,
			color: 'text-purple-500',
		},
	]

	return (
		<Card>
			<CardHeader>
				<CardTitle>Weather details</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-6 sm:grid-cols-2">
					{details.map((detail) => {
						return (
							<div
								key={detail.title}
								className="flex items-center gap-3 rounded-lg border p-4"
							>
								<detail.icon className={`h-6 w-6 ${detail.color}`} />
								<div>
									<p className="text-sm font-medium">{detail.title}</p>
									<p className="text-sm text-muted-foreground">
										{detail.value}
									</p>
								</div>
							</div>
						)
					})}
				</div>
			</CardContent>
		</Card>
	)
}

export default WeatherDetails
