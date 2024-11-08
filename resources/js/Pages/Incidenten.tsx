import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from "@/types";
import { IncidentenType, PatientType } from "./types";


export default function Incidenten({ auth, incident, patients  }: PageProps<{ incident: IncidentenType[], patients: PatientType[] }>) {

    const [id, setId] = useState('');
    const [date, setDate] = useState('');
    const [sortInjury, setSortInjury] = useState('');
    const [patientId, setPatientId] = useState('');



    const createIncident = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('/incident', {
            date: date,
            sort_injury: sortInjury,
            patient_id: patientId
        }).then(response => {
            console.log(response.data);
            alert("incident gemaakt")
        }).catch(error => {
            console.log(error)
        })
        setDate('')
        setSortInjury('')
        setPatientId('')
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Incident melden</h2>}
        >
            <div>

                <form onSubmit={createIncident} className=" flex flex-col gap-2 min-w-fit max-w-[50%] mx-auto p-3 mt-5">

                    <div className="flex flex-col px-3 py-2 mt-2 bg-white rounded-md shadow-md">
                        <label className="block" htmlFor='date'>
                            Datum
                        </label>
                        <input id='date' type='date' className="w-full rounded-md shadow-md" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>

                    <div className="flex flex-col px-3 py-2 mt-2 bg-white rounded-md shadow-md">
                        <label className="block" htmlFor='injury'>
                            Verwonding
                        </label>
                        <input id='injury' type='text' className="w-full rounded-md shadow-md"  value={sortInjury} onChange={(e) => setSortInjury(e.target.value)} />
                    </div>

                    <div className="flex flex-col px-3 py-2 mt-2 bg-white rounded-md shadow-md">
                        <label className="block" htmlFor='patientId'>
                            Patient
                        </label>
                        <select id='patientId' className="w-full rounded-md shadow-md"  value={patientId} onChange={(e) => setPatientId(e.target.value)}>
                            {patients.map((patient) => (
                                <option key={patient.id} value={patient.id}>
                                    {patient.firstname} {patient.lastname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="p-2 font-bold text-white bg-blue-400 rounded-md shadow-md">
                        Incident Melden
                    </button>
                </form>
               
            </div>

        </AuthenticatedLayout>
    );
}