import React from 'react'
import { GeocodingResponse, WeatherData } from '@/api/types'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowDown, ArrowUp, Droplets, Wind } from 'lucide-react'

interface CurrentWeatherProps {
	data: WeatherData
	locationName?: GeocodingResponse
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
	data,
	locationName,
}) => {
	const {
		weather: [currentWeather],
		main: { temp, feels_like, temp_min, temp_max, humidity },
		wind: { speed },
	} = data

	const formatTemperature = (temp: number) => `${Math.round(temp)}°`

	return (
		<div>
			<Card className="overflow-hidden">
				<CardContent className="p-6">
					<div className="grid gap-6 md:grid-cols-2">
						<div className="flex flex-col gap-4">
							<div>
								<div className="flex items-baseline">
									<h2 className="text-2xl font-bold">{locationName?.name}</h2>
									{locationName?.state && (
										<span className="text-muted-foreground">
											, {locationName.state}, {locationName.country}
										</span>
									)}
								</div>
							</div>

							<div className="flex items-center gap-2">
								<p className="text-6xl font-bold">{formatTemperature(temp)}</p>
								<div>
									<p className="text-sm font-medium text-muted-foreground">
										Feels like {formatTemperature(feels_like)}
									</p>
									<div className="flex gap-2 text-sm font-medium">
										<span className="flex items-center gap-1 text-blue-500">
											<ArrowDown className="h-3 w-3" />
											{formatTemperature(temp_min)}
										</span>
										<span className="flex items-center gap-1 text-red-500">
											<ArrowUp className="h-3 w-3" />
											{formatTemperature(temp_max)}
										</span>
									</div>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="flex items-center gap-4">
									<Droplets className="h-6 w-6 text-blue-500" />
									<div>
										<p className="text-sm font-medium">Humidity</p>
										<p className="text-sm text-muted-foreground">{humidity}%</p>
									</div>
								</div>

								<div className="flex items-center gap-4">
									<Wind className="h-6 w-6 text-blue-500" />
									<div>
										<p className="text-sm font-medium">Wind Speed</p>
										<p className="text-sm text-muted-foreground">{speed} m/s</p>
									</div>
								</div>
							</div>
						</div>

						<div className="flex flex-col items-center justify-center">
							<div className="relative flex aspect-square w-full max-w-[150px] items-center justify-center">
								<img
									src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
									alt={currentWeather.description}
									className="h-full w-full object-contain"
								/>
								<div className="absolute bottom-0 text-center">
									<p className="text-sm capitalize">
										{currentWeather.description}
									</p>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default CurrentWeather
