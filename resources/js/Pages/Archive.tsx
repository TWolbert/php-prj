import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArchivePatientType } from "@/Pages/types";
import { Link } from "@inertiajs/react";

export default function Archive({
    auth,
    archivedPatients,
}: PageProps<{ archivedPatients: ArchivePatientType[] }>) {
    const [data, setData] = useState<ArchivePatientType[]>(archivedPatients);

    useEffect(() => {
        setData(archivedPatients);
    }, [archivedPatients]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Archief
                </h2>
            }
        >
            <div>
                <div className="flex flex-col items-center justify-center pt-3 px-[30rem] gap-2">
                    {data.length > 0 ? (
                        <ul className="w-full space-y-2">
                            {data.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between w-full px-3 py-2 bg-white rounded-md shadow-md"
                                >
                                    <div className="flex items-center justify-between gap-1">
                                        <p className="text-gray-500">
                                            {index + 1}.
                                        </p>
                                        <p className="font-bold">{item.id}</p>
                                    </div>
                                    <p className="text-gray-500">
                                        patient id: {item.patient_id}
                                    </p>
                                    <p className="text-gray-500">
                                        kamer id: {item.room_id}
                                    </p>
                                    <p className="text-gray-500">
                                        doctor id: {item.doctor_id}
                                    </p>
                                    <p className="text-gray-500">
                                        adres id: {item.address_id}
                                    </p>
                                    <Link
                                        href={`/patients/${item.patient_id}`}
                                        className="text-blue-500"
                                    >
                                        <p className="text-blue-500">
                                            Bekijk patient
                                        </p>
                                    </Link>
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
