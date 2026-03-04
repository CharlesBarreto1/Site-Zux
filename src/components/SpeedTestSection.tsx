const SpeedTestSection = () => {
  return (
    <section id="speed-test" className="section-premium relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0"><div className="glow-line" /></div>

      <div className="container-premium">
        <div className="text-center mb-12 space-y-4">
          <span className="text-sm font-medium text-primary uppercase tracking-widest">Velocidade</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Teste sua <span className="text-gradient">Velocidade</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Verifique a velocidade da sua conexão de internet em tempo real.
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="card-premium overflow-hidden">
            <iframe
              id="speedometer_mc"
              width="720"
              height="510"
              frameBorder="0"
              src="https://www.minhaconexao.com.br/widgets/speedometer?provider=zux-internet"
              title="Teste de Velocidade ZUX Internet"
              className="max-w-full rounded-xl"
              style={{ maxWidth: '100%' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeedTestSection;
