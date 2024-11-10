import { useState } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from "@/types";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import { ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function DoctorCreate({ auth }: PageProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [placeOfWork, setPlaceOfWork] = useState('');

    const toastOptions:ToastOptions = {
        position: "top-right",
        autoClose: 3000,
        closeOnClick:true,
        theme:"light",
    }

    function submitDoctor(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        axios.post('/doctors', {
            firstname: firstName,
            lastname: lastName,
            place: placeOfWork
        }).then(response => {
            console.log(response.data);
            toast.success("doctor gemaakt",toastOptions)
            setTimeout(() => {
                document.location.href = '/dashboard';
            }, 3000);
        }).catch(error => {
            console.log(error);
            if ('error' in error.response.data) {
                alert(error.response.data.error);
            }
            toast.error("vul alles in",toastOptions)
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Doctor creëren</h2>}
        >
            <ToastContainer/>
            <div>
                <form onSubmit={submitDoctor} className="flex flex-col gap-2 items-center justify-center pt-3">
                    <div className=" flex flex-col gap-1 bg-white rounded-md shadow-md px-3 py-2">
                        <label htmlFor="firstName">
                            First Name
                        </label>
                        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="px-3 py-2 shadow-md border-gray-200 rounded-md" />
                    </div>
                    <div className=" flex flex-col gap-1 bg-white rounded-md shadow-md px-3 py-2">
                        <label htmlFor="lastName">
                            Last Name
                        </label>
                        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="px-3 py-2 shadow-md border-gray-200 rounded-md" />
                    </div>
                    <div className=" flex flex-col gap-1 bg-white rounded-md shadow-md px-3 py-2">
                        <label htmlFor="placeOfWork">
                            Place of Work
                        </label>
                        <input type="text" id="placeOfWork" value={placeOfWork} onChange={(e) => setPlaceOfWork(e.target.value)} className="px-3 py-2 shadow-md border-gray-200 rounded-md" />
                    </div>
                    
                    <button type="submit" className="bg-blue-300 px-3 py-2 rounded-md shadow-md font-bold text-white">
                        Submit
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}