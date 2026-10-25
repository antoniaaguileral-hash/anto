// Adaptación del sketch original de Antonia a una capa transparente.
// Se conserva el dibujo de mariposa, el movimiento Perlin noise y el aleteo.
// p5.js se ejecuta en modo instancia para no interferir con otros sketches.
const mariposaFlotante = (p) => {
  let x, y;
  let tx = 0, ty = 1000;
  let angulo = 0;

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent("mariposa-flotante");
    p.pixelDensity(1);
    x = p.width / 2;
    y = p.height / 2;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      p.noLoop();
    }
  };

  p.draw = () => {
    p.clear(); // Importante: fondo transparente, NO background(255).

    tx += 0.005;
    ty += 0.005;
    const margen = Math.min(45, p.width / 5, p.height / 5);
    const xObjetivo = p.map(p.noise(tx), 0, 1, margen, p.width - margen);
    const yObjetivo = p.map(p.noise(ty), 0, 1, margen, p.height - margen);
    const prevX = x, prevY = y;
    x = p.lerp(x, xObjetivo, 0.02);
    y = p.lerp(y, yObjetivo, 0.02);

    const dx = x - prevX, dy = y - prevY;
    if (p.dist(0, 0, dx, dy) > 0.05) {
      const anguloDestino = p.atan2(dy, dx);
      // Giro progresivo por el camino angular más corto.
      const diferencia = p.atan2(p.sin(anguloDestino - angulo), p.cos(anguloDestino - angulo));
      angulo += diferencia * 0.08;
    }

    const movimientoAlas = p.sin(p.frameCount * 0.25) * 0.5;
    p.push();
    p.translate(x, y);
    p.rotate(angulo);
    p.scale(0.10); // Tamaño en pantalla. Original: 0.05 (más pequeño).

    p.push();
    p.rotate(-movimientoAlas);
    p.fill(180, 80, 220);
    p.noStroke();
    p.ellipse(-100, -70, 180, 230);
    p.ellipse(-110, 80, 150, 190);
    p.fill(240, 180, 250);
    p.ellipse(-120, -80, 60, 80);
    p.ellipse(-120, 70, 50, 60);
    p.pop();

    p.push();
    p.rotate(movimientoAlas);
    p.fill(180, 80, 220);
    p.noStroke();
    p.ellipse(100, -70, 180, 230);
    p.ellipse(110, 80, 150, 190);
    p.fill(240, 180, 250);
    p.ellipse(120, -80, 60, 80);
    p.ellipse(120, 70, 50, 60);
    p.pop();

    p.fill(40);
    p.noStroke();
    p.ellipse(0, 30, 45, 190);
    p.ellipse(0, -80, 70, 70);
    p.noFill();
    p.stroke(40);
    p.strokeWeight(8);
    p.bezier(-10, -100, -50, -160, -70, -150, -80, -120);
    p.bezier(10, -100, 50, -160, 70, -150, 80, -120);
    p.pop();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    x = p.constrain(x, 0, p.width);
    y = p.constrain(y, 0, p.height);
  };
};
new p5(mariposaFlotante);
