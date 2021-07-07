import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useEffect, useRef } from 'react';
import '../index.css';
import CourtService from '../services/CourtService';
import KeyService from '../services/KeyService';
import Image from '../basketball-hoop-32px.png';

const Map = ({ lng, lat, zoomLevel }) => {

    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    const loadPoints = async () => {
        let response = await CourtService.getCourts();
        if (response.status !== 200) {
            throw new Error(`Error, status: ${response.status}`);
        };

        const source = {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': []
            }
        };

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
            );
        });

        return source;
        
    };

    useEffect(() => {
        const initializeMap = async ({ setMap, mapContainer }) => {
            console.log('initializing map...');

            if (mapboxgl.accessToken === null) {
                await KeyService.getKeyByType('mapbox')
                    .then(response => {
                        mapboxgl.accessToken = response.data[0].key;
                    });
            };

            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [lng, lat],
                zoom: zoomLevel
            });

            map.dragRotate.disable();
            map.touchZoomRotate.disableRotation();

            map.addControl(new mapboxgl.NavigationControl({ showCompass: false }));

            map.on('load', () => {
                setMap(map);
                map.resize();
                map.loadImage(
                    Image,
                    (error, image) => {
                        if (error) throw error;
                        map.addImage('custom-marker', image);

                        loadPoints().then((points) => {
                            console.log(points);
                            map.addSource('points', points);
                            map.addLayer({
                                'id': 'points',
                                'type': 'symbol',
                                'source': 'points',
                                'layout': {
                                    'icon-image': 'custom-marker',
                                    'icon-allow-overlap': true,
                                    'text-font': [
                                        'Open Sans Semibold',
                                        'Arial Unicode MS Bold'
                                    ],
                                    'text-offset': [0, 1.25],
                                    'text-anchor': 'top'
                                }
                            });
                        });
                        
                    }
                );
            });

            map.on('click', 'points', (e) => {
                let coordinates = e.features[0].geometry.coordinates.slice();
                let description = `<h4>${e.features[0].properties.title}</h4>
                <p>Coordinates: ${coordinates[0].toPrecision(7)}, ${coordinates[1].toPrecision(7)}</p>`;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup({ offset: [0, -15] })
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);

                map.flyTo({
                    center: e.features[0].geometry.coordinates,
                    zoom: 15
                });
            });

            // Change the cursor to a pointer when the mouse is over the points layer.
            map.on('mouseenter', 'points', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
                
            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'points', () => {
                map.getCanvas().style.cursor = '';
            });
        }

        if (!map) initializeMap({ setMap, mapContainer });
    }, [map, lng, lat, zoomLevel]);

    return (
        <section id='mapContainer' style={{ height: '749px' }}>
            <div className='map-container'>
                <div id='map' ref={el => (mapContainer.current = el)} style={{ position: 'relative' }} />
            </div>
        </section>
    );
};

export default Map;
