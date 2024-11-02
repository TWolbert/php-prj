export interface PatientType {
    id: number,
    firstname: string,
    lastname: string,
    is_dead: boolean,
    is_extern: boolean,
    birth_date: string,
    doctor_id: number,
    address_id: number,
    extra_id: number,
    room_id: number,
}

export interface DoctorType {
    id: number;
    firstname: string;
    lastname: string;
    place: string;
}

export interface Address {
    id: number;
    city: string;
    street_name: string;
    house_number: string;
    postcode: string;
    extension: string;
}

export interface RoomType {
    id: number;
    number: string;
    room_type_id: number;
    room_taken: boolean;
}

export interface IncidentenType {
    id: number;
    date: string;
    sort_injury: string;
    patient_id: number;
}

export interface AppointmentType {
    id: number;
    date: Date;
    time: string;
    patient_id: number;
    place: string;
}

export interface ArchiveType {
    //
}
