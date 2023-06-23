import {FormEvent} from "react";
import {Auth} from "../../lib/auth";

export const RegisterPage = () => {

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const target = event.currentTarget;

        const email = target.querySelector<HTMLInputElement>(`input[name="email"]`)?.value || ""
        const password = target.querySelector<HTMLInputElement>(`input[name="password"]`)?.value || ""

        Auth.doRegister(email, password)
    }

    return <form onSubmit={handleSubmit}>
        <input name={"email"} type="email"/>
        <input name="password" type={"password"}/>
        <input type={"submit"} value={"Login"}/>
    </form>
}