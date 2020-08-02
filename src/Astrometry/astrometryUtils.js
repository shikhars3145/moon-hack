import axios from 'axios';
import qs from 'qs';

let tagsArray;

const login = async () => {
  const url = 'http://nova.astrometry.net/api/login';
  const data = {
    'request-json': JSON.stringify({ apikey: 'aulejjayhjaftkcz' }),
  };
  const config = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  };

  const res = await axios.post(url, qs.stringify(data), config);
  return res;
};

const submit = async (sessionId, imageUrl) => {
  const submissionObj = {
    session: sessionId,
    url: imageUrl,
  };

  const submissionData = {
    'request-json': JSON.stringify(submissionObj),
  };

  const submissionUrl = 'http://nova.astrometry.net/api/url_upload';

  const config = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  };

  const res = await axios.post(
    submissionUrl,
    qs.stringify(submissionData),
    config
  );
  return res;
};

// SETS TAGS ARRAY
const jobStatusStep = async (jobId) => {
  let jobStatus;

  const getJobStatus = async () => {
    let res = await axios.get(`http://nova.astrometry.net/api/jobs/${jobId}`);

    jobStatus = res.data.status;

    if (jobStatus !== 'solving') {
      clearInterval(jobInt);
      if (jobStatus === 'success') {
        while (!res.data.tags)
          res = await axios.get(
            `http://nova.astrometry.net/api/jobs/${jobId}/info`
          );
        console.log(res.data);
        const jobTags = [...res.data.tags, ...res.data.objects_in_field];
        console.log('Fimished', jobTags);
        tagsArray = jobTags;
        return jobTags;
      } else tagsArray = ['We Dont Know Much About This Image'];
    }
  };

  const jobInt = setInterval(getJobStatus, 10000);
};

// CALLS JOB STATUS STEP
const submissionStatusStep = async (subid) => {
  let subInfo;

  const getSubInfo = async () => {
    const res = await axios.get(
      `http://nova.astrometry.net/api/submissions/${subid}`
    );

    subInfo = res.data;

    console.log(res);

    if (subInfo.processing_finished !== 'None' && subInfo.jobs[0] != null) {
      clearInterval(subInt);
      console.log(subInfo);
      const jobId = subInfo.jobs[0];
      return jobStatusStep(jobId);
    }
  };

  const subInt = setInterval(getSubInfo, 5000);
};

export { login, submit, submissionStatusStep, tagsArray };
