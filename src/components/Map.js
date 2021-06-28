import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useState, useEffect, useRef } from 'react'
import '../index.css'
import CourtService from '../services/CourtService'
import KeyService from '../services/KeyService'
import Image from '../basketball-hoop-32px.png'

const Map = ({ lng, lat, zoomLevel }) => {

    const [map, setMap] = useState(null)
    const mapContainer = useRef(null)

    const loadPoints = async () => {
        let response = await CourtService.getCourts()
        if (response.status !== 200) {
            throw new Error(`Error, status: ${response.status}`)
        }

        const source = {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': []
            }
        }

        response.data.forEach(court => {
            source.data.features.push(
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': court.location.type,
                        'coordinates': [
                            court.location.x, court.location.y
                        ]
                    },
                    'properties': {
                        'title': court.address
                    }
                }
            )
        })

        return source
        
    }

    useEffect(() => {
        const initializeMap = async ({ setMap, mapContainer }) => {
            console.log('initializing map...')

            if (mapboxgl.accessToken === null) {
                await KeyService.getKeyByType('mapbox')
                    .then(response => {
                        mapboxgl.accessToken = response.data[0].key
                    })
                console.log(mapboxgl.accessToken)
            }

            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [lng, lat],
                zoom: zoomLevel
            })

            map.dragRotate.disable();
            map.touchZoomRotate.disableRotation();

            map.on('load', () => {
                setMap(map)
                map.resize()
                map.loadImage(
                    Image,
                    (error, image) => {
                        if (error) throw error
                        map.addImage('custom-marker', image)

                        loadPoints().then((points) => {
                            console.log(points)
                            map.addSource('points', points)
                            map.addLayer({
                                'id': 'points',
                                'type': 'symbol',
                                'source': 'points',
                                'layout': {
                                    'icon-image': 'custom-marker',
                                    'text-field': ['get', 'title'],
                                    'text-font': [
                                        'Open Sans Semibold',
                                        'Arial Unicode MS Bold'
                                    ],
                                    'text-offset': [0, 1.25],
                                    'text-anchor': 'top'
                                }
                            })
                        })
                        
                    }
                )
            })
        }

        if (!map) initializeMap({ setMap, mapContainer })
    }, [map, lng, lat, zoomLevel])

    return (
        <section id='mapContainer' style={{ height: '749px' }}>
            <div className='map-container'>
                <div id='map' ref={el => (mapContainer.current = el)} style={{ position: 'relative' }} />
            </div>
        </section>
    )
}

export default Map
