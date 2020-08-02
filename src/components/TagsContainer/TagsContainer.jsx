import React from 'react';
import TagComponent from '../TagComponent/TagComponent';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import './TagsContainer.scss';

function TagsContainer({ tags, showTagsContainer }) {
  const uniqueTags = tags.filter((x, i, a) => a.indexOf(x) === i);

  return (
    <div className={`tags-container ${showTagsContainer ? '' : 'hide'}`}>
      <div className={`tag-msg ${tags.length ? '' : 'hide'}`}>
        {' '}
        `Nice Click, Heres what we Found in the image:`
      </div>
      {tags.length ? (
        uniqueTags.map((tag, index) => <TagComponent key={index} tag={tag} />)
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default TagsContainer;
