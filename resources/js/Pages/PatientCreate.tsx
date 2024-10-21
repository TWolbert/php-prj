import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

export default function PatientCreate({ auth, patients }:PageProps) {

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">patient creëren</h2>}
    >
        <div>
    
        </div>
        </AuthenticatedLayout>
    )
}