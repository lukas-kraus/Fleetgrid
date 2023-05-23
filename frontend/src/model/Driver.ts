export type Driver = {
    id: string,
    firstname: string,
    lastname: string,
    birthday: string,
    address: Address
}

export type NewDriver = {
    firstname: string,
    lastname: string,
    birthday: string,
    address: Address
}

export type Address = {
    street: string;
    city: string;
    postalCode: string;
    country: string;
}