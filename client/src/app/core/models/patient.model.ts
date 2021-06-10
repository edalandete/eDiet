import { Appointment } from "./appointment.model";
import { Diet } from "./diet.model";

export interface Patient {
    _id: string,
    firstName: string,
    lastName: string,
    fullName: string,
    email: string,
    phone: number,
    birthdate: string,
    idCard: string,
    bmi: string,
    picture: string,
    height: string,
    weight: string[],
    perimeter: {
        biceps: string,
        shoulders: string,
        wist: string,
        back: string,
        quadriceps: string,
    },
    goal: string,
    lastVisit: Date,
    diet: Diet,
    appointment: Appointment,
    isActive: boolean,
}
