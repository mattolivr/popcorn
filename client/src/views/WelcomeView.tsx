import Anchor from "../components/Anchor";
import Button from "../components/Button";
import Card from "../components/Card";
import DialogLayout from "./layouts/DialogLayout";

export default function WelcomeView() {
  return (
    <>
      <DialogLayout highlight={Highlight()}>
        <Card title="Venha fazer parte!" className="max-w-lg gap-2">
          <Button path="/sign-in">Cadastre-se</Button>
          <Anchor path="/login">Ja possui conta? Faça login</Anchor>
        </Card>
      </DialogLayout>
    </>
  );
}

function Highlight(): React.ReactNode {
  return (
    <div className="flex h-full w-3/5 flex-col justify-center gap-2 pl-8 text-gray-900">
      <h1 className="text-4xl font-semibold">Compartilhe os seus gostos!</h1>
      <p className="text-lg font-medium">
        Descubra, liste, avalie, comente, compartilhe, faça amigos e participe
        de clubes de seus filmes e séries favoritos! O Popcorn Club é um espaço
        de conexão e interação sobre seu entretenimento favorito.
      </p>
    </div>
  );
}
