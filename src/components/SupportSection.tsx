import qrcodeSuporte from "@/assets/qrcode-suporte.png";
import { Smartphone } from "lucide-react";

export const SupportSection = () => {
  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            <span className="text-secondary text-glow-cyan">Suporte</span> Técnico
          </h2>
          <p className="text-muted-foreground text-lg">
            Precisa de ajuda com seu fliperama? Acesse nosso suporte pelo celular
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Smartphone className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Como acessar:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Abra a câmera do seu celular</li>
                    <li>Aponte para o QR Code ao lado</li>
                    <li>Toque na notificação que aparecer</li>
                    <li>Você será direcionado para nossa página de suporte</li>
                  </ol>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-foreground">
                  <strong className="text-secondary">Dica:</strong> Salve o link nos favoritos do seu celular para acesso rápido!
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-card border-2 border-secondary/20 rounded-2xl p-6 shadow-elegant">
              <img 
                src={qrcodeSuporte} 
                alt="QR Code para suporte técnico do fliperama"
                className="w-64 h-64 object-contain"
              />
              <p className="text-center text-sm text-muted-foreground mt-4">
                Escaneie para acessar o suporte
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
