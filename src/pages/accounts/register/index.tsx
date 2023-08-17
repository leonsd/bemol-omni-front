import { MDBBtn, MDBContainer, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { useEffect } from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { onSubmit } from "./utils/add-account";
import { accountSchema } from "./utils/validation";
import AccountForm from "../../../components/accounts/register/account-form";
import AddressForm from "../../../components/accounts/register/address-form";
import { loadAddress } from "../../../api/viacep";

export default function AccountRegister() {
  const formik = useFormik({
    initialValues: {
      username: "",
      gender: "",
      email: "",
      password: "",
      address: {
        zipCode: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
      },
    },
    validationSchema: accountSchema,
    onSubmit,
  });

  useEffect(() => {
    const searchAddress = async () => {
      const zipCodeLengthNumbersOnly = 8;
      const { zipCode } = formik.values.address;
      const zipCodeOnlyNumber = zipCode.replace(/\D/g, "");

      if (zipCodeOnlyNumber.length === zipCodeLengthNumbersOnly) {
        try {
          const address = await loadAddress(zipCodeOnlyNumber);

          await formik.setFieldValue("address.street", address.logradouro);
          await formik.setFieldValue("address.neighborhood", address.bairro);
          await formik.setFieldValue("address.complement", address.complemento);
          await formik.setFieldValue("address.city", address.localidade);
          await formik.setFieldValue("address.state", address.uf);
        } catch (error) {
          toast.error("Erro ao buscar endereço");
        }
      }
    };

    searchAddress();
  }, [formik.values.address.zipCode]);

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
        <form onSubmit={formik.handleSubmit}>
          <MDBCardBody className="p-5 text-center">
            <h2 className="fw-bold mb-5">Cadastre sua conta</h2>

            <AccountForm formik={formik} />
            <AddressForm formik={formik} />

            <MDBBtn className="w-100 mb-4" type="submit">
              Cadastrar
            </MDBBtn>
          </MDBCardBody>
        </form>
      </MDBCard>
      <ToastContainer />
    </MDBContainer>
  );
}
