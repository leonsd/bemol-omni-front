import { toast } from "react-toastify";
import { accountSchema } from "./validation";
import { addAccount } from "../../../../api/bemol-omni";

export const onSubmit = async (accountData: any, helpers: any) => {
  try {
    console.info({ accountData });
    const isValid = await accountSchema.isValid(accountData);
    if (!isValid) {
      toast.error("Campos obrigatórios não preenchidos!");
      return;
    }

    await addAccount(accountData);
    helpers.resetForm();

    toast.success("Conta cadastrada com sucesso!");
    return;
  } catch (error: any) {
    if (error?.response?.status === 400) {
      toast.warning("Campos obrigatórios não preenchidos!");
      return;
    }

    if (error?.response?.status === 409) {
      toast.warning("Email já cadastrado, gostaria de entrar?");
      return;
    }

    toast.warning("Erro no servidor");
  }
};
