import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000",
});

interface AddAccountWithAddressModel {
  username: string;
  gender: string;
  email: string;
  password: string;
  address: {
    zipCode: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}
export const addAccount = async (accountData: AddAccountWithAddressModel) => {
  const response = await client.post("/accounts", accountData);
  return response.data;
};
