import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBRadio,
} from "mdb-react-ui-kit";
import { useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import { loadAddress } from "../../../api/viacep";
import { addAccount } from "../../../api/bemol-omni";
import { ToastContainer, toast } from "react-toastify";

export default function AccountRegister() {
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const accountSchema = yup.object().shape({
    username: yup.string().required(),
    gender: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    address: yup.object().shape({
      zipCode: yup.string().required(),
      street: yup.string().required(),
      number: yup.string().required(),
      complement: yup.string(),
      neighborhood: yup.string().required(),
      city: yup.string().required(),
      state: yup.string().required(),
    }),
  });

  useEffect(() => {
    const searchAddress = async () => {
      const zipCodeLengthNumbersOnly = 8;
      const zipCodeOnlyNumber = zipCode.replace(/\n/, "");
      if (zipCodeOnlyNumber.length === zipCodeLengthNumbersOnly) {
        try {
          const address = await loadAddress(zipCodeOnlyNumber);

          setStreet(address.logradouro);
          setNeighborhood(address.bairro);
          setComplement(address.complemento);
          setCity(address.localidade);
          setState(address.uf);
        } catch (error) {}
      }
    };

    searchAddress();
  }, [zipCode]);

  const setInitialState = useCallback(() => {
    setUsername("");
    setGender("");
    setEmail("");
    setPassword("");
    setZipCode("");
    setStreet("");
    setNumber("");
    setComplement("");
    setNeighborhood("");
    setCity("");
    setState("");
  }, []);

  const prepareAccountData = () => {
    const accountData = {
      username,
      gender,
      email,
      password,
      address: {
        zipCode,
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
      },
    };
    return accountData;
  };

  const formSubmit = async () => {
    try {
      const accountData = prepareAccountData();
      const isValid = await accountSchema.isValid(accountData);
      if (!isValid) {
        toast.error("Campos obrigatórios não preenchidos!");
        return;
      }

      await addAccount(accountData);

      setInitialState();
      toast.success("Conta cadastrada com sucesso!");
      return;
    } catch (error: any) {
      console.error(error);

      if (error?.response?.status === 400) {
        toast.warning("Email já cadastrado, gostaria de entrar?");
        return;
      }

      toast.warning("Email já cadastrado, gostaria de entrar?");
    }
  };

  return (
    <MDBContainer>
      <div
        className="p-5 bg-image"
        style={{
          backgroundImage:
            "url(https://mdbootstrap.com/img/new/textures/full/171.jpg)",
          height: "300px",
        }}
      ></div>
      <MDBCard
        className="mx-5 mb-5 p-5 shadow-5"
        style={{
          marginTop: "-100px",
          background: "hsla(0, 0%, 100%, 0.8)",
          backdropFilter: "blur(30px)",
        }}
      >
        <MDBCardBody className="p-5 text-center">
          <h2 className="fw-bold mb-5">Cadastre sua conta</h2>

          <MDBRow>
            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="Nome completo"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                type="text"
              />
            </MDBCol>

            <MDBCol col="6">
              <label className="gender-label">Gênero: </label>
              <MDBRadio
                name="gender"
                id="male"
                value="male"
                checked={gender === "male"}
                onChange={(event) => setGender(event.target.value)}
                label="Masculino"
                inline
              />
              <MDBRadio
                name="gender"
                id="female"
                value="female"
                checked={gender === "female"}
                onChange={(event) => setGender(event.target.value)}
                label="Feminino"
                inline
              />
            </MDBCol>
          </MDBRow>

          <MDBInput
            wrapperClass="mb-4"
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />

          <MDBRow>
            <MDBCol col="6">
              <MDBInput
                wrapperClass="mb-4"
                label="Cep"
                value={zipCode}
                onChange={(event) => setZipCode(event.target.value)}
                type="text"
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol col="8">
              <MDBInput
                wrapperClass="mb-4"
                label="Rua"
                value={street}
                onChange={(event) => setStreet(event.target.value)}
                type="text"
              />
            </MDBCol>
            <MDBCol col="4">
              <MDBInput
                wrapperClass="mb-4"
                label="Número"
                value={number}
                onChange={(event) => setNumber(event.target.value)}
                type="text"
              />
            </MDBCol>
          </MDBRow>
          <MDBInput
            wrapperClass="mb-4"
            label="Complemento"
            value={complement}
            onChange={(event) => setComplement(event.target.value)}
            type="text"
          />
          <MDBRow>
            <MDBCol col="4">
              <MDBInput
                wrapperClass="mb-4"
                label="Bairro"
                value={neighborhood}
                onChange={(event) => setNeighborhood(event.target.value)}
                type="text"
              />
            </MDBCol>
            <MDBCol col="4">
              <MDBInput
                wrapperClass="mb-4"
                label="Cidade"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                type="text"
              />
            </MDBCol>
            <MDBCol col="4">
              <MDBInput
                wrapperClass="mb-4"
                label="Estado"
                value={state}
                onChange={(event) => setState(event.target.value)}
                type="text"
              />
            </MDBCol>
          </MDBRow>

          <MDBBtn className="w-100 mb-4" onClick={formSubmit}>
            Cadastrar
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
      <ToastContainer />
    </MDBContainer>
  );
}
