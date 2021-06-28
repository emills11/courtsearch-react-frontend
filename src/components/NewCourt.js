import { useState } from 'react'
import '../index.css'

const NewCourt = () => {
    const [longitude, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [prov, setProv] = useState('')
    const [zip, setZip] = useState('')
    const [country, setCountry] = useState('')

    const [radioButton, setRadioButton] = useState('coords')

    const onSubmit = (e) => {
        e.preventDefault()

        if (radioButton === 'coords') {
            if (!longitude || !latitude) {
                alert('Please fill out required fields')
                return
            }

        } else {
            if (!address || !city || !prov || !zip || !country) {
                alert('Please fill out required fields')
                return
            }

        }

        setLongitude('')
        setLatitude('')
        setAddress('')
        setCity('')
        setProv('')
        setZip('')
        setCountry('')
        setRadioButton('coords')
    }

    return (
        <form className='form-container' onSubmit={onSubmit}>
            <div className='form-header'>
                <p>Is there a court in your area that you'd like to share with the community? Submit a request to have it added to the map!</p>
                <hr className='solid' />
            </div>
            <div className='form-radio' style={{'paddingRight': '6px'}}>
                <input
                    type='radio'
                    id='coords'
                    value='coords'
                    name='inputTypeGroup'
                    checked={radioButton === 'coords'}
                    onChange={(e) => setRadioButton(e.target.value)} />
                <label htmlFor='coords'>Court coordinates:</label>
            </div>
            <div className='form-sub-container'>
                <div className='form-row'>
                    <div className='form-control' style={{'width': '50%'}}>
                        <label>Longitude</label>
                        <input type='text' value={longitude} onChange={(e) =>
                        setLongitude(e.target.value)} disabled={radioButton !== 'coords'} />
                    </div>
                    <div className='form-control' style={{'marginLeft': '30px', 'width': '50%'}}>
                        <label>Latitude</label>
                        <input type='text' value={latitude} onChange={(e) =>
                        setLatitude(e.target.value)} disabled={radioButton !== 'coords'} />
                    </div>
                </div>
            </div>
            <div className='form-radio'>
                <input
                    type='radio'
                    id='address'
                    value='address'
                    name='inputTypeGroup' 
                    onChange={(e) => setRadioButton(e.target.value)} />
                <label htmlFor='address'>Court address info:</label>
            </div>
            <div className='form-sub-container'>
                <div className='form-control'>
                    <label>Address</label>
                    <input type='text' value={address} onChange={(e) =>
                    setAddress(e.target.value)} disabled={radioButton !== 'address'} />
                </div>
                <div className='form-control'>
                    <label>City</label>
                    <input type='text' value={city} onChange={(e) =>
                    setCity(e.target.value)} disabled={radioButton !== 'address'} />
                </div>
                <div className='form-row'>
                    <div className='form-control' style={{'width' : '75%'}}>
                        <label>State/Province</label>
                        <input type='text' value={prov} onChange={(e) =>
                        setProv(e.target.value)} disabled={radioButton !== 'address'} />
                    </div>
                    <div className='form-control' style={{'marginLeft': '30px', 'width': '25%'}}>
                        <label>ZIP/Postal Code</label>
                        <input type='text' value={zip} onChange={(e) =>
                        setZip(e.target.value)} disabled={radioButton !== 'address'} />
                    </div>
                </div>
                <div className='form-control'>
                    <label>Country</label>
                    <input type='text' value={country} onChange={(e) =>
                    setCountry(e.target.value)} disabled={radioButton !== 'address'} />
                </div>
            </div>
            <button type='submit' className='submit-btn'>Submit</button>
        </form>
    )
}

export default NewCourt
