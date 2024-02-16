import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CategoryItem({ name, _id: id }) {
  const categoryImages = {
    Bowls: "/bowls.webp",
    Hookas: "/hookah.webp",
    "E-cigarettes": "/e-cigs.webp",
    "E-liquids": "/liquids.webp",
    Tobaccos: "/tobacco.webp",
    Coals: "/coal.webp",
    Pipes: "/pipe.webp",
    Bongs: "/bongs.webp",
  };

  const imageSource = categoryImages[name] || "/no_picture.jpg";

  return (
    <Link href={`/products/${id}`} className="group ">
      <div className="overflow-hidden	">
        <Image src={imageSource} alt={name} width={500} height={500} 
        className="group-hover:scale-110	duration-300	ease-linear	"
        />
      </div>
      <h3 className="lg:text-center">{name}</h3>
    </Link>
  );
}
