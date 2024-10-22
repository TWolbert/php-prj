import { useEffect, useState } from "react";
import axios from "axios";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from "@/types";


export default function RoomCreate({ auth }: PageProps) {
    const [roomNumber, setRoomNumber] = useState('');
    const [isMultiplePeople, setIsMultiplePeople] = useState(false);
    const [taken, setTaken] = useState(false);

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
            room_taken: taken
        }).then(response => {
            console.log(response.data);
            alert("Room created");
            document.location.href = '/dashboard';
        }).catch(error => {
            console.log(error);
            if ('error' in error.response.data) {
                alert(error.response.data.error);
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Doctor creëren</h2>}
        >
            <div>
                <form onSubmit={createRoom} className=" flex flex-col gap-2 mx-[30rem] min-w-fit">
                    <div className=" flex flex-col bg-white px-3 py-2 mt-2 rounded-md shadow-md">
                        <label htmlFor="roomNumber">
                            Room number
                        </label>
                        <input type="number" id="roomNumber" min={0} className=" border-gray-200 rounded-md shadow-md" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
                    </div>
                    <div className=" flex gap-2 items-center bg-white px-3 py-2 mt-2 rounded-md shadow-md justify-between"> 
                        <label htmlFor="isMultiplePeople">
                            Is this a room for multiple people?
                        </label>
                        <input type="checkbox" id="isMultiplePeople" checked={isMultiplePeople} onChange={(e) => setIsMultiplePeople(e.target.checked)} />
                    </div>
                    <div className=" flex gap-2 items-center bg-white px-3 py-2 mt-2 rounded-md shadow-md justify-between">
                        <label htmlFor="taken">
                            Is this room already taken?
                        </label>
                        <input type="checkbox" id="taken" checked={taken} onChange={(e) => setTaken(e.target.checked)} />
                    </div>
                    <button type="submit">
                        Create room
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}