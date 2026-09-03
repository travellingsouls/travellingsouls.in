import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container width="narrow">
        <p className="text-overline uppercase text-gold-400">404</p>
        <h1 className="mt-3 text-h1">This page has moved on</h1>
        <p className="mt-5 text-lead text-muted-foreground">
          The page you were looking for is not here. It may have been renamed,
          or the trip may no longer be running.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/tours" variant="outline">
            Browse trips
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
