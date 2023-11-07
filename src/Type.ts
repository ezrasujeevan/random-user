export type User = {
    name: Name
    email: string;
    phone: string;
    picture: {
        large: string;
    };
    location: Location;
}

export type Name = {
    title: string;
    first: string;
    last: string;
}

export type Location = {
    city: string;
    state: string;
    country: string;
}



export type Target = Location | Name
