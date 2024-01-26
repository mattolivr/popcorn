import Button from "../components/Button";
import Card from "../components/Card";
import Divider from "../components/Divider";
import WelcomeLayout from "./layouts/WelcomeLayout";

export default function SignInView() {
    return (
        <WelcomeLayout>
            <Card title="Criar nova conta" className="w-full gap-2">
                <Fields/>
                <Button>Próxima etapa</Button>
                <Divider text="ou"></Divider>
                <Button secundary link="/login">Faça login</Button>
                <Button color="white">Entre usando sua conta Google</Button>
                <Button color="white">Entre usando sua conta Letterboxd</Button>
            </Card>
        </WelcomeLayout>
    )
}

function Fields() {
    return (
        <div className=""></div>
    )
}