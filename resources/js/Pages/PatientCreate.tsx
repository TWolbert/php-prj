import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { useEffect, useState } from 'react';
import { DoctorType, PatientType, Address, RoomType } from './types';

export default function PatientCreate({ auth, doctors, rooms }: PageProps<{ doctors: DoctorType[], rooms: RoomType[] }>) {
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
    const [extraObj, setExtraObj] = useState({});

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
            id: 0,
            reason_for_intake: reasonForIntake,
            patient_type_id: 0,
            current_disease: currentDisease,
            last_treatment_date: lastTreatmentDate,
            next_treatment_date: nextTreatmentDate,
        });
    }, [extraObj]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Patient creëren</h2>}
        >
            <div>
                <form action="" className=' flex flex-col mx-5 gap-2'>
                    <div className=" flex flex-col gap-1 bg-white rounded-md shadow-md px-3 py-2 mt-5 ">
                        <label htmlFor="firstName">
                            First Name
                        </label>
                        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="px-3 py-2 shadow-md border-gray-200 rounded-md" />
                        <p>
                            {firstName.length} / 255
                        </p>
                    </div>
                    <div className=" flex flex-col gap-1 bg-white rounded-md shadow-md px-3 py-2">
                        <label htmlFor="lastName">
                            Last Name
                        </label>
                        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="px-3 py-2 shadow-md border-gray-200 rounded-md" />
                        <p>
                            {lastName.length} / 255
                        </p>
                    </div>
                    {/* Checkbox for is Extern */}
                    <div className=" flex justify-between gap-1 bg-white rounded-md shadow-md px-3 py-2">
                        <label htmlFor="isExtern">
                            Is Extern
                        </label>
                        <input type="checkbox" id="isExtern" checked={isExtern} onChange={(e) => setIsExtern(e.target.checked)} className="p-3 shadow-md border-gray-200 rounded-md" />
                    </div>
                    <div className=" flex flex-col gap-1 bg-white rounded-md shadow-md px-3 py-2">
                        <label htmlFor="birthDate">
                            Birth Date
                        </label>
                        <input type="date" id="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="px-3 py-2 shadow-md border-gray-200 rounded-md" />
                    </div>
                    <div className=" flex flex-col gap-1 bg-white rounded-md shadow-md px-3 py-2">
                        <label htmlFor="doctorId">
                            Doctor
                        </label>
                        <select id="doctorId" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} className="px-3 py-2 shadow-md border-gray-200 rounded-md">
                            {doctors.map(doctor => <option key={doctor.id} value={doctor.id}>{doctor.firstname} {doctor.lastname}</option>)}
                        </select>
                    </div>
                    <div className='flex flex-col gap-1 bg-white rounded-md shadow-md px-3 py-2'>
                        <label htmlFor="roomId">
                            Room
                        </label>
                        <select id="roomId" value={roomId} onChange={(e) => setRoomId(e.target.value)} className="px-3 py-2 shadow-md border-gray-200 rounded-md">
                            {rooms.map(room => <option key={room.id} value={room.id}>{room.number}</option>)}
                        </select>
                    </div>
                    <p className='font-bold mt-5 mb-2'>Extra info regel</p>
                    <div className=" flex flex-col gap-1 bg-white rounded-md shadow-md px-3 py-2">
                        <label htmlFor="streetName">
                            Reden voor inname
                        </label>
                        <input type="text" id="streetName" value={reasonForIntake} onChange={(e) => setReasonForIntake(e.target.value)} className="px-3 py-2 shadow-md border-gray-200 rounded-md" />
                    </div>
                    <div className=" flex flex-col gap-1 bg-white rounded-md shadow-md px-3 py-2">
                        <label htmlFor="currentDisease">
                            Huidige ziekte
                        </label>
                        <input type="text" id="currentDisease" value={currentDisease} onChange={(e) => setCurrentDisease(e.target.value)} className="px-3 py-2 shadow-md border-gray-200 rounded-md" />
                    </div>
                    <div className=" flex flex-col gap-1 bg-white rounded-md shadow-md px-3 py-2">
                        <label htmlFor="lastTreatmentDate">
                            Laatste behandeling datum
                        </label>
                        <input type="date" id="lastTreatmentDate" value={lastTreatmentDate} onChange={(e) => setLastTreatmentDate(e.target.value)} className="px-3 py-2 shadow-md border-gray-200 rounded-md" />
                    </div>
                    <div className=" flex flex-col gap-1 bg-white rounded-md shadow-md px-3 py-2">
                        <label htmlFor="nextTreatmentDate">
                            Volgende behandeling datum
                        </label>
                        <input type="date" id="nextTreatmentDate" value={nextTreatmentDate} onChange={(e) => setNextTreatmentDate(e.target.value)} className="px-3 py-2 shadow-md border-gray-200 rounded-md" />
                    </div>
                    <p className='font-bold mt-5 mb-2'>Adres regel</p>
                    <div className=" flex flex-col gap-1 bg-white rounded-md shadow-md px-3 py-2">
                        <label htmlFor="streetName">
                            Street Name
                        </label>
                        <input type="text" id="streetName" value={streetName} onChange={(e) => setStreetName(e.target.value)} className="px-3 py-2 shadow-md border-gray-200 rounded-md" />
                    </div>
                    <div className=" flex flex-col gap-1 bg-white rounded-md shadow-md px-3 py-2">
                        <label htmlFor="houseNumber">
                            House Number
                        </label>
                        <input type="text" id="houseNumber" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} className="px-3 py-2 shadow-md border-gray-200 rounded-md" />
                    </div>
                    <div className=" flex flex-col gap-1 bg-white rounded-md shadow-md px-3 py-2">
                        <label htmlFor="city">
                            City
                        </label>
                        <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} className="px-3 py-2 shadow-md border-gray-200 rounded-md" />
                    </div>
                    <div className=" flex flex-col gap-1 bg-white rounded-md shadow-md px-3 py-2">
                        <label htmlFor="postcode">
                            Postcode
                        </label>
                        <input type="text" id="postcode" value={postcode} onChange={(e) => setPostcode(e.target.value)} className="px-3 py-2 shadow-md border-gray-200 rounded-md" />
                    </div>
                    <div className=" flex flex-col gap-1 bg-white rounded-md shadow-md px-3 py-2 mb-3">
                        <label htmlFor="extension">
                            Extension
                        </label>
                        <input type="text" id="extension" value={extension} onChange={(e) => setExtension(e.target.value)} className="px-3 py-2 shadow-md border-gray-200 rounded-md" />
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}