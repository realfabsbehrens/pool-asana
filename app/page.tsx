import Nav from "@/components/Nav";
import Tickets from "@/components/tickets";
import DeleteButton from "@/components/deleteButton";

export default async function Home() {
  return (
    <main className=" p-24 ">
      <Nav />

      <section className="py-24 flex flex-col  justify-center  justify-items-center gap-8">
        <Tickets />
        <DeleteButton></DeleteButton>
      </section>
    </main>
  );
}
