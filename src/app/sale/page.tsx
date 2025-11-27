import List from "@/components/List/List"

export default function SalePage(){
  return(
    <main className="w-full min-h-full h-max px-0 md:px-10 lg:px-20 flex flex-col md:gap-10">
      <List title={"Moschino"} brand="Moschino" onlySale={true}/>
      <List title={"Chanel"} brand="Chanel" onlySale={true}/>
      <List title={"Gucci"} brand="Gucci" onlySale={true}/>
    </main>
  )
}