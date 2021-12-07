async function findFaces() {
    const model = await blazeface.load();  
    const img = document.querySelector("img");
    const predictions = await model.estimateFaces(img, false);
    let noise;
    if (predictions.length > 0) {
        console.log(predictions);
        document.getElementById("status").innerText = "Rostos Encontrados!";
        const canvas = document.getElementById("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgba(250,225,6,0.5)";
        for (let i = 0; i < predictions.length; i++) {
          const start = predictions[i].topLeft;
          const end = predictions[i].bottomRight;
          const size = [end[0] - start[0], end[1] - start[1]];
          ctx.fillRect(start[0], start[1], size[0], size[1]);

          noise = predictions[i].landmarks[2];

          for(let j = i+1; j < predictions.length; j++){
            const point = predictions[j].landmarks[2];

            const distance = Math.sqrt(Math.exp(point[0]-noise[0])+Math.exp(point[1]-noise[1]));

            console.log("A imagem "+i+" tem "+distance+" de distância com relação a imagem "+j);
          }
          
        }
      } else {
        document.getElementById("status").innerText = "Nenhum rosto encontrado!";
      }
}
findFaces();