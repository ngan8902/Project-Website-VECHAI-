import { MapContainer, TileLayer, Marker, Popup, LocationMarker } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import style from '@/styles/Dashboard.module.css'

export default function Map() {
    const position = [10.847580, 106.635050]
    return (
        <MapContainer className={style.map} center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker> */}
            
        </MapContainer>
    )
}