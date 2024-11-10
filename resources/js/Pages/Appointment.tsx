import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from "@/types";
import React,{ useState } from "react";
import axios from "axios";
import {AppointmentType} from "@/Pages/types";
import { toast,ToastContainer } from "react-toastify";
import { ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Appointment({ auth }: PageProps<{ appointments: AppointmentType[]}>) {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [patientId, setPatientId] = useState('');
    const [place, setPlace] = useState('');

    const toastOptions:ToastOptions = {
        position: "top-right",
        autoClose: 3000,
        closeOnClick:true,
        theme:"light",
    }

    const createAppointment = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.post('/appointments', {
            date: date,
            time: time,
            patient_id: patientId,
            place: place
        }).then(response => {
            console.log(response.data);
            toast.success("afsrpaak gemaakt",toastOptions)
            setTimeout(() => {
                document.location.href = '/dashboard';
            }, 3000); 
        }).catch(error => {
            console.log(error);
            if ('error' in error.response.data) {
                toast.error(error.response.data.error,toastOptions);
            }
            toast.error("vul alles in",toastOptions)
        });
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Afspraak maken</h2>}>
        <ToastContainer/>
        <div>
            <form className="max-w-7xl mx-auto sm:px-6 lg:px-8" onSubmit={createAppointment}>
                <div>
                    <label className="block" htmlFor="date">Date</label>
                    <input className="rounded-md" type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="mt-4">
                    <label className="block" htmlFor="time">Time</label>
                    <input className="rounded-md" type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
                <div className="mt-4">
                    <label className="block" htmlFor="patientId">Patient ID</label>
                    <input className="rounded-md" type="number" id="patientId" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
                </div>
                <div className="mt-4">
                    <label className="block" htmlFor="place">Place</label>
                    <input className="rounded-md" type="text" id="place" value={place} onChange={(e) => setPlace(e.target.value)} />
                </div>
                <button className="mt-4 px-4 py-2 bg-gray-800 border border-transparent rounded-md uppercase text-white text-xs hover:bg-gray-700 " type="submit">Create appointment</button>
            </form>
        </div>
        </AuthenticatedLayout>
    );
}
