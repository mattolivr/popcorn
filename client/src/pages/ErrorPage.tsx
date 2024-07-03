import { Alert } from "flowbite-react";
import { FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import DialogLayout from "./layouts/DialogLayout";

export default function ErrorPage(): React.ReactNode {
  const navigate = useNavigate();

  return (
    <DialogLayout title="Conteúdo não encontrado">
      <Alert color="failure" icon={FaExclamationCircle}>
        <span className="font-medium">
          O conteúdo que tentou acessar não existe ou não está mais disponível
        </span>
      </Alert>
      <img src="/src/assets/storyset/error_404.svg" className="max-h-[28rem]" />
      <Button to="/" color="transparent">
        Ir para a Página Inicial
      </Button>
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        Retornar
      </Button>
    </DialogLayout>
  );
}
