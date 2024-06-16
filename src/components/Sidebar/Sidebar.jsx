
import React, { useRef } from 'react';
// import { DirectUpload } from '@rails/activestorage';
import "./Sidebar.css";

function Sidebar({fetchOmamoris}) {
  // TODO: build the addCafe feature
  const jinjaRef = useRef(null);
  const criteriaRefs = useRef([]);
  // const photoRef = useRef(null);
  const criteria = ["縁結び", "金運","IT"];


  // const uploadFile = (file, callback) => {
  //   const upload = new DirectUpload(file, '/rails/active_storage/direct_uploads');
  //   upload.create((error, blob) => {
  //     if (error) {
  //       console.error(error);
  //     } else {
  //       callback(blob);
  //     }
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jinja = jinjaRef.current.value;
    // const photo = photoRef.current.files[0];
    const selectedCriteria = criteriaRefs.current
      .filter(ref => ref && ref.checked)
      .map(ref => ref.value);

    const formData = new FormData();
    formData.append('omamori[jinja]', jinja);
    // formData.append('omamori[photo]', photo.signed_id);
    selectedCriteria.forEach(tag => {
      formData.append('omamori[tags][]', tag);
    });
    console.log(formData);
    fetch('https://omamori-api-4689048697bb.herokuapp.com/api/v1/omamoris', {
      method: 'POST',
      body: formData,
    })
    .then(data => {
      console.log('Omamori created:', data);
      fetchOmamoris();
    });
    jinjaRef.current.value = '';
    criteriaRefs.current.forEach(ref => {
      if (ref) ref.checked = false;
    });
  };

  return (
    <div className="sidebar">
      <div>
        <h3>Add</h3>
        <form onSubmit={handleSubmit}>

        <div className="input-group mb-3">
            <span className="input-group-text" id="omamori-photos"><i className="fa-solid fa-camera-retro form-icons"></i></span>
            <input name="omamori[photos]" type="file" className="form-control" aria-describedby="omamori-photo" placeholder='upload photo'/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="omamori-jinja"><i className="fa-solid fa-mug-saucer form-icons"></i></span>
            <input name="omamori[jinja]" placeholder="Jinja Name" type="text" ref={jinjaRef} className="form-control" aria-describedby="omamori-jinja" />
            </div>

            <div className="mb-3">
            {criteria.map((criterion, index) => (
              <React.Fragment key={criterion}>
                <input
                  name="omamori[tags][]"
                  type="checkbox"
                  className="btn-check"
                  id={criterion}
                  autoComplete="off"
                  value={criterion}
                  ref={el => criteriaRefs.current[index] = el}
                />
                <label className="btn btn-outline-success btn-sm mx-1 mb-1" htmlFor={criterion}>{criterion}</label>
              </React.Fragment>
            ))}
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
