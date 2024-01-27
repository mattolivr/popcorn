import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Divider from "../components/Divider";
import WelcomeLayout from "./layouts/WelcomeLayout";
import Stepper from "../components/Stepper";

export default function SignInView() {
    return (
        <WelcomeLayout>
            <Card title="Criar nova conta" className="w-full max-w-lg gap-2">
                <Fields/>
                <Button>Próxima etapa</Button>
                <Link to="/login" className="text-center font-semibold text-sky-700">
                    Já tem uma conta? Faça login
                </Link>
                <Stepper/>
                <Divider text="ou"></Divider>
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