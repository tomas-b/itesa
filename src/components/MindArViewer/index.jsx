import React, { useEffect, useRef, useContext } from "react";
import { useState } from "react";
import { db } from "../../../src/base";
import { AuthContext } from "../../Auth";

const MindArViewer = () => {
  const sceneRef = useRef(null);
  const [productos, setProductos] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    const arSystem = sceneEl.systems["mindar-system"];

    sceneEl.addEventListener("renderstart", () => {
      arSystem.start(); // start AR
    });
    return () => {
      arSystem.stop();
    };
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      let productos = await db.collection("productosParaEscanear").get();
      return productos.docs.map((producto) => producto.data());
    };

    getProducts().then((data) => {
      setProductos(data);
    });
  }, []);

  useEffect(() => {
    productos.map((producto) => {
      const tag = document.getElementById(producto.name);
      tag.addEventListener("targetFound", (event) => {
        console.log(
          `encontre el producto y el Nombre es:
                    ${event.target.id} y los puntos son : ${producto.points}`
        );
        db.collection("users")
          .doc(currentUser.uid)
          .get()
          .then((res) => res.data().points + producto.points)
          .then((data) => {
            db.collection("users").doc(currentUser.uid).update({
              points: data,
            });
          });
      });
    });
  }, [productos]);

  return (
    <a-scene
      ref={sceneRef}
      mindar="imageTargetSrc: ./productos.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: yes;"
      color-space="sRGB"
      embedded
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
      <a-assets>
        <a-asset-item
          id="avatarModel"
          // src={`${producto.imgUrl}`}
          src="/itesa.gltf"
        ></a-asset-item>
      </a-assets>
      <a-entity id="cocacola" mindar-image-target="targetIndex: 0">
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
      <a-entity id="agua" mindar-image-target="targetIndex: 2">
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
