import { Droplets, Thermometer, Gauge } from 'lucide-react'
import { ComponentType } from 'react'

export type SensorSpecId = 'depths' | 'network' | 'batteryLife'
export type SensorFeatureId = 'soilMoisture' | 'temperature' | 'soilTension'

interface SensorSpec {
  id: SensorSpecId
  value: string
}

interface SensorFeature {
  id: SensorFeatureId
  icon: ComponentType<{ className?: string }>
}

export const sensorSpecs: SensorSpec[] = [
  { id: 'depths', value: '3' },
  { id: 'network', value: 'LoRaWAN' },
  { id: 'batteryLife', value: '3+' },
]

export const sensorFeatures: SensorFeature[] = [
  { id: 'soilMoisture', icon: Droplets },
  { id: 'temperature', icon: Thermometer },
  { id: 'soilTension', icon: Gauge },
]
