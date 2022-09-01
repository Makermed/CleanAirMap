import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';


class SnapShareButton extends React.Component {
  componentDidMount() {
    (function(d, s, id) {
      let js;
      let sjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://sdk.snapkit.com/js/v1/create.js';
      sjs.parentNode.insertBefore(js, sjs);
    })(document, 'script', 'snapkit-creative-kit-sdk');

    // window.snapKitInit = function() {
    //   snap.creativekit.initalizeShareButtons(
    //     document.getElementsByClassName('snapchat-share-button')
    //   );
    // };
  }

  componentWillUnmount() {
    (function(d, id) {
      let js = d.getElementById(id);
      if (js) {
        js.remove();
      }
    })(document, 'snapkit-creative-kit-sdk');
  }

  render() {
    const {
      dataShareUrl,
      dataTheme,
      dataSize,
      dataText,
      siteName,
      sitetitle,
      stickerAssetURL,
      publisherID
    } = this.props;

    return (
      <div>
        <Helmet>
          <title>Raven</title>
          <meta content={siteName} property='og:site_name' />
          <meta content={sitetitle} property='og:title' />
          <meta content={stickerAssetURL} property='snapchat:sticker' />
          <meta content={publisherID} property='snapchat:publisher' />
        </Helmet>
        <div
          className='snapchat-creative-kit-share'
          data-share-url={dataShareUrl}
          data-theme={dataTheme}
          data-size={dataSize}
          data-text={dataText}
        >
        </div>
        {/* <button
          style={{margin: 0}}
          className={'snapchat-share-button'}
          data-share-url={dataShareUrl}
        >
        </button> */}
      </div>
    );
  }
}

SnapShareButton.propTypes = {
  dataShareUrl: PropTypes.string,
  dataTheme: PropTypes.string,
  dataSize: PropTypes.string,
  dataText: PropTypes.string,
  siteName: PropTypes.string,
  sitetitle: PropTypes.string,
  stickerAssetURL: PropTypes.string,
  publisherID: PropTypes.string
};

SnapShareButton.defaultProps = {
  dataShareUrl: 'https://kit.snapchat.com/',
  dataTheme: 'light',
  dataSize: 'large',
  dataText: 'false',
  siteName: 'Raven: news and social media simplified',
  sitetitle: 'The Fastest Way to Share a Moment!',
  stickerAssetURL: '/static/images/logo/light/logo.png',
  publisherID: ''
};

export default SnapShareButton;