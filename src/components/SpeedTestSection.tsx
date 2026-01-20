const SpeedTestSection = () => {
  return (
    <section id="speed-test" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Teste sua Velocidade
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Verifique a velocidade da sua conexão de internet em tempo real
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="bg-card rounded-2xl shadow-lg p-4 overflow-hidden">
            <iframe
              id="speedometer_mc"
              width="720"
              height="510"
              frameBorder="0"
              src="https://www.minhaconexao.com.br/widgets/speedometer?provider=zux-internet"
              title="Teste de Velocidade ZUX Internet"
              className="max-w-full"
              style={{ maxWidth: '100%' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeedTestSection;
