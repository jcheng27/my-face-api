app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input).then(
  function(response) {
    console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    this.calculateFaceLocation(response);
  },
  function(response1) {
    this.drawFaceBox(response1);
  },
  function(err) {
    // there was an error
    console.log(err);
  }
);
