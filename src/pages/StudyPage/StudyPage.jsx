import React, { Component } from 'react';
import './StudyPage.scss';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import axios from 'axios';
import db from '../../firebase';
import firebase from 'firebase';

import {
  login as astLogin,
  submit,
  submissionStatusStep,
  tagsArray,
} from '../../Astrometry/astrometryUtils';

import TagsContainer from '../../components/TagsContainer/TagsContainer';

export class StudyPage extends Component {
  constructor() {
    super();
    this.state = {
      tags: [],
      showTagsContainer: false,
    };
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

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ showTagsContainer: true });
    // this.tagsContainer.style.display = 'block';

    const radarRes = await axios.get('https://api.radar.io/v1/geocode/ip', {
      headers: {
        authorization: 'prj_live_sk_4216c851eed8ba07a7b61295c5f2a15ce87ea971',
      },
    });

    console.log(radarRes);

    const { latitude, longitude } = radarRes.data.address;

    console.log(latitude, longitude);

    // Firebase code here

    setTimeout(function () {
      db.collection('users').add({
        image: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }, 5000);

    // ASTROMETRY API
    // login
    let res = await astLogin();
    console.log('res:', res);

    const sessionId = res.data.session;

    const imageUrl =
      'https://in-the-sky.org/images/constellations/con_TAU_001.png';

    res = await submit(sessionId, imageUrl);

    const { subid } = res.data;

    //get submission status and add tags to state

    const tags = await submissionStatusStep(subid);
    console.log(tags);

    const tagsInt = setInterval(() => {
      console.log(tagsArray);
      if (tagsArray) {
        clearInterval(tagsInt);
        this.setState({ tags: tagsArray });
      }
    }, 10000);
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

          <TagsContainer
            tags={this.state.tags}
            showTagsContainer={this.state.showTagsContainer}
          />

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
