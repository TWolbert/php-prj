import {useState } from 'react';
import { Head } from '@inertiajs/react';

export default function Afspraken() {
    const [isOpen, setIsOpen] = useState(false);
  
    const [date,setDate] = useState('');
    const [time,setTime] = useState('');
    const [patientId,setPatientId] = useState('');
    const [place,setPlace] = useState('');
    const [subject,setSubject] = useState('');
    const [description,setDescription] = useState('');
    const [error,setError] = useState('');


    const openModal = () => {
        if (isOpen) {
            setIsOpen(false);  
        } else {
            setIsOpen(true);  
        }
    };
    const MakeAppointment = (e:React.FormEvent<HTMLFormElement> ) => {
        {/* in here send the data from the form to the database,also close the form */}
        e.preventDefault();
        if( !date || !time ||!patientId ||!place ||!subject|| !description) {
            setError("Vul alle gegevens in");
            return;
        }
        setError('');
        setIsOpen(false);
};

    return (
        <div>         
            <Head title="Afspraken" />
            <header>
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Afspraken</h2>
            </header>

            <div className="mt-4 flex">
                <div className="w-1/4 h-[400px] bg-gray-200 p-4">
                <h2>Maak hier een afspraak</h2>
                    <button className='modal mt-4 bg-blue-400 rounded' onClick={openModal}>
                    afspraak maken
                    </button>
                </div>
                
                <div className="w-3/4 h-[400px] bg-white p-4 ml-4">
                    <p>This is the Afspraken page content.</p>
                   {/* hierin moet het data van de database halen en elk afspraak zijn eigen container hebben */}
                </div>
                
              
            </div>          

            {isOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded w-[40%] h-[75%]">
                        <h1 className="text-2x1 mb-4">maak een afspraak</h1>
                        <form className="" onSubmit={MakeAppointment}>
                           
                            <div className="mb-4">
                                <label className="block" htmlFor='date'>
                                datum
                                </label>
                                <input id='date' type='date' value={date} onChange={(e)=> setDate(e.target.value)}/>
                            </div>
                            <div className="mb-4">
                                <label className="block" htmlFor='time'>
                                tijd
                                </label>
                                <input id='time' type='text' value={time} onChange={(e)=> setTime(e.target.value)}/>
                            </div>
                            <div className="mb-4">
                                <label className="block" htmlFor='patientId'>
                                patient id
                                </label>
                                <input id='patientId' type='text' value={patientId} onChange={(e)=> setPatientId(e.target.value)}/>
                            </div>
                            <div className="mb-4">
                                <label className="block" htmlFor='place'>
                                plaats
                                </label>
                                <input id='place' type='text' value={place} onChange={(e)=> setPlace(e.target.value)}/>
                            </div>
                            <div className="mb-4">
                                <label className="block" htmlFor='subject'>
                                onderwerp
                                </label>
                                <input id='subject' type='text' value={subject} onChange={(e)=> setSubject(e.target.value)}/>
                            </div>
                            <div className="mb-4">
                                <label className="block" htmlFor='description'>
                                beschrijving
                                </label>
                                <input id='description' type='text' value={description} onChange={(e)=> setDescription(e.target.value)}/>
                            </div>
                       
                            <div className="flex justify-between mt-4">
                                <button className="p-4 bg-blue-400" type='submit'>
                                    Maak afspraak
                                </button>
                            {error &&(
                                <div className='text-red-500 mb-4'>{error}</div>
                            )}
                                <button className="p-4 bg-blue-400" onClick={openModal}>
                                    sluit venster                        
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}