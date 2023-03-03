export default function Register() {
    return (
        <section className="register-sec">
            <form action="/api/register" method="post">
                <h1> Registraion </h1>
                <label>EMail Address</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Type your email"
                ></input>
                <label>Pasword</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Type your password"
                ></input>
                <input type="submit" value="Register"></input>
            </form>
        </section>
    );
}
