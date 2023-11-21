import { Button, Label, TextInput } from "flowbite-react";
import { Form } from "react-router-dom";

export function Login() {
    return (
        <>
            <Form action="/login" method="POST">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput id="email" name="email" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Password" />
                    </div>
                    <TextInput id="password" name="password" required />
                </div>
                <div>
                    <Button type="submit" pill color="yellow">Login</Button>
                </div>
            </Form>
        </>
    )
}