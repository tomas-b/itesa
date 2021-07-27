import React, { useEffect, useRef, useContext } from "react";
import { useState } from "react";
import { db } from "../../../src/base";
import { AuthContext } from "../../Auth";

const ARjs = () => {
    const [productos, setProductos] = useState([]);
    const { currentUser } = useContext(AuthContext);

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
            tag.addEventListener("markerFound", (event) => {
                db.collection("users")
                    .doc(currentUser.uid)
                    .get()
                    .then((res) => {
                        return res.data();
                    })
                    .then(async (data) => {
                        let puntos = data.points + producto.points;
                        let productosAverificar = data.productosYaEscaneados;
                        let arr = productosAverificar.split(",");
                        if (arr.includes(event.target.id)) {
                            puntos = data.points;
                            alert(
                                "Ya escaneaste este producto , si queres sumar mas puntos proba en escanear otro"
                            );
                        } else {
                            alert(`encontre el producto y el Nombre es:
                                    ${event.target.id} y los puntos son : ${producto.points}`);
                            arr.push(event.target.id);
                            let palabra = arr.toString();
                            db.collection("users").doc(currentUser.uid).update({
                                points: puntos,
                                productosYaEscaneados: palabra,
                            });
                        }
                    });
            });
        });
    }, [productos]);
    return (
        <div>
            <a-scene
                arjs="sourceType: webcam; debugUIEnabled: false"
                vr-mode-ui="enabled: false"
            >
                {productos.length
                    ? productos.map((producto) => {
                          return (
                              <>
                                  <a-marker
                                      id={producto.name}
                                      type="pattern"
                                      url={`${producto.name}.patt`}
                                  >
                                      <a-entity
                                          position="-0.2 -0.8 -0.8"
                                          scale="0.01 0.01 0.01"
                                          gltf-model="/itesa3.gltf"
                                          rotation="250 0 0"
                                      ></a-entity>
                                  </a-marker>
                              </>
                          );
                      })
                    : console.log("todavia no hay productos")}
            </a-scene>
        </div>
    );
};

export default ARjs;
