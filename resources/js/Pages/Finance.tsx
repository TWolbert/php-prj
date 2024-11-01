import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { PatientType, RoomType } from './types';
import { useState } from 'react';

export default function Finance({ auth,patients,rooms }: PageProps<{patients: PatientType[], rooms:RoomType[]}>) {

    const [patientId,setPatientId] = useState('');
    const [roomId,setRoomId] = useState('');

    const searchPatientId = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const id = e.target.value;
        setPatientId(id);

        const patient = patients.find((patient) => patient.id.toString() === id);
        const roomIdFromPatient = patient ? patient.room_id : null;
        const correspondingRoom = roomIdFromPatient ? rooms.find((room) => room.id === roomIdFromPatient) : null;
        setRoomId(correspondingRoom ? correspondingRoom.id.toString() : ''); 
    };
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Facature maken </h2>}
        >
            <div>
                <form>

                    <div className="mb-4">
                        <label className="block" htmlFor='patientId'>
                            patient id
                        </label>
                        <input id='patientId' type='text' onChange={searchPatientId} />
                    </div>

                    <div className="mb-4">
                        <label className="block" htmlFor='roomId'>
                            kamer id
                        </label>
                        <input className={'bg-gray-200'} id='roomId' type='text' value={roomId} readOnly />
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    )
}