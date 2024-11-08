import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="pt-12 pb-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Welkom bij het systeem PRAVIS
                            {auth.user.role === 1 ? (
                                <div className=" flex flex-col gap-1 bg-gray-100 rounded-md shadow-md px-3 py-2">
                                    <p>hier kunt u als doctor:</p>
                                    <p>patient aanmaken</p>
                                    <p>facturatie aanmaken</p>
                                    <p>afspraken maken met een patient</p>
                                </div>
                            ) : (
                                <div className=" flex flex-col gap-1 bg-gray-100 rounded-md shadow-md px-3 py-2">
                                    <p>hier kunt u als patient:</p>
                                    <p>inschrijven voor wachtlijst</p>
                                    <p>incident melden</p>
                                </div>
                            )}

                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
