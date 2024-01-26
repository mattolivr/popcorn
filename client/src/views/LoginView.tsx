import { Button } from "@material-tailwind/react";
import Card from "../components/Card";
import BaseInput, { InputType } from "../components/Input";


export default function LoginView() {
    return (
        <div className="flex">
            <div id="highlights" className="w-4/5 bg-light-blue-600 min-h-screen" />
            <main className="w-2/5 bg-blue-gray-50 min-h-screen flex justify-center items-center px-8">
                <Card title="Faça o Login" className="w-full gap-2">
                    <BaseInput type={InputType.TEXT} label="Nome de usuário" />
                    <BaseInput type={InputType.PASSWORD} label="Senha" />
                    <a href="" className="text-end font-semibold text-blue-600">Esqueceu a senha?</a>
                    <div className="w-full relative inline-flex items-center justify-center">
                        <hr className="w-full h-0.5 my-2 bg-gray-200 dark:bg-gray-700" />
                        <span className="absolute px-3 font-medium text-gray-600 -translate-x-1/2 bg-white left-1/2
                            dark:text-white dark:bg-gray-900">ou</span>
                    </div>
                    <Button placeholder={"teste"} color="white" className="shadow-none">Entre usando sua conta Google</Button>
                    <Button placeholder={"teste"} color="white" className="shadow-none">Entre usando sua conta Letterboxd</Button>
                </Card>
            </main>
        </div>
    )
}