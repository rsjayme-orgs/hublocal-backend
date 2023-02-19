class CreatedLocationDTO {
    id: number;

    name: string;

    zipcode: string;

    street: string;

    number: number;

    neighborhood: string;

    city: string;

    state: string;

    company: {
        id: number;
        user_id: number;
    };
}

export { CreatedLocationDTO };
