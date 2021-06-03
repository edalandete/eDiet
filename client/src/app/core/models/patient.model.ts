export interface Patient {
    firstName: string,
    lastName: string,
    email: string,
    birthdate: Date,
    idCard: string,
    bmi: string,
    picture: string,
    height: string,
    weight: [string],
    perimeter: {
        biceps: string,
        shoulders: string,
        wist: string,
        back: string,
        quadriceps: string,
    },
    goal: string,
    lastVisit: Date,
    diet: {
        _id: string, 
        type: string,
        breakfast: string,
        midday: string,
        lunch: string,
        snack: string,
        dinner: string,
    },
    appointment: { 
        _id: string; 
        dieticianId: string;
        patient: {
            _id: string,
            firstName: string,
            lastName: string
        };
        date: string;
        time: string;
     },
    isActive: boolean,
}