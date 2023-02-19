class CreatedCompanyDTO {
    id: number;

    name: string;

    website: string;

    cnpj: string;

    user?: {
        id: number;
    };
}

export { CreatedCompanyDTO };
