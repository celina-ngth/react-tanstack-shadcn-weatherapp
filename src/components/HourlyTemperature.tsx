import { ForecastData } from '@/api/types'
import React from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card'
import {
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import { format } from 'date-fns'

interface HourlyTemperatureProps {
	data: ForecastData
}

const HourlyTemperature: React.FC<HourlyTemperatureProps> = ({ data }) => {
	const chartData = data.list.slice(0, 8).map((item) => {
		return {
			time: format(new Date(item.dt * 1000), 'ha'),
			temp: Math.round(item.main.temp),
			feels_like: Math.round(item.main.feels_like),
		}
	})
	return (
		<Card className="flex-1">
			<CardHeader>
				<CardTitle>Today's temperature</CardTitle>
				<CardDescription>
					Discover today's temperature forcast hour by hour
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="w-full h-[200px]">
					<ResponsiveContainer width="100%" height="100%">
						{
							<LineChart data={chartData}>
								<XAxis
									dataKey="time"
									stroke="#888"
									tickLine={false}
									axisLine={false}
									fontSize={10}
								/>
								<YAxis
									stroke="#888"
									tickLine={false}
									axisLine={false}
									fontSize={10}
									tickFormatter={(time) => `${time}°`}
								/>

								<Tooltip
									content={({ active, payload }) => {
										if (active && payload && payload.length) {
											return (
												<div>
													<div className="flex items-baseline gap-2">
														<span className="font-semibold">
															Temperature: {payload[0].payload.temp}°
														</span>
														<span className="text-xs text-muted-foreground">
															{payload[1].payload.time}
														</span>
													</div>
													<div>
														Feels like: {payload[0].payload.feels_like}°
													</div>
												</div>
											)
										}
									}}
								/>

								<Line
									type="monotone"
									dataKey="temp"
									stroke="#888"
									strokeWidth={2}
									dot={true}
								/>
								<Line
									type="monotone"
									dataKey="feels_like"
									stroke="#444"
									strokeWidth={2}
									strokeDasharray={'2 2'}
									dot={false}
								/>
							</LineChart>
						}
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}

export default HourlyTemperature
