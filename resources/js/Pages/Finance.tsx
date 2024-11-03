import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { PatientType, RoomType } from './types';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Finance({ auth,patients,rooms }: PageProps<{patients: PatientType[], rooms:RoomType[]}>) {

    const [patientId,setPatientId] = useState('');
    const [roomId,setRoomId] = useState('');
    const [careCost,setCareCost] = useState(0);
    const [roomRent,setRoomRent] = useState(0);
    const [roomDays,setRoomDays] = useState(0);
    const [totalCost,setTotalCost] = useState(0);


    useEffect(() => {
        setTotalCost(roomDays * roomRent + careCost);
    }, [roomDays,careCost]);

    
    const searchPatientId = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const id = e.target.value;
        setPatientId(id);

        const patient = patients.find((patient) => patient.id.toString() === id);
        const roomIdFromPatient = patient ? patient.room_id : null;
        const correspondingRoom = roomIdFromPatient ? rooms.find((room) => room.id === roomIdFromPatient) : null;
        setRoomId(correspondingRoom ? correspondingRoom.id.toString() : ''); 
        setRoomRent(correspondingRoom ? correspondingRoom.rent : 0);
    };

    const sendVacancy = (e: React.FormEvent<HTMLFormElement>) =>{
        if(!patientId || !careCost || !roomDays) {
            alert("vul alles in")
            return false;
        }
        e.preventDefault();
        axios.post('/Billings',{

            patient_id:patientId,
            room_id:roomId,
            care_costs:careCost,
            rent_per_day:roomRent,
            days_in_room:roomDays,
            total_cost:totalCost
        }).then(response =>{
            console.log(response)
            alert("facturatie opgestuurd")
            document.location.href = '/dashboard';
        }).catch(error =>{
            console.log(error)
        })
    }
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">facturatie maken </h2>}
        >
            <div>
                <form onSubmit={sendVacancy} className=" flex flex-col gap-2 mx-[30rem] min-w-fit">

                    <div className="flex flex-col bg-white px-3 py-2 mt-2 rounded-md shadow-md">
                        <label className="block" htmlFor='patientId'>
                            patient id
                        </label>
                        <input className="border-gray-200 rounded-md shadow-md" id='patientId' type='text' onChange={searchPatientId} />
                    </div>

                    <div className="flex flex-col bg-white px-3 py-2 mt-2 rounded-md shadow-md">
                        <label className="block" htmlFor='roomId'>
                            kamer id
                        </label>
                        <input className={'bg-gray-200 rounded-md shadow-md'} id='roomId' type='text' value={roomId} disabled />
                    </div>

                    <div className="flex flex-col bg-white px-3 py-2 mt-2 rounded-md shadow-md">
                        <label className="block" htmlFor='careCost'>
                            verzorgingskosten
                        </label>
                        <input className="border-gray-200 rounded-md shadow-md" id='careCost' type='number' min={1}  onChange={(e) => setCareCost(Number(e.target.value))} />
                    </div>

                    <div className="flex flex-col bg-white px-3 py-2 mt-2 rounded-md shadow-md">
                        <label className="block" htmlFor='rentPerDay'>
                            huur per dag
                        </label>
                        <input className={'bg-gray-200 rounded-md shadow-md'} id='rentPerDay' type='text' value={roomRent}  disabled />
                    </div>

                    <div className="flex flex-col bg-white px-3 py-2 mt-2 rounded-md shadow-md">
                        <label className="block" htmlFor='daysOnRoom'>
                            hoeveel dagen op kamer
                        </label>
                        <input className="border-gray-200 rounded-md shadow-md" id='daysOnRoom' type='number' min={1} onChange={(e) => setRoomDays(Number(e.target.value))} />
                    </div>

                    <div className="flex flex-col bg-white px-3 py-2 mt-2 rounded-md shadow-md">
                        <label className="block" htmlFor='totalCost'>
                            totale kosten
                        </label>
                        <input className={'bg-gray-200 rounded-md shadow-md'}  id='totalCost' type='text' value={totalCost} disabled />
                    </div>

                    <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                        opslaan
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}