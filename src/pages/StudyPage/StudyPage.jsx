import React, { Component } from 'react';
import './StudyPage.scss';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import db from '../../firebase';
import firebase from 'firebase';

export class StudyPage extends Component {
  constructor() {
    super();
    this.state = {};
  }

  triggerClick = () => {
    this.imageInput.click();
  };

  handleFileChange = (event) => {
    if (!event.target.files[0]) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      this.imagePreview.src = e.target.result;
    };

    reader.readAsDataURL(event.target.files[0]);

    this.imageContainer.style.display = 'block';
    this.askText.style.display = 'none';
  };

  handleSubmit = (event) => {
    event.preventDefault();
    setTimeout( function(){
      db.collection('users').add({
        image: firebase.firestore.FieldValue.serverTimestamp()
      })
    },5000)
  };

  render() {
    return (
      <div className="study-page">
        <form encType="multipart/form-data">
          <div className="ask-text" ref={(el) => (this.askText = el)}>
            Select and Upload the Image captured by you. <br /> Lets See What
            you Got.
          </div>
          <div
            className="img-container"
            style={{ display: 'none' }}
            ref={(el) => (this.imageContainer = el)}
          >
            <img src="" alt="" ref={(el) => (this.imagePreview = el)} />
          </div>

          <input
            type="file"
            name="studyImage"
            id="studyImage"
            onChange={this.handleFileChange}
            ref={(el) => (this.imageInput = el)}
            style={{ display: 'none' }}
          />
          <div className="btn-container">
            <ButtonPrimary
              type="button"
              style={{ fontSize: '2rem' }}
              onClick={this.triggerClick}
            >
              SELECT IMAGE
            </ButtonPrimary>
            <ButtonPrimary
              type="submit"
              style={{ fontSize: '2rem' }}
              onClick={this.handleSubmit}
            >
              UPLOAD IMAGE
            </ButtonPrimary>
          </div>
        </form>
      </div>
    );
  }
}

export default StudyPage;
