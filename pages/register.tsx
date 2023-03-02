export default function Register() {
  return (
    <section className="register-sec">
      <h1> Registraion </h1>
      <form action="/api/register" method="post">
        <label>EMail Address</label>
        <input type="email" name="email" placeholder="Type your email"></input>
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
