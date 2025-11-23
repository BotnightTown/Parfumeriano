import Image from "next/image"

export default function NewsBanner(){
  return(
    <article className="w-full h-50 md:h-[300px] lg:h-[450px] flex flex-col justify-center">
      <div className="w-full h-[170px] md:h-[260px] lg:h-100">
        <Image 
          src="/images/carousel/Tom Ford Lost Cherry.jpg"
          alt="Tom Ford Lost Cherry"
          width={700}
          height={500}
          className="object-cover w-full h-full"
        />
      </div>
      <p className="w-full h-max p-2.5 lg:p-5 text-sm">До кінця акції залишилося: 8 днів 11:39:40</p>
    </article>
  )
}