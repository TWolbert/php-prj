import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { WaitingListType } from './types';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function WaitingList({ auth, list }: PageProps<{ list: WaitingListType[] }>) {

    const { name, email } = auth.user;
    const [data, setData] = useState<WaitingListType[]>(list);

    useEffect(() => {
        setData(list);
    }, [list]);

    useEffect(() => {
        console.log(data);
    }, [data]);
    const SignInWaitingList = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('/waitinglist', {
            name: name,
            email: email,
        }).then(response => {
            console.log(response)
            alert("U bent ingeschreven")
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Inschrijven wachtlijst</h2>}
        >
            <div className="flex justify-center items-center h-screen">
                {auth.user.role === 0 && (

                    <form onSubmit={SignInWaitingList}>
                        <button type="submit" className="bg-blue-400 p-4">
                            inschrijven
                        </button>
                    </form>


                )}
            </div>

            <div>
                {auth.user.role === 1 && (

                    <div className="flex flex-col items-center justify-center pt-3 px-[30rem] gap-2">
                        {data.length > 0 ? (
                           <ul className="w-full space-y-2">
                           {data.map((item, index) => (
                               <li key={index} className="bg-white w-full px-3 py-2 shadow-md flex justify-between items-center rounded-md">
                                   <div className="flex items-center gap-1 justify-between">
                                       <p className="text-gray-500">{index + 1}.</p>
                                       <p className="font-bold">
                                           {item.name}
                                       </p>
                                   </div>
                                   <p className="text-gray-500">Email: {item.email}</p>
                               </li>
                           ))}
                       </ul>
                        ) : (
                            <p>Niemand in de wachtlijst</p>
                        )}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    )
}