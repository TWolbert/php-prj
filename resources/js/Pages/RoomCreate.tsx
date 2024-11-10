import { useEffect, useState } from "react";
import axios from "axios";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from "@/types";
import { toast,ToastContainer } from "react-toastify";
import { ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function RoomCreate({ auth }: PageProps) {
    const [roomNumber, setRoomNumber] = useState('');
    const [isMultiplePeople, setIsMultiplePeople] = useState(false);
    const [taken, setTaken] = useState(false);
    const [roomRent,setRoomRent] = useState('');

    const toastOptions:ToastOptions = {
        position: "top-right",
        autoClose: 3000,
        closeOnClick:true,
        theme:"light",
    }


    useEffect(() => {
        if (parseInt(roomNumber) < 0) {
            setRoomNumber('0');
        }
    }, [roomNumber])

    const createRoom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        axios.post('/rooms', {
            number: roomNumber,
            room_type_id: isMultiplePeople ? 1 : 0,
            room_taken: taken,
            rent: roomRent,
        }).then(response => {
            console.log(response.data);
            toast.success("Room created",toastOptions);
            setTimeout(() => {
                document.location.href = '/dashboard';
            }, 3000);  
        }).catch(error => {
            console.log(error);
            if ('error' in error.response.data) {
                toast.error(error.response.data.error,toastOptions);
            }

        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kamer creëren</h2>}
        >
            <ToastContainer/>
            <div>
                <form onSubmit={createRoom} className=" flex flex-col gap-2 mx-[30rem] min-w-fit">
                    <div className=" flex flex-col bg-white px-3 py-2 mt-2 rounded-md shadow-md">
                        <label htmlFor="roomNumber">
                            Kamer nummer
                        </label>
                        <input type="number" id="roomNumber" min={0} className=" border-gray-200 rounded-md shadow-md" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
                    </div>
                    <div className=" flex flex-col bg-white px-3 py-2 mt-2 rounded-md shadow-md">
                        <label htmlFor="roomRent">
                            Huur per dag
                        </label>
                        <input type="number" id="roomRent" min={0} className=" border-gray-200 rounded-md shadow-md" value={roomRent} onChange={(e) => setRoomRent(e.target.value)} />
                    </div>
                    <div className=" flex gap-2 items-center bg-white px-3 py-2 mt-2 rounded-md shadow-md justify-between"> 
                        <label htmlFor="isMultiplePeople">
                            Kamer voor meerdere personen?
                        </label>
                        <input type="checkbox" id="isMultiplePeople" checked={isMultiplePeople} onChange={(e) => setIsMultiplePeople(e.target.checked)} />
                    </div>
                    <div className=" flex gap-2 items-center bg-white px-3 py-2 mt-2 rounded-md shadow-md justify-between">
                        <label htmlFor="taken">
                            Kamer al genomen?
                        </label>
                        <input type="checkbox" id="taken" checked={taken} onChange={(e) => setTaken(e.target.checked)} />
                    </div>
                    <button type="submit" className="bg-blue-300 px-3 py-2 rounded-md shadow-md font-bold text-white">
                        creër kamer
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}