import Nav from "@/components/Nav"
import Table from "@/components/table"
export default function Home() {
  return (
    <main className="p-24 ">
 <Nav />
   
<section className="py-24 flex flex-col items-center gap-8"> 

<div className="left">
<h1 className="text-4xl left-0 font-bold mb-2">poool x asana</h1>
<p className="text-1xl left text-muted-foreground">
 auf dieser seite stesten wir eine beidseitige verbindung von poool und asana. 
 </p>
</div>
<Table />
</section>
 </main>
  );
}
