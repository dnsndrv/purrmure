import Link from "next/link";
import { Star, Flame } from "@/components/decorations/star";
import { Button } from "@/components/ui/button";

export function AboutBlock() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-12 md:py-20">
      <div className="relative bg-ink text-white overflow-hidden">
        <Star
          variant="burst"
          className="absolute top-8 right-8 md:right-12 h-16 w-16 md:h-24 md:w-24 text-accent"
        />
        <Star
          variant="burst"
          className="absolute -bottom-12 -right-12 h-48 w-48 text-white/[0.06]"
        />
        <Flame className="absolute bottom-6 left-4 md:left-10 h-20 w-14 opacity-80 hidden sm:block" color="#cf5fa3" />
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 p-6 md:p-14 relative">
          <div>
            <div className="text-eyebrow text-white/55 mb-5">О бренде</div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold leading-[0.92] tracking-tight">
              Привет! <br />Я Алиса. <br />
              <span className="text-accent">Это наш</span>
              <br />
              мини-бренд.
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-5 text-white/80 text-[15px] md:text-base leading-relaxed">
            <p>
              PURRMURE — это семейная мастерская: мы с мамой шьём сумки и
              аксессуары вручную. Начинали с кастомных мешочков для других
              брендов, а теперь делаем свои основы, авоськи, мешки, ремни и
              кошельки.
            </p>
            <p>
              Маленькими тиражами, с любовью к деталям и звёздам. Если
              откликается — давай знакомиться.
            </p>
            <div>
              <Link href="/about">
                <Button variant="primary" size="lg">
                  Узнать больше
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
