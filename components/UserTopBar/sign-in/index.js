import AuthButton from "@/components/auth-button/AuthButton";

export default function SignIn() {
    return (
        <div>
            <h1>Please sign in to enjoy our app.</h1>
            <p>You are not signed in.</p>
            <AuthButton />
        </div>
    );
}