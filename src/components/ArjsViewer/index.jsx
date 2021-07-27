import React from "react";

class ARjs extends React.Component {
  render() {
    return (
      <div>
        <a-scene
          arjs="sourceType: webcam; debugUIEnabled: false"
          vr-mode-ui="enabled: false"
        >
          <a-marker type="pattern" url="cocalogo.patt">
            <a-entity
              position="-0.2 -0.8 -0.8"
              scale="0.01 0.01 0.01"
              gltf-model="/itesa3.gltf"
              rotation="250 0 0"
            ></a-entity>
          </a-marker>
          <a-marker type="pattern" url="box.patt">
            <a-entity
              position="-0.2 -0.8 -0.8"
              scale="0.01 0.01 0.01"
              gltf-model="/itesa3.gltf"
              rotation="250 0 0"
            ></a-entity>
          </a-marker>
        </a-scene>
      </div>
    );
  }
}

export default ARjs;

{
  /* <a-anchor hit-testing-enabled="true">
<a-entity
  position="-0.2 -0.8 -0.8"
  scale="0.03 0.03 0.03"
  rotation="200 0 0"
  obj-model="obj: url(model/dog.obj); mtl: url(model/dog.mtl)"
></a-entity>
</a-anchor> */
}
