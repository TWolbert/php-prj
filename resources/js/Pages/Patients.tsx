import { PageProps } from "@/types";
import { PatientType } from "./types";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";

export default function Patients({ auth, patients }: PageProps<{ patients: PatientType[] }>) {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<PatientType[]>(patients);

    useEffect(() => {
        const results: PatientType[] = [];

        patients.forEach(patient => {
            const fullname = patient.firstname + patient.lastname;

            if (fullname.includes(query)) {
                results.push(patient);
            }
        });

        setSearchResults(results);
    }, [query])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Patienten opzoeken</h2>}
        >
            <div className="flex flex-col items-center justify-center">
                <label htmlFor="search">
                    Zoek patiënten
                </label>
                <div className=" flex gap-2 items-center justify-center">
                    <input id="search" type="text" className=" rounded-md px-3 py-2 border-none shadow-md" value={query} onChange={(e) => setQuery(e.target.value)} />
                    <Link href={route('patientcreate')} className=" bg-blue-300 px-3 py-2 rounded-md shadow-md font-bold text-white" >
                        + Patient
                    </Link>
                </div>

            </div>

            <div className=" flex flex-col items-center justify-center pt-3 px-[30rem] gap-2">
                {searchResults.map(patient => <div key={patient.id} className="bg-white w-full px-3 py-2 shadow-md flex justify-between items-center rounded-md">
                    <div className=" flex items-center gap-1 justify-between">
                        <p className="text-gray-500"> {patient.id}. </p>
                        <p className="font-bold">
                            {patient.firstname} {patient.lastname}
                        </p>
                    </div>
                    <div className=" flex gap-2">
                        <IsDeadBulb isDead={patient.is_dead} isExtern={patient.is_extern} />
                        <Link href={route('patientinfo', patient.id)} className="bg-blue-300 px-3 py-2 rounded-md shadow-md font-bold text-white" >
                            Details {'>'}
                        </Link>
                    </div>
                </div>)}
            </div>

        </ AuthenticatedLayout>
    )
}

function IsDeadBulb({ isDead, isExtern }: { isDead: boolean, isExtern: boolean }) {
    if (isDead) {
        return <div className="bg-red-300 p-2 rounded-md">Dood</div>
    } else if (!isExtern) {
        return <div className="bg-green-300 p-2 rounded-md">Intern</div>
    } else if (isExtern) {
        return <div className="bg-blue-300 p-2 rounded-md">Extern</div>
    }
}