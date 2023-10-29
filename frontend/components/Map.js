import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useState, useEffect } from 'react'
import { icon } from "leaflet"
import { useMapEvents } from 'react-leaflet/hooks'
import "leaflet/dist/leaflet.css";
import style from '@/styles/Dashboard.module.css'


export default function Map({ markerList = [],
    center = [10.847580, 106.635050],
    zoom = 16,
    scrollWheelZoom = true,
    handleClickMapCb }) {

    const [markers, setMarkers] = useState(markerList)
    const [selectedMarkerPosition, setSelectedMarkerPosition] = useState([0, 0])


    const getIcon = (marker) => {
        const ICON = icon({
            iconUrl: marker.iconUrl || "../leaflet-icon/marker.png",
            iconSize: [35, 35],
        })
        return ICON
    }

    function Mark() {
        const map = useMapEvents({
            click: ({ latlng = {} }) => {
                console.log(latlng.lat)
                setSelectedMarkerPosition([latlng.lat, latlng.lng])
                handleClickMapCb && handleClickMapCb(latlng)
            },
        });
        return <Marker position={selectedMarkerPosition} icon={getIcon({})}></Marker>
    }




    return (
        <>
            <MapContainer className={style.map} center={center} zoom={zoom} scrollWheelZoom={scrollWheelZoom}>

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    markers.map((marker, index) => {
                        return (<Marker position={marker.position} key={index}
                            icon={getIcon(marker)}>
                            <Popup>
                                {marker.popupContent}
                            </Popup>
                        </Marker>
                        )
                    })

                }
            {
                handleClickMapCb ? <Mark></Mark> : null
            }

        </MapContainer >

        </>
    )
}