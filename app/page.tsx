import Nav from "@/components/Nav";
import Tickets from "@/components/tickets";

export default async function Home() {
  return (
    <main className=" p-24  bg-slate-200">
      <Nav />

      <section className="py-24 flex flex-col  justify-center  justify-items-center gap-8">
        <Tickets />
      </section>
    </main>
  );
}
