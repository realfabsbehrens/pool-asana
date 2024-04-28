import Nav from "@/components/Nav";
import Tickets from "@/components/tickets";

export default async function Home() {
  return (
    <main className=" p-24  bg-pattern dark:bg-pattern-dark bg-50%">
      <Nav />

      <section className="py-24 flex flex-col min-h-svh	  justify-start  justify-items-start gap-8">
        <Tickets />
      </section>
    </main>
  );
}
