import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star } from "@/components/decorations/star";
import { asset } from "@/lib/utils";

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 md:px-8 pt-6 md:pt-10">
      <div className="relative bg-[#1e1e1e] text-white overflow-hidden">
        {/* Background photo of the bag */}
        <div className="absolute inset-0">
          <Image
            src={asset("/hero-bag.png")}
            alt=""
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center opacity-90"
          />
          {/* Gradient overlay to keep text readable */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/85 via-[#0a0a0a]/55 to-[#0a0a0a]/15"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent"
          />
        </div>

        {/* Decorative stars */}
        <Star
          variant="burst"
          className="absolute top-8 right-8 md:top-12 md:right-16 h-16 w-16 md:h-24 md:w-24 text-accent z-10"
        />
        <Star
          variant="burst"
          className="absolute bottom-10 right-1/3 h-10 w-10 text-accent/70 rotate-12 hidden sm:block z-10"
        />

        {/* Headline */}
        <div className="relative px-6 md:px-14 pb-10 md:pb-20 pt-12 md:pt-20 z-10">
          <h1 className="text-white uppercase leading-[0.92] inline-block">
            <span
              className="font-display block text-[28px] sm:text-[40px] md:text-[52px] lg:text-[64px] text-left"
              style={{ fontWeight: 400, letterSpacing: "0" }}
            >
              Конструктор
            </span>
            <span className="font-display-serif block leading-[0.9] text-[54px] sm:text-[76px] md:text-[96px] lg:text-[120px] text-left -mt-1">
              сумок
            </span>
          </h1>
          <p className="mt-5 md:mt-8 max-w-md text-[15px] md:text-base text-white/85 leading-relaxed">
            Собери свою сумку из основы, мешка, ремня и декора. Шьём вручную,
            вдвоём с мамой, маленькими тиражами.
          </p>
          <div className="mt-6 md:mt-8 flex flex-wrap gap-3">
            <Link href="/constructor">
              <Button size="lg" variant="primary">
                Собрать сумку
              </Button>
            </Link>
            <Link href="/catalog?category=set">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-ink"
              >
                Готовые сборки
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
