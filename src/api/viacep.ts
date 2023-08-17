import axios from "axios";

const client = axios.create({
  baseURL: "https://viacep.com.br/ws",
});

interface IAddress {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
}

export const loadAddress = async (zipCode: string): Promise<IAddress> => {
  const response = await client.get(`/${zipCode}/json`);
  return response.data;
};
