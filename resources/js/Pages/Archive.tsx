import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {PageProps} from "@/types";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {ArchivePatientType} from "@/Pages/types";

export default function Archive({ auth,archivedPatients }: PageProps<{archivedPatients:ArchivePatientType[]}>) {
   
    const [data, setData] = useState<ArchivePatientType[]>(archivedPatients);

    useEffect(() => {
        setData(archivedPatients);
    }, [archivedPatients]);

    useEffect(() => {
        console.log(data);
    }, [data]);

return (
<AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Archief</h2>}>
        <div>
        <div className="flex flex-col items-center justify-center pt-3 px-[30rem] gap-2">
                        {data.length > 0 ? (
                           <ul className="w-full space-y-2">
                           {data.map((item, index) => (
                               <li key={index} className="bg-white w-full px-3 py-2 shadow-md flex justify-between items-center rounded-md">
                                   <div className="flex items-center gap-1 justify-between">
                                       <p className="text-gray-500">{index + 1}.</p>
                                       <p className="font-bold">
                                           {item.id}
                                       </p>
                                   </div>
                                   <p className="text-gray-500">patient id: {item.patient_id}</p>
                                   <p className="text-gray-500">kamer id: {item.room_id}</p>
                                   <p className="text-gray-500">doctor id: {item.doctor_id}</p>
                                   <p className="text-gray-500">adres id: {item.address_id}</p>
                               </li>
                           ))}
                       </ul>
                        ) : (
                            <p>Niemand in de wachtlijst</p>
                        )}
                    </div>
        </div>
    </AuthenticatedLayout>
    );
}
