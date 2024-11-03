import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { useEffect, useState } from 'react';
import { DoctorType, PatientType, Address, RoomType, WaitingListType } from './types';
import axios from 'axios';

export default function PatientCreate({ auth, doctors, rooms, waitinglist }: PageProps<{ doctors: DoctorType[], rooms: RoomType[], waitinglist: WaitingListType[] }>) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        if (firstName.length > 255) setFirstName(firstName.slice(0, 255));
        if (lastName.length > 255) setLastName(lastName.slice(0, 255));
    }, [firstName, lastName]);

    const [isExtern, setIsExtern] = useState(false);
    const [birthDate, setBirthDate] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [addressObj, setAddressObj] = useState<Address>({
        id: 0,
        street_name: '',
        house_number: '',
        city: '',
        postcode: '',
        extension: ''
    });

    const [streetName, setStreetName] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [city, setCity] = useState('');
    const [postcode, setPostcode] = useState('');
    const [extension, setExtension] = useState('');

    useEffect(() => {
        setAddressObj({
            id: 0,
            street_name: streetName,
            house_number: houseNumber,
            city: city,
            postcode: postcode,
            extension: extension
        });
    }, [streetName, houseNumber, city, postcode, extension]);

    const [roomId, setRoomId] = useState('');
    const [extraObj, setExtraObj] = useState({
        reason_for_intake: '',
        patient_type_id: 0,
        current_disease: '',
        last_treatment_date: '',
        next_treatment_date: ''
    });

    const [reasonForIntake, setReasonForIntake] = useState('');
    const [currentDisease, setCurrentDisease] = useState('');
    const [lastTreatmentDate, setLastTreatmentDate] = useState('');
    const [nextTreatmentDate, setNextTreatmentDate] = useState('');

    useEffect(() => {
        // Check if next treamtment date is after last treatment date
        if (new Date(nextTreatmentDate) < new Date(lastTreatmentDate)) {
            setNextTreatmentDate(lastTreatmentDate);
        }
    }, [lastTreatmentDate, nextTreatmentDate]);

    useEffect(() => {
        setExtraObj({
            reason_for_intake: reasonForIntake,
            patient_type_id: 0,
            current_disease: currentDisease,
            last_treatment_date: lastTreatmentDate,
            next_treatment_date: nextTreatmentDate,
        });
    }, [extraObj]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const patientObj = {
            patient: {
                firstname: firstName,
                lastname: lastName,
                is_dead: false,
                is_extern: isExtern,
                birth_date: birthDate,
                doctor_id: doctorId,
                address_id: addressObj,
                room_id: roomId,
            },
            address: addressObj,
            extra: extraObj
        }

        axios.post('/patients', patientObj)
            .then(res => {
                console.log(res.data);
                if ('message' in res.data) {
                    document.location.href = '/patients';
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    function handleWaitingListPatient(e: React.ChangeEvent<HTMLSelectElement>) {    
        const patientFirstName = waitinglist.find(waiting => waiting.id === parseInt(e.target.value))?.name.split(' ')[0];
        const patientLastName = waitinglist.find(waiting => waiting.id === parseInt(e.target.value))?.name.split(' ')[1];

        if (!patientFirstName || !patientLastName) {
            console.error('Patient not found');
            return;
        }

        setFirstName(patientFirstName!);
        setLastName(patientLastName!);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Patient creëren</h2>}
        >
            <div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-2 mx-5 mt-5 '>
                    <div className="flex flex-col gap-1 px-3 py-2 bg-white rounded-md shadow-md ">
                        <label htmlFor="lastName">
                            Patient from waitinglist
                        </label>
                        <select id="waitinglist" onChange={handleWaitingListPatient} className="px-3 py-2 border-gray-200 rounded-md shadow-md">
                            {waitinglist.map(waiting => <option key={waiting.id} value={waiting.id}>{waiting.name}</option>)}
                        </select>
                    </div>

                    {/* Checkbox for is Extern */}
                    <div className="flex justify-between gap-1 px-3 py-2 bg-white rounded-md shadow-md ">
                        <label htmlFor="isExtern">
                            Is Extern
                        </label>
                        <input type="checkbox" id="isExtern" checked={isExtern} onChange={(e) => setIsExtern(e.target.checked)} className="p-3 border-gray-200 rounded-md shadow-md" />
                    </div>
                    <div className="flex flex-col gap-1 px-3 py-2 bg-white rounded-md shadow-md ">
                        <label htmlFor="birthDate">
                            Birth Date
                        </label>
                        <input type="date" id="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="px-3 py-2 border-gray-200 rounded-md shadow-md" />
                    </div>
                    <div className="flex flex-col gap-1 px-3 py-2 bg-white rounded-md shadow-md ">
                        <label htmlFor="doctorId">
                            Doctor
                        </label>
                        <select id="doctorId" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} className="px-3 py-2 border-gray-200 rounded-md shadow-md">
                            {doctors.map(doctor => <option key={doctor.id} value={doctor.id}>{doctor.firstname} {doctor.lastname}</option>)}
                        </select>
                    </div>
                    <div className='flex flex-col gap-1 px-3 py-2 bg-white rounded-md shadow-md'>
                        <label htmlFor="roomId">
                            Room
                        </label>
                        <select id="roomId" value={roomId} onChange={(e) => setRoomId(e.target.value)} className="px-3 py-2 border-gray-200 rounded-md shadow-md">
                            {rooms.map(room => <option key={room.id} value={room.id}>{room.number}</option>)}
                        </select>
                    </div>
                    <p className='mt-5 mb-2 font-bold'>Extra info regel</p>
                    <div className="flex flex-col gap-1 px-3 py-2 bg-white rounded-md shadow-md ">
                        <label htmlFor="streetName">
                            Reden voor inname
                        </label>
                        <input type="text" id="streetName" value={reasonForIntake} onChange={(e) => setReasonForIntake(e.target.value)} className="px-3 py-2 border-gray-200 rounded-md shadow-md" />
                    </div>
                    <div className="flex flex-col gap-1 px-3 py-2 bg-white rounded-md shadow-md ">
                        <label htmlFor="currentDisease">
                            Huidige ziekte
                        </label>
                        <input type="text" id="currentDisease" value={currentDisease} onChange={(e) => setCurrentDisease(e.target.value)} className="px-3 py-2 border-gray-200 rounded-md shadow-md" />
                    </div>
                    <div className="flex flex-col gap-1 px-3 py-2 bg-white rounded-md shadow-md ">
                        <label htmlFor="lastTreatmentDate">
                            Laatste behandeling datum
                        </label>
                        <input type="date" id="lastTreatmentDate" value={lastTreatmentDate} onChange={(e) => setLastTreatmentDate(e.target.value)} className="px-3 py-2 border-gray-200 rounded-md shadow-md" />
                    </div>
                    <div className="flex flex-col gap-1 px-3 py-2 bg-white rounded-md shadow-md ">
                        <label htmlFor="nextTreatmentDate">
                            Volgende behandeling datum
                        </label>
                        <input type="date" id="nextTreatmentDate" value={nextTreatmentDate} onChange={(e) => setNextTreatmentDate(e.target.value)} className="px-3 py-2 border-gray-200 rounded-md shadow-md" />
                    </div>
                    <p className='mt-5 mb-2 font-bold'>Adres regel</p>
                    <div className="flex flex-col gap-1 px-3 py-2 bg-white rounded-md shadow-md ">
                        <label htmlFor="streetName">
                            Street Name
                        </label>
                        <input type="text" id="streetName" value={streetName} onChange={(e) => setStreetName(e.target.value)} className="px-3 py-2 border-gray-200 rounded-md shadow-md" />
                    </div>
                    <div className="flex flex-col gap-1 px-3 py-2 bg-white rounded-md shadow-md ">
                        <label htmlFor="houseNumber">
                            House Number
                        </label>
                        <input type="text" id="houseNumber" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} className="px-3 py-2 border-gray-200 rounded-md shadow-md" />
                    </div>
                    <div className="flex flex-col gap-1 px-3 py-2 bg-white rounded-md shadow-md ">
                        <label htmlFor="city">
                            City
                        </label>
                        <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} className="px-3 py-2 border-gray-200 rounded-md shadow-md" />
                    </div>
                    <div className="flex flex-col gap-1 px-3 py-2 bg-white rounded-md shadow-md ">
                        <label htmlFor="postcode">
                            Postcode
                        </label>
                        <input type="text" id="postcode" value={postcode} onChange={(e) => setPostcode(e.target.value)} className="px-3 py-2 border-gray-200 rounded-md shadow-md" />
                    </div>
                    <div className="flex flex-col gap-1 px-3 py-2 mb-3 bg-white rounded-md shadow-md ">
                        <label htmlFor="extension">
                            Extension
                        </label>
                        <input type="text" id="extension" value={extension} onChange={(e) => setExtension(e.target.value)} className="px-3 py-2 border-gray-200 rounded-md shadow-md" />
                    </div>
                    <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" type="submit">
                        Create
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}