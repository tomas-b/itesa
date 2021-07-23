import React from "react";

const ARjs = () => {
  return (
    <div>
      <a-scene
        arjs
        embedded
        renderer="logarithmicDepthBuffer: true;"
        vr-mode-ui="enabled: false"
        gesture-detector
        id="scene"
      >
        <a-assets>
          <a-asset-item id="bowser" src="./itesa3.gltf"></a-asset-item>
        </a-assets>

        <a-marker
          preset="hiro"
          raycaster="objects: .clickable"
          emitevents="true"
          cursor="fuse: false; rayOrigin: mouse;"
          id="markerA"
        >
          <a-entity
            id="bowser-model"
            gltf-model="#bowser"
            position="0 0 0"
            scale="0.001 0.001 0.001"
            class="clickable"
            gesture-handler
          ></a-entity>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
};

export default ARjs;
