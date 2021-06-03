export interface Appointment {
    _id: string; 
    dieticianId: string;
    patient: {
        _id: string,
        firstName: string,
        lastName: string
    };
    date: string;
    time: string;
}