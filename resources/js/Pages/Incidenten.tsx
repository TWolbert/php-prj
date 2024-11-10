import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from "@/types";
import { IncidentenType } from "./types";
import { toast,ToastContainer } from "react-toastify";
import { ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Incidenten({ auth, incident  }: PageProps<{ incident: IncidentenType[] }>) {

    const [id, setId] = useState('');
    const [date, setDate] = useState('');
    const [sortInjury, setSortInjury] = useState('');
    const [patientId, setPatientId] = useState('');

    const toastOptions:ToastOptions = {
        position: "top-right",
        autoClose: 3000,
        closeOnClick:true,
        theme:"light",
    }


    const createIncident = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('/incident', {
            date: date,
            sort_injury: sortInjury,
            patient_id: patientId
        }).then(response => {
            console.log(response.data);
           toast.success("incident opgeslagen",toastOptions)
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
             <ToastContainer/>
            <div>

                <form onSubmit={createIncident} className=" flex flex-col gap-2 mx-[30rem] min-w-fit">

                    <div className="flex flex-col bg-white px-3 py-2 mt-2 rounded-md shadow-md">
                        <label className="block" htmlFor='date'>
                            datum
                        </label>
                        <input className="border-gray-200 rounded-md shadow-md" id='date' type='date' value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>

                    <div className="flex flex-col bg-white px-3 py-2 mt-2 rounded-md shadow-md">
                        <label className="block" htmlFor='injury'>
                            verwonding
                        </label>
                        <input className="border-gray-200 rounded-md shadow-md" id='injury' type='text' value={sortInjury} onChange={(e) => setSortInjury(e.target.value)} />
                    </div>

                    <div className="flex flex-col bg-white px-3 py-2 mt-2 rounded-md shadow-md">
                        <label className="block" htmlFor='patientId'>
                            patient id
                        </label>
                        <input className="border-gray-200 rounded-md shadow-md" id='patientId' type='text' value={patientId} onChange={(e) => setPatientId(e.target.value)} />
                    </div>
                    <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" type="submit">
                        incident melden
                    </button>
                </form>
              
            </div>

        </AuthenticatedLayout>
    );
}