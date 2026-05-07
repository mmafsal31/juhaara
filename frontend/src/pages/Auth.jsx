import Button from "../components/Button.jsx";

export default function Auth() {
  return (
    <section className="mx-auto grid min-h-[70vh] max-w-5xl place-items-center px-4 py-10">
      <div className="glass w-full max-w-md rounded-[32px] p-7 shadow-luxury">
        <h1 className="font-serif text-4xl">Welcome to Juhaara</h1>
        <p className="mt-2 text-ink/60">Login, signup, OTP verification, and password reset flow.</p>
        <form className="mt-6 grid gap-4">
          <input className="rounded-2xl border border-mist px-4 py-3" placeholder="Email address" />
          <input className="rounded-2xl border border-mist px-4 py-3" placeholder="Password" type="password" />
          <Button>Continue</Button>
        </form>
      </div>
    </section>
  );
}

