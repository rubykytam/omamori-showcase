import React, { useRef } from 'react';
import "./Sidebar.css";

function Sidebar({ fetchOmamoris }) {
  const jinjaRef = useRef(null);
  const nameRef = useRef(null);
  const photoRef = useRef(null);
  const criteriaRefs = useRef([]);
  const criteria = ["縁結び", "金運", "仕事", "除厄", "IT", "その他","test"];

  const uploadFileToCloudinary = (file) => {
    const url = `https://api.cloudinary.com/v1_1/dtpr5icvx/image/upload`;
    const preset = 'uploadomamori';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset);

    return fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to upload file to Cloudinary');
      }
      return response.json();
    });
  };

  const handleCheckboxChange = (index) => {
    criteriaRefs.current.forEach((ref, i) => {
      if (ref && i !== index) {
        ref.checked = false;
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jinja = jinjaRef.current.value;
    const photo = photoRef.current.files[0];
    const selectedName = criteriaRefs.current.find(ref => ref && ref.checked).value;

    // Create formData and append jinja and name
    const formData = new FormData();
    formData.append('omamori[jinja]', jinja);
    formData.append('omamori[name]', selectedName);

    const submitForm = (cloudinaryResponse) => {
      if (cloudinaryResponse) {
        formData.append('omamori[photo_url]', cloudinaryResponse.secure_url);
      }
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      return fetch('https://omamori-api-4689048697bb.herokuapp.com/api/v1/omamoris', {
        method: 'POST',
        body: formData,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to create omamori');
        }
        return response.json();
      })
      .then(() => {
        fetchOmamoris(); // Refresh the list after adding

        // Clear the form fields
        jinjaRef.current.value = '';
        photoRef.current.value = null;
        criteriaRefs.current.forEach(ref => {
          if (ref) ref.checked = false;
        });
      });
    };

    if (photo) {
      uploadFileToCloudinary(photo)
        .then(submitForm)
        .catch(error => {
          console.error('Error:', error);
          submitForm(null); // Proceed with form submission even if photo upload fails
        });
    } else {
      submitForm(null); // Proceed with form submission if there's no photo
    }
  };

  return (
    <div className="sidebar">
      <div>
        <h3>追加</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input ref={photoRef} name="omamori[photo_url]" type="file" className="form-control" aria-describedby="omamori-photo" placeholder='写真'/>
          </div>
          <div className="input-group mb-3">
            <input name="omamori[jinja]" placeholder="神社の名前" type="text" ref={jinjaRef} className="form-control" aria-describedby="omamori-jinja" />
          </div>
          <div className="mb-3" ref={nameRef}>
            {criteria.map((criterion, index) => (
              <React.Fragment key={criterion}>
                <input
                  name="omamori[name]"
                  type="checkbox"
                  className="btn-check"
                  id={criterion}
                  autoComplete="off"
                  value={criterion}
                  ref={el => criteriaRefs.current[index] = el}
                  onChange={() => handleCheckboxChange(index)}
                />
                <label className="btn btn-outline-success btn-sm mx-1 mb-1" htmlFor={criterion}>{criterion}</label>
              </React.Fragment>
            ))}
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-success">登録します</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Sidebar;
