import { Star } from "@/components/decorations/star";
import { Mail, Send } from "lucide-react";

export const metadata = { title: "Контакты — PURRMURE" };

const contacts = [
  {
    icon: Send,
    label: "Telegram",
    value: "@purrmure",
    href: "https://t.me/purrmure",
    description: "Можно писать напрямую — отвечу я (Алиса)",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@purrmure.test",
    href: "mailto:hello@purrmure.test",
    description: "Для коллабораций и оптовых заказов",
  },
];

export default function ContactsPage() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-8 md:py-16">
      <div className="relative bg-surface px-6 py-10 md:p-14 mb-8 md:mb-12 overflow-hidden">
        <Star
          variant="burst"
          className="absolute top-6 right-6 md:right-12 h-14 w-14 md:h-16 md:w-16 text-accent"
        />
        <Star
          variant="burst"
          className="absolute -bottom-4 -left-4 h-28 w-28 text-ink/[0.06]"
        />
        <div className="text-eyebrow text-muted-foreground mb-3">Контакты</div>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-ink leading-[0.95] tracking-tight">
          Напиши нам.
        </h1>
        <p className="mt-5 text-foreground/80 max-w-xl text-[15px] md:text-base leading-relaxed">
          Можно следить, как мы с мамой делаем сумки, задать вопрос или
          предложить идею. Отвечаю обычно я — Алиса.
        </p>
      </div>

      <div className="grid gap-3 md:gap-4 sm:grid-cols-2 mb-8 md:mb-12">
        {contacts.map((c) => {
          const Icon = c.icon;
          const inner = (
            <div className="flex items-start gap-4 bg-surface p-5 md:p-6 h-full hover:bg-muted/30 transition-colors">
              <div className="h-11 w-11 inline-flex items-center justify-center bg-ink text-white flex-shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-1">
                  {c.label}
                </div>
                <div className="text-lg md:text-xl text-ink font-medium leading-tight">
                  {c.value}
                </div>
                {c.description && (
                  <div className="text-[13px] md:text-sm text-foreground/70 mt-1 leading-relaxed">
                    {c.description}
                  </div>
                )}
              </div>
            </div>
          );
          if (c.href) {
            return (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                aria-label={`${c.label}: ${c.value}`}
              >
                {inner}
              </a>
            );
          }
          return <div key={c.label}>{inner}</div>;
        })}
      </div>

      <div className="bg-ink text-white px-6 py-10 md:p-12 relative overflow-hidden">
        <Star
          variant="burst"
          className="absolute -top-4 right-6 md:right-10 h-16 w-16 md:h-20 md:w-20 text-accent/40"
        />
        <div className="text-eyebrow text-white/55 mb-3">P.S.</div>
        <p className="text-white/85 text-[15px] md:text-lg max-w-2xl leading-relaxed">
          Если интересно понаблюдать, как я пытаюсь сделать нас с мамой
          богатыми и успешными леди — лучше всего написать в Telegram.
        </p>
      </div>
    </div>
  );
}
