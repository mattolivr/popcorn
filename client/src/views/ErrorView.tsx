import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import DialogLayout from "./layouts/DialogLayout";

export default function ErrorView(): React.ReactNode {
  const navigate = useNavigate();

  return (
    <DialogLayout title="Conteúdo não encontrado">
      <div className="flex flex-col gap-1">
        <p className="mb-4">
          O conteúdo que tentou acessar não existe ou não está mais disponível
        </p>
        <img
          src="/src/assets/storyset/error_404.svg"
          className="max-h-[28rem]"
        />
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
      </div>
    </DialogLayout>
  );
}
