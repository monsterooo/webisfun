"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/.content-collections/generated";
import { formatDate } from "@/lib/date";
import {
  ArrowRightIcon,
  ArrowRightIconHandle,
} from "@/components/animation-icons/arrow-right-icon";

interface ItemProps {
  blog: Blog;
}

export function WritingItem({ blog }: ItemProps) {
  const arrowRef = useRef<ArrowRightIconHandle>(null);

  const handleMouseEnter = () => {
    arrowRef.current?.startAnimation();
  };

  const handleMouseLeave = () => {
    arrowRef.current?.stopAnimation();
  };

  return (
    <Link
      href={"/writing/" + blog.slug}
      className="p-8 bg-write-card-background hover:bg-primary/10 rounded-lg transition-all duration-300 ease-in-out"
    >
      <div className="relative h-[200px]">
        <Image
          src={blog.image ?? ""}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>
      <data className="block text-primary text-sm mt-5 mb-3 font-medium">
        {formatDate({ date: new Date(blog.publishedAt) })}
      </data>
      <h2 className="font-plantin leading-[1.2] text-3xl mb-2 text-foreground">
        {blog.title}
      </h2>
      <p className="text-lg mb-4">{blog.summary}</p>
      <span
        className="text-primary text-sm inline-flex justify-start items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Read more
        <ArrowRightIcon ref={arrowRef} className="ml-2" size={18} />
      </span>
    </Link>
  );
}
