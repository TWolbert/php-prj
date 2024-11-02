import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {PageProps} from "@/types";
import React, {useEffect} from "react";
import axios from "axios";
import {ArchiveType, PatientType, DoctorType, RoomType, Address} from "@/Pages/types";

export default function Archive({ auth, patients, doctors, rooms, address }: PageProps<{ archive: ArchiveType[], patients: PatientType[], doctors: DoctorType, rooms: RoomType, address: Address[]}>) {
    const [patients, setPatients] = useState<PatientType[]>([]);
    const [doctors, setDoctors] = useState<DoctorType[]>([]);
    const [rooms, setRooms] = useState<RoomType[]>([]);
    const [address, setAddress] = useState<Address[]>([]);
    useEffect(() => {

    }, []);
return (
<AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Archief</h2>}>
        <div>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                test
            </div>
        </div>
    </AuthenticatedLayout>
    );
}
