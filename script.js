async function findFaces() {
  const model = await blazeface.load();
  const img = document.querySelector("img");
  const predictions = await model.estimateFaces(img, false);
  const safeDistance = 300; //1.5 metros
  let noise;

  if (predictions.length > 0) {

    document.getElementById("status").innerText = predictions.length == 1 ? "Rosto Encontrado" : "Rostos Encontrados!";
    const canvas = document.getElementById("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(128, 166, 206, 0.5)";

    for (let i = 0; i < predictions.length; i++) {
      const start = predictions[i].topLeft;
      const end = predictions[i].bottomRight;
      const size = [end[0] - start[0], end[1] - start[1]];

      ctx.fillRect(start[0], start[1], size[0], size[1]);

      noise = predictions[i].landmarks[2];

      for (let j = i + 1; j < predictions.length; j++) {
        const point = predictions[j].landmarks[2];

        const distance = Math.abs(Math.sqrt(Math.pow(point[0] - noise[0], 2) + Math.pow(point[1] - noise[1], 2))).toFixed(3);

        console.log("A imagem " + i + " tem " + distance + " de distância com relação a imagem " + j);

        if (distance < safeDistance) {
          alert("A imagem " + i + " tem " + distance + " de distância com relação a imagem " + j + ". O que implica em dizer que é menor do que 1.5 metros, o desejado.");
        }

      }

    }
  } else {
    document.getElementById("status").innerText = "Nenhum rosto encontrado!";
  }
}
findFaces();