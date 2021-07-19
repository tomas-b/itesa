import React, { useEffect, useRef } from "react";

const MindArViewer = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    const arSystem = sceneEl.systems["mindar-system"];
    const coca = document.getElementById("cocaCola");
    coca.addEventListener("targetFound", (event) => {
      console.log("ENCONTRE LA COCA y el id es:", event.target.id);
    });
    const gatorade = document.getElementById("gatorade");
    gatorade.addEventListener("targetFound", (event) => {
      console.log("ENCONTRE GATORADE y el id es:", event.target.id);
    });
    sceneEl.addEventListener("renderstart", () => {
      arSystem.start(); // start AR
    });
    return () => {
      arSystem.stop();
    };
  }, []);

  //en la base de datos tenemos que tener cargo Todos los productos a escanear (coca , gateroda)
  //traerlos a travez de firebase
  //hacer un map que recorra los productos que traemos de firebase , generando un nuevo tag <a.entity id =""> con claramente como ID el nombre del producto para que cada TAG sea distinto y modificando el Target-index para que tambien sea diferente
  //despues hacer dentro de ese mismo map un evvento para cada uno de los tags
  //ya con eso vamos a tener un tag creado para cada uno de los productos y cada tag va a tener su propio "addEventListener"
  //que ese "addEventListener" va a hacer los pedidos a la DB y traer TODA la info nuevamente que corresponde con lo que escaneamos

  return (
    <a-scene
      ref={sceneRef}
      mindar="imageTargetSrc: ./coca-gatorade.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
      color-space="sRGB"
      embedded
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
        <a-asset-item
          id="avatarModel"
          /* Esto es lo que hay que cambiar para otro modelo 3D */
          src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@0.3.1/examples/assets/card-example/softmind/scene.gltf"
        ></a-asset-item>
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

      <a-entity id="cocaCola" mindar-image-target="targetIndex: 0">
        <a-gltf-model
          rotation="0 0 0 "
          position="0 0 0.1"
          scale="0.005 0.005 0.005"
          src="#avatarModel"
          animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
        ></a-gltf-model>
      </a-entity>
      <a-entity id="gatorade" mindar-image-target="targetIndex: 1">
        <a-gltf-model
          rotation="0 0 0 "
          position="0 0 0.1"
          scale="0.005 0.005 0.005"
          src="#avatarModel"
          animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
        ></a-gltf-model>
      </a-entity>
    </a-scene>
  );
};

export default MindArViewer;
