import Button from "../components/Button";
import Card from "../components/Card";
import WelcomeLayout from "./layouts/WelcomeLayout";

const ErrorView = () => {
  return (
    <WelcomeLayout>
      <Card title="Não encontrado">
        <p className="mb-4">
          Parece que você tentou acessar um recurso que não existe ou não está
          mais disponível
        </p>
        <Button path="/">Retornar à Página Inicial</Button>
      </Card>
    </WelcomeLayout>
  );
};

export default ErrorView;
