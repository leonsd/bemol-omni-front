import * as yup from "yup";

export const accountSchema = yup.object().shape({
  username: yup.string().required("O campo é obrigatório"),
  gender: yup.string().required("O campo é obrigatório"),
  email: yup.string().required("O campo é obrigatório"),
  password: yup.string().required("O campo é obrigatório"),
  address: yup.object().shape({
    zipCode: yup.string().required("O campo é obrigatório"),
    street: yup.string().required("O campo é obrigatório"),
    number: yup.string().required("O campo é obrigatório"),
    complement: yup.string(),
    neighborhood: yup.string().required("O campo é obrigatório"),
    city: yup.string().required("O campo é obrigatório"),
    state: yup.string().required("O campo é obrigatório"),
  }),
});
