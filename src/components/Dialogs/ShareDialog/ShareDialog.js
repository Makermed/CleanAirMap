import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Dialog, Grid, IconButton } from "@material-ui/core";
import { isMobile } from 'react-device-detect';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  // VKShareButton,
  // OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  // TumblrShareButton,
  LivejournalShareButton,
  // MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  WeiboShareButton,
  PocketShareButton,
  InstapaperShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  // VKIcon,
  // OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  // TumblrIcon,
  // MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon
} from "react-share";
import {
  CopytextShareButton, 
  SnapShareButton 
} from './components';

const styles = theme => ({
  dialog: {
    width: 210,
    maxHeight: 210,
    margin: theme.spacing(1),
  },
  share_item: {
    margin: theme.spacing(0.5),
  },
  share_icon: {
    margin: 0,
    padding: 0
  },
  share_icon_image: {
    width: 32,
    height: 32
  },
});

class ShareDialog extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.onClose();
  }

  render() {
    const { classes, shareInfo, ...other } = this.props;

    // sms link
    const body = `title:${shareInfo.title}\ndescription:${shareInfo.description}\nurl:${shareInfo.url}`;
    const encoded_body = encodeURIComponent(body);
    const sms_link = `sms://?body=${encoded_body}`;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="share-dialog-title"
        classes={{ paper: classes.dialog}}
        {...other}
      >
        <Grid container spacing={0}>
          <Grid item className={classes.share_item}>
            <FacebookShareButton
              url={shareInfo.url}
              quote={shareInfo.title}
              hashtag={shareInfo.hashtag}
              className="Facebook_share-button"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </Grid>
          <Grid item className={classes.share_item}>
            <TwitterShareButton
              url={shareInfo.url}
              title={shareInfo.title}
              via={shareInfo.description}
              hashtags={shareInfo.hashtag.split(',')}
              className="Twitter_share-button"
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </Grid>
          <Grid item className={classes.share_item}>
            <TelegramShareButton
              url={shareInfo.url}
              title={shareInfo.title}
              className="Telegram_share-button"
            >
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </Grid>
          <Grid item className={classes.share_item}>
            <WhatsappShareButton
              url={shareInfo.url}
              title={shareInfo.title}
              separator=":: "
              className="Whatsapp_share-button"
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </Grid>
          <Grid item className={classes.share_item}>
            <LinkedinShareButton
              url={shareInfo.url}
              title={shareInfo.title}
              via={shareInfo.description}
              hashtags={shareInfo.hashtag.split(',')}
              windowWidth={750}
              windowHeight={600}
              className="Linkedin_share-button"
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </Grid>
          <Grid item className={classes.share_item}>
            <PinterestShareButton
              url={shareInfo.url}
              media={shareInfo.image}
              description={shareInfo.description}
              windowWidth={1000}
              windowHeight={730}
              className="Pinterest_share-button"
            >
              <PinterestIcon size={32} round />
            </PinterestShareButton>
          </Grid>
          {/* <Grid item className={classes.share_item}>
            <VKShareButton
              url={shareInfo.url}
              title={shareInfo.title}
              image={shareInfo.image}
              description={shareInfo.description}
              windowWidth={660}
              windowHeight={460}
              className="VK_share-button"
            >
              <VKIcon size={32} round />
            </VKShareButton>
          </Grid> */}
          {/* <Grid item className={classes.share_item}>
            <OKShareButton
              url={shareInfo.url}
              title={shareInfo.title}
              image={shareInfo.image}
              description={shareInfo.description}
              className="OK_share-button"
            >
              <OKIcon size={32} round />
            </OKShareButton>
          </Grid> */}
          <Grid item className={classes.share_item}>
            <RedditShareButton
              url={shareInfo.url}
              title={shareInfo.title}
              windowWidth={660}
              windowHeight={460}
              className="Reddit_share-button"
            >
              <RedditIcon size={32} round />
            </RedditShareButton>
          </Grid>
          {/* <Grid item className={classes.share_item}>
            <TumblrShareButton
              url={shareInfo.url}
              title={shareInfo.title}
              tags={shareInfo.hashtag.split(',')}
              caption={shareInfo.description}
              windowWidth={660}
              windowHeight={460}
              className="Tumblr_share-button"
            >
              <TumblrIcon size={32} round />
            </TumblrShareButton>
          </Grid> */}
          <Grid item className={classes.share_item}>
            <LivejournalShareButton
              url={shareInfo.url}
              title={shareInfo.title}
              description={shareInfo.description}
              className="Livejournal_share-button"
            >
              <LivejournalIcon size={32} round />
            </LivejournalShareButton>
          </Grid>
          {/* <Grid item className={classes.share_item}>
            <MailruShareButton
              url={shareInfo.url}
              title={shareInfo.title}
              image={shareInfo.image}
              description={shareInfo.description}
              className="Mailru_share-button"
            >
              <MailruIcon size={32} round />
            </MailruShareButton>
          </Grid> */}
          <Grid item className={classes.share_item}>
            <EmailShareButton
              url={shareInfo.url}
              subject={shareInfo.title}
              body={shareInfo.description}
              className="Email_share-button"
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
          </Grid>
          <Grid item className={classes.share_item}>
            <ViberShareButton
              url={shareInfo.url}
              title={shareInfo.title}
              className="Viber_share-button"
            >
              <ViberIcon size={32} round />
            </ViberShareButton>
          </Grid>
          <Grid item className={classes.share_item}>
            <WorkplaceShareButton
              url={shareInfo.url}
              quote={shareInfo.title}
              hashtag={shareInfo.hashtag}
              className="Workplace_share-button"
            >
              <WorkplaceIcon size={32} round />
            </WorkplaceShareButton>
          </Grid>
          <Grid item className={classes.share_item}>
            <LineShareButton
              url={shareInfo.url}
              title={shareInfo.title}
              className="Line_share-button"
            >
              <LineIcon size={32} round />
            </LineShareButton>
          </Grid>
          <Grid item className={classes.share_item}>
            <WeiboShareButton
              url={shareInfo.url}
              title={shareInfo.title}
              // image={`${String(window.location)}/${exampleImage}`}
              className="Weibo_share-button"
            >
              <img
                className="Weibo_custom-icon"
                width={32}
                height={32}
                src="http://icons.iconarchive.com/icons/martz90/circle-addon2/512/weibo-icon.png"
                alt="Weibo share button"
              />
            </WeiboShareButton>
          </Grid>
          <Grid item className={classes.share_item}>
            <PocketShareButton
              url={shareInfo.url}
              title={shareInfo.title}
              className="Pocket_share-button"
            >
              <PocketIcon size={32} round />
            </PocketShareButton>
          </Grid>
          <Grid item className={classes.share_item}>
            <InstapaperShareButton
              url={shareInfo.url}
              title={shareInfo.title}
              className="Instapaper_share-button"
            >
              <InstapaperIcon size={32} round />
            </InstapaperShareButton>
          </Grid>
          <Grid item className={classes.share_item}>
            <CopytextShareButton
              url={shareInfo.url}
            >
            </CopytextShareButton>
          </Grid>
          {isMobile && (
            <Grid item className={classes.share_item}>
              <a href={sms_link}>
                <IconButton
                  className={classes.share_icon}
                >
                  <img 
                    className={classes.share_icon_image}
                    alt="sms"
                    src={"/static/images/icons/sms.png"} 
                  />
                </IconButton>
              </a>
            </Grid>
          )}
          <Grid item className={classes.share_item}>
            <SnapShareButton
              dataShareUrl={shareInfo.url}
            >
              {/* <img 
                className={classes.share_icon_image}
                alt="snapchat"
                src={"/static/images/icons/snapchat.png"} 
              /> */}
            </SnapShareButton>
          </Grid>          
        </Grid>
      </Dialog>
    );
  }
}

ShareDialog.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  shareInfo: PropTypes.object,
  onClose: PropTypes.func
};

export default withStyles(styles)(ShareDialog);
