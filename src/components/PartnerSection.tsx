import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function PartnerSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">
          Parceria Oficial
        </h2>
        <Card className="max-w-3xl mx-auto border-2 border-secondary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-secondary">Drops Games</CardTitle>
            <CardDescription className="text-lg text-foreground/80">
              Parceiro Oficial em Entretenimento e Gaming
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-secondary">
              <img
                src="/placeholder.svg"
                alt="Drops Games"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center text-foreground/90 max-w-xl">
              A Drops Games é nossa parceira oficial, trazendo inovação e qualidade 
              no desenvolvimento de experiências arcade únicas. Juntos, criamos os 
              melhores fliperamas do mercado.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
