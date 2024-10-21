import { PageProps } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Patientinfo ({ auth, patients }: PageProps<{ patients: [] }>) {
    
    const [searchId,setSearchId] = useState('');
    const [id,setId] = useState('');
    const [firstname,setFirstName] = useState('');
    const [lastname,setLastName] = useState('');
    const [birthdate,setBirthDate] = useState('')
    const [doctorId,setDoctorId] = useState('');
    const [addressId,setAddressId] = useState('');
    const [roomId,setRoomId] = useState('');

    const [editable,setEditable] = useState(false);

    const getPatientinfo = async() => {
        try {
            const response = await axios.get(`/getpatients/${searchId}`);
            console.log("response data",response.data);
            const patient = response.data;

            setId(patient.id || '');
            setFirstName(patient.firstname || '');
            setLastName(patient.lastname || '');
            setBirthDate(patient.birth_date || '');
            setDoctorId(patient.doctor_id || '');
            setAddressId(patient.address_id || '');
            setRoomId(patient.room_id || '');
            setEditable(false);
        } catch (error) {
            console.log("error",error)
            alert("id bestaat niet");
            emptyForm();
        }
    };

    const changePatientinfo = async() => {
        try {
            const updateData = {
            firstname,
            lastname,
            birth_date:birthdate,
            doctor_id:doctorId,
            address_id:addressId,
            room_id:roomId
            };
            const changeResponse = await axios.patch(`/updatepatients/${id}`,updateData)
            console.log(changeResponse.data);
            alert("update gelukt");
        } catch (error) {
            console.log("error",error);
            alert("er is een fout opgetreden");
        }
    };

    const searchButton = (e:React.FormEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    getPatientinfo();
    };

    const emptyForm = () =>{
        setId('');
        setFirstName('');
        setLastName('');
        setBirthDate('');
        setDoctorId('');
        setAddressId('');
        setRoomId('');
    }

    const toggleEdit = () => {
       setEditable(!editable);
    }

    return(
        <div>
            {JSON.stringify(patients)}
            <form className="p-4 ">
                    <label className="block" htmlFor="searchId">
                    zoek id
                    </label>
                    <input id="searchId" type="number" min={1} value={searchId} onChange={(e)=>setSearchId(e.target.value)} />
                    <div className="mt-4">
                    <button className="p-4 bg-blue-400" onClick={searchButton}>
                    zoek patient op met id                     
                    </button>
                    </div>
            </form>

            {/* info van patient terugzien in een form format */}
            <form className="mb-4 p-4">
                <div className="mb-4">
                    <label className="block" htmlFor='id' >
                    id
                    </label>
                    <input className="bg-gray-200" id='id' type='text' value={id} readOnly onChange={(e) => setId(e.target.value)}/>
                </div>
                <div className="mb-4">
                    <label className="block" htmlFor='firstname'>
                    voornaam
                    </label>
                    <input className={editable ? 'bg-white' : 'bg-gray-200'} id='firstname' type='text' value={firstname} readOnly={!editable} onChange={(e) =>setFirstName(e.target.value)}/>
                    
                </div>
                <div className="mb-4">
                    <label className="block" htmlFor='lastname'>
                    achternaam
                    </label>
                    <input className={editable ? 'bg-white' : 'bg-gray-200'}id='lastname' type='text' value={lastname} readOnly={!editable} onChange={(e) => setLastName(e.target.value)} />
                    
                </div>
                <div className="mb-4">
                    <label className="block" htmlFor='birthdate'>
                    geboortedatum
                    </label>
                    <input className={editable ? 'bg-white' : 'bg-gray-200'} id='birthdate' type='date' value={birthdate} readOnly={!editable} onChange={(e) => setBirthDate(e.target.value)}/>
                    
                </div>
                <div className="mb-4">
                    <label className="block" htmlFor='doctorId'>
                    doctorid
                    </label>
                    <input className={editable ? 'bg-white' : 'bg-gray-200'} id='doctorId' type='text' value={doctorId} readOnly={!editable} onChange={(e) => setDoctorId(e.target.value)}/>
                    
                </div>
                <div className="mb-4">
                    <label className="block" htmlFor='addressId'>
                    adressid
                    </label>
                    <input className={editable ? 'bg-white' : 'bg-gray-200'} id='addressId' type='text' value={addressId} readOnly={!editable} onChange={(e) => setAddressId(e.target.value)}/>
                    
                </div>
                <div className="mb-4">
                    <label className="block" htmlFor='roomId'>
                    kamerid
                    </label>
                    <input className={editable ? 'bg-white' : 'bg-gray-200'} id='roomId' type='text' value={roomId} readOnly={!editable} onChange={(e) => setRoomId(e.target.value)}/>
                    
                </div>
                <div className="mt-4 justify-between ">
                    <button className="p-4 bg-blue-400 mr-4" onClick={(e) =>{e.preventDefault(); toggleEdit();}}>
                    Klik hier om de gegevens te veranderen                     
                    </button>

                    <button  className={editable ? 'p-4 bg-blue-400 mr-4' : 'p-4 bg-gray-200 mr-4'} disabled={!editable} onClick={changePatientinfo}>
                    Klik hier om de gegevens op te slaan
                    </button>
                </div>

            </form>
        </div>
    );
}