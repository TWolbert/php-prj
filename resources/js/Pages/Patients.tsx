import { PageProps } from "@/types";
import { PatientType } from "./types";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from "react";

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
            <div>
                <label htmlFor="search">
                    zoekbalk
                </label>
                <input id="search" type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>

            {searchResults.map(patient => <p key={patient.id}>
                {patient.firstname} {patient.lastname}
            </p>)}

            <button className="bg-blue-400 p-4">
            patient maken
            </button>
            
        </ AuthenticatedLayout>
    )
}