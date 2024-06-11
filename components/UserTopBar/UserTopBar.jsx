import AuthButton from "../auth-button/AuthButton";

export default function UserTopBar() {
  return (
    <section className={`flex justify-between items-center w-full`}>
      <div className={`flex-col justify-center bg items-center w-full`}>
        <h3>Good morning.</h3>
        <p className="text-slate-500">What can we do for you?</p>
      </div>
      <div className="p-0.5">
        <AuthButton />
      </div>
    </section>
  );
}
