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
        const getProducts = async () => {
            let productos = await db.collection("productosParaEscanear").get();
            return productos.docs.map((producto) => producto.data());
        };

        getProducts().then((data) => {
            setProductos(data);
        });
        sceneEl.addEventListener("renderstart", () => {
            arSystem.start(); // start AR
        });
        return () => {
            arSystem.stop();
        };
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
            tag.addEventListener("arError", (event) => {
                console.log("MindAR failed to start");
            });
        });
    }, [productos]);
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
            <a-camera
                position="0 0 0"
                look-controls="enabled: false"
            ></a-camera>
            {productos.length
                ? productos.map((producto) => {
                      return (
                          <>
                              <a-assets>
                                  <a-asset-item
                                      id="avatarModel"
                                      src={`${producto.imgUrl}`}
                                  ></a-asset-item>
                              </a-assets>
                              <a-entity
                                  id={`${producto.name}`}
                                  mindar-image-target={`targetIndex: ${producto.index} `}
                              >
                                  <a-gltf-model
                                      rotation="0 0 0 "
                                      position="0 0 0.1"
                                      scale="0.005 0.005 0.005"
                                      src="#avatarModel"
                                      animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
                                  ></a-gltf-model>
                              </a-entity>
                          </>
                      );
                  })
                : console.log("todavia no hay productos")}
        </a-scene>
    );
};

export default MindArViewer;
