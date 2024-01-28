import Nav from "@/components/Nav";
import Table from "@/components/table";

export default async function Home() {
  return (
    <main className=" p-24 ">
      <Nav />

      <section className="py-24 flex flex-col  justify-center  justify-items-center gap-8">
        <Table />
      </section>
    </main>
  );
}
