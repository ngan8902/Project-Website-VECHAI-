import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import style from '@/styles/Dashboard.module.css'
import { useState, useEffect } from 'react'

export default function Map({ markerList = [],
    center = [10.847580, 106.635050],
    zoom = 16,
    scrollWheelZoom = true }) {

    const [marker, setMarker] = useState(markerList)

    useEffect(() => {
        setMarker(markerList)
    }, [markerList])

    var greenIcon = L.icon({
        iconUrl: 'marker-icon.png',
        iconSize: [38, 95]

    })
    const position = [10.847580, 106.635050]

    return (
        <>
            <MapContainer className={style.map} center={center} zoom={zoom} scrollWheelZoom={scrollWheelZoom}>
                
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
            {
                marker.map((markers, index) => {
                    return (
                        <Marker position={center.position} key={index}>
                            <Popup>
                                A pretty CSS3 popup. s<br /> Easily customizable.
                            </Popup>
                        </Marker>
                    )
                })
            }
        </>
    )
}