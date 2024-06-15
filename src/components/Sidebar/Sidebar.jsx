
import React, { useRef } from 'react';
import "./Sidebar.css";

function Sidebar() {
  // TODO: build the addCafe feature
  const jinjaRef = useRef(null);

  const criteria = ["縁結び", "金運","IT"];
  const criteriaRefs = useRef(criteria.map(() => React.createRef()));

  const handleSubmit = (e) => {
    e.preventDefault();
    const jinja = jinjaRef.current.value;
    const selectedCriteria = criteria.filter((_, index) => criteriaRefs.current[index].current.checked);

    const formData = new FormData();
    formData.append('omamori[jinja]', jinja);
    selectedCriteria.forEach(tag => formData.append('omamori[tags][]', tag));
    fetch('https://omamori-api-4689048697bb.herokuapp.com/api/v1/omamoris', {
      method: 'POST',
      body: formData,
    })
  };

  return (
    <div className="sidebar">
      <div>
        <h3>Add</h3>
        <form onSubmit={handleSubmit}>

        <div className="input-group mb-3">
            <span className="input-group-text" id="cafe-picture"><i className="fa-solid fa-camera-retro form-icons"></i></span>
            <input name="cafe[picture]" type="file" className="form-control" aria-describedby="cafe-picture" placeholder='http://example.com/image.jpg'/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="omamori-jinja"><i className="fa-solid fa-mug-saucer form-icons"></i></span>
            <input name="omamori[jinja]" placeholder="Jinja Name" type="text" ref={jinjaRef} className="form-control" aria-describedby="omamori-jinja" />
            </div>

          <div className="mb-3">
            { criteria.map((criterion) => {
              return (
                <React.Fragment key={criterion}>
                  <input name="omamori[tags][]" type="checkbox" className="btn-check" id={criterion} autoComplete="off" value={criterion}/>
                  <label className="btn btn-outline-success btn-sm mx-1 mb-1" htmlFor={criterion}>{criterion}</label>
                </React.Fragment>
              );
            }) }
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-success">Add Data to API</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Sidebar;
