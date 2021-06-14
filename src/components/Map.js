import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useState, useEffect, useRef } from 'react'
import '../index.css'

const Map = ({ lng, lat, zoomLevel }) => {
    console.log(lng, lat, zoomLevel)

    const [map, setMap] = useState(null)
    const mapContainer = useRef(null)

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZW1pbGxzMTEiLCJhIjoiY2twdHlycjQzMHZnZjJxcXIyazZzajJkdiJ9.P54useshEspdsBTPPSrVfw'

        const initializeMap = ({ setMap, mapContainer }) => {
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
                    'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
                    (error, image) => {
                        if (error) throw error
                        map.addImage('custom-marker', image)
                        map.addSource('points', {
                            'type': 'geojson',
                            'data': {
                                'type': 'FeatureCollection',
                                'features': [
                                    {
                                        'type': 'Feature',
                                        'geometry': {
                                            'type': 'Point',
                                            'coordinates': [
                                                lng, lat
                                            ]
                                        },
                                        'properties': {
                                            'title': 'Current Location'
                                        }
                                    }
                                ]
                            }
                        })

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
                    }
                )
            })
        }

        if (!map) initializeMap({ setMap, mapContainer })
    }, [map, lng, lat, zoomLevel])

    return (
        <section id='mapContainer' style={{ height: '795px' }}>
            <div className='map-container'>
                <div id='map' ref={el => (mapContainer.current = el)} style={{ position: 'relative' }} />
            </div>
        </section>
    )
}

export default Map