import Card from "../components/Card";
import Divider from "../components/Divider";
import WelcomeLayout from "./layouts/WelcomeLayout";
import { Link } from "react-router-dom";
import Button from "../components/Button";


export default function LoginView() {
    return (
        <WelcomeLayout>
            <Card title="Faça o Login" className="w-full max-w-lg gap-2">
                {/* <BaseInput type={InputType.TEXT} label="Nome de usuário" /> */}
                {/* <BaseInput type={InputType.PASSWORD} label="Senha" /> */}
                {/* TODO: Criar componente de link */}
                <a href="" className="text-end font-semibold text-blue-600">Esqueceu a senha?</a>
                <Divider text="ou"/>
                <Link to="/sign-in" className="text-center font-semibold bg-sky-500 text-white rounded-2xl px-1 py-2">
                    Crie uma nova conta
                </Link>
                <Button color="white">Entre usando sua conta Google</Button>
                <Button color="white">Entre usando sua conta Letterboxd</Button>
            </Card>
        </WelcomeLayout>
    )
}