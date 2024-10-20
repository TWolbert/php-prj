import React, { useState } from "react";
import axios from "axios";
export default function Voorvallen() {
    
    const [searchId,setSearchId] = useState('');
    const [id,setId] = useState('');
    const [date,setDate] = useState('');
    const [sortInjury,setSortInjury] = useState('');
    const [patientId,setPatientId] = useState('');

    const getIncidents = async() =>{
        try {
            const response = await axios.get(`/getincidents/${searchId}`);
            console.log(response.data);
            const incident = response.data;
            setId(incident.id || '');
            setDate(incident.date || '');
            setSortInjury(incident.sort_injury || '');
            setPatientId(incident.patient_id || '');
        } catch (error) {
            console.log("error",error)
            alert("id bestaat niet")
        }
    }

    const searchButton =(e:React.FormEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        getIncidents();
    };

    return(
        <div>
             <form className="p-4 ">
                    <label className="block" htmlFor="searchId">
                    zoek id
                    </label>
                    <input id="searchId" type="number" min={1} value={searchId} onChange={(e)=>setSearchId(e.target.value)} />
                    <div className="mt-4">
                    <button className="p-4 bg-blue-400" onClick={searchButton}>
                    zoek voorval met id                      
                    </button>
                    </div>
            </form>
            
            <form className="mb-4 p-4">
                <div className="mb-4">
                    <label className="block" htmlFor='id'>
                    id
                    </label>
                    <input className="bg-gray-200" id='id' type='number' min={0} value={id} readOnly />
                </div>

                <div className="mb-4">
                    <label className="block" htmlFor='date'>
                    datum
                    </label>
                    <input id='date' type='date' value={date} readOnly />
                </div>

                <div className="mb-4">
                    <label className="block" htmlFor='injury'>
                    verwonding
                    </label>
                    <input id='injury' type='text' value={sortInjury} readOnly />
                </div>

                <div className="mb-4">
                    <label className="block" htmlFor='patientId'>
                    patient id
                    </label>
                    <input id='patientId' type='text' value={patientId} readOnly />
                </div>
            </form>
        </div>
    );
}