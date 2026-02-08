import Image from "next/image";

type Props = {
  name: string;
  //role: string;
  image: string;
  bio: string;
};

export default function BandMemberCard({ name, image, bio }: Props) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <h3 className="text-xl font-semibold">{name}</h3>
      {/*<p className="text-sm opacity-70">{role}</p>*/}

      <p className="mt-3 text-base leading-relaxed text-slate-700">
        {bio}
      </p>
    </div>
  );
}
