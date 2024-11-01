import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from "@/types";
import { IncidentenType } from "./types";


export default function Incidenten({ auth, incident  }: PageProps<{ incident: IncidentenType[] }>) {

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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Incident melden</h2>}
        >
            <div>

                <form onSubmit={createIncident} className=" flex flex-col gap-2 mx-[30rem] min-w-fit">

                    <div className="mb-4">
                        <label className="block" htmlFor='date'>
                            datum
                        </label>
                        <input id='date' type='date' value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label className="block" htmlFor='injury'>
                            verwonding
                        </label>
                        <input id='injury' type='text' value={sortInjury} onChange={(e) => setSortInjury(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label className="block" htmlFor='patientId'>
                            patient id
                        </label>
                        <input id='patientId' type='text' value={patientId} onChange={(e) => setPatientId(e.target.value)} />
                    </div>
                    <button type="submit">
                        incident melden
                    </button>
                </form>
               
            </div>

        </AuthenticatedLayout>
    );
}