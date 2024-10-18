import axios from "axios";
import { useEffect, useState } from "react";

export default function Patientinfo () {
   
    const [id,setId] = useState('');
    const [firstname,setFirstName] = useState('');
    const [lastname,setLastName] = useState('');
    const [birthdate,setBirthDate] = useState('')
    const [doctorId,setDoctorId] = useState('');
    const [addressId,setAddressId] = useState('');
    const [roomId,setRoomId] = useState('');


    useEffect(()=>{
        const getPatientinfo = async() => {
            try {
                const response = await axios.get('/getpatients');
                console.log("response data",response.data);
                const patient = response.data[0];

                setId(patient.id || '');
                setFirstName(patient.firstname || '');
                setLastName(patient.lastname || '');
                setBirthDate(patient.birth_date || '');
                setDoctorId(patient.doctor_id || '');
                setAddressId(patient.address_id || '');
                setRoomId(patient.room_id || '');
            } catch (error) {
                console.log("error",error)
            }
        };
        getPatientinfo();
    },[])

    return(
        <div>
            <form className="mb-4 p-4">
                <div className="mb-4">
                    <label className="block" htmlFor='id' >
                    id
                    </label>
                    <input id='id' type='text' value={id} onChange={(e) => setId(e.target.value)}/>
                </div>
                <div className="mb-4">
                    <label className="block" htmlFor='firstname'>
                    voornaam
                    </label>
                    <input id='firstname' type='text' value={firstname} onChange={(e) =>setFirstName(e.target.value)}/>
                    
                </div>
                <div className="mb-4">
                    <label className="block" htmlFor='lastname'>
                    achternaam
                    </label>
                    <input id='lastname' type='text' value={lastname} onChange={(e) => setLastName(e.target.value)} />
                    
                </div>
                <div className="mb-4">
                    <label className="block" htmlFor='birthdate'>
                    geboortedatum
                    </label>
                    <input id='birthdate' type='date' value={birthdate} onChange={(e) => setBirthDate(e.target.value)}/>
                    
                </div>
                <div className="mb-4">
                    <label className="block" htmlFor='doctorId'>
                    doctorid
                    </label>
                    <input id='doctorId' type='text' value={doctorId} onChange={(e) => setDoctorId(e.target.value)}/>
                    
                </div>
                <div className="mb-4">
                    <label className="block" htmlFor='addressId'>
                    adressid
                    </label>
                    <input id='addressId' type='text' value={addressId} onChange={(e) => setAddressId(e.target.value)}/>
                    
                </div>
                <div className="mb-4">
                    <label className="block" htmlFor='roomId'>
                    kamerid
                    </label>
                    <input id='roomId' type='text' value={roomId} onChange={(e) => setRoomId(e.target.value)}/>
                    
                </div>
            </form>
        </div>
    );
}