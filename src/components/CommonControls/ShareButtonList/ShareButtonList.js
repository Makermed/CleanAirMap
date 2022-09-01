import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  ImageList,
  ImageListItem,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { isMobile } from "react-device-detect";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  LivejournalShareButton,
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
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
} from "react-share";
import { 
  CopylinkButton,
  SnapShareButton
} from "./components";
import { MIN_CARD_WIDTH } from "constants/types";

const styles = (theme) => ({
  root: {
    width: MIN_CARD_WIDTH - 32,
    // maxHeight: 210,
    margin: theme.spacing(1),
  },
  imagelist: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    overflowY: "hidden",
    overflowX: "auto",
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    fontSize: "14px",
    marginTop: theme.spacing(1),
  },
  share_item: {
    cursor: "pointer",
    marginTop: theme.spacing(2),
  },
  share_icon: {
    margin: 0,
    padding: 0,
  },
  share_icon_image: {
    width: 32,
    height: 32,
  },
});

class ShareButtonList extends React.Component {

  
  render() {

    const { classes, shareInfo, theme_mode } = this.props;

    // sms link
    const body = `${shareInfo.title}\n\n${shareInfo.description}\n\n${shareInfo.url}`;
    const encoded_body = encodeURIComponent(body);
    // Note: must use ?&body=<body text> to populate body text 
    const sms_link = `sms:?&body=${encoded_body}`;

    return (
      <div className={classes.root}>
        <ImageList className={classes.imagelist} cols={3}>
          <ImageListItem key="copylink-whatsapp">
            <div className={classes.share_item}>
              <CopylinkButton 
                url={shareInfo.url}
                theme_mode={theme_mode}
              />
            </div>
            <div className={classes.share_item}>
              <WhatsappShareButton
                url={shareInfo.url}
                title={shareInfo.title}
                separator=":: "
                className="Whatsapp_share-button"
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <WhatsappIcon size={32} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.title}>Whatsapp</Typography>
                  </Grid>
                </Grid>
              </WhatsappShareButton>
            </div>
          </ImageListItem>
          <ImageListItem key="twitter-sms">
            <div className={classes.share_item}>
              <TwitterShareButton
                url={shareInfo.url}
                title={shareInfo.title}
                via={shareInfo.description}
                hashtags={shareInfo.hashtag.split(",")}
                className="Twitter_share-button"
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <TwitterIcon size={32} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.title}>Twitter</Typography>
                  </Grid>
                </Grid>
              </TwitterShareButton>
            </div>
            {isMobile ? (
              <div className={classes.share_item}>
                <a href={sms_link}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item>
                      <IconButton className={classes.share_icon}>
                        <img
                          className={classes.share_icon_image}
                          alt="sms"
                          src={`/static/images/icons/${theme_mode}/sms.png`}
                        />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.title}>SMS</Typography>
                    </Grid>
                  </Grid>
                </a>
              </div>
            ) : (
              <div className={classes.share_item}>
                <SnapShareButton 
                  dataShareUrl={shareInfo.url}
                >
                </SnapShareButton>
              </div>
            )}
          </ImageListItem>
          <ImageListItem key="facebook-email">
            <div className={classes.share_item}>
              <FacebookShareButton
                url={shareInfo.url}
                quote={shareInfo.title}
                hashtag={shareInfo.hashtag}
                className="Facebook_share-button"
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <FacebookIcon size={32} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.title}>Facebook</Typography>
                  </Grid>
                </Grid>
              </FacebookShareButton>
            </div>
            <div className={classes.share_item}>
              <EmailShareButton
                url={shareInfo.url}
                subject={shareInfo.title}
                body={shareInfo.description}
                className="Email_share-button"
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <EmailIcon size={32} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.title}>Email</Typography>
                  </Grid>
                </Grid>
              </EmailShareButton>
            </div>
          </ImageListItem>
          <ImageListItem key="linkedin-pinterest">
            <div className={classes.share_item}>
              <LinkedinShareButton
                url={shareInfo.url}
                title={shareInfo.title}
                via={shareInfo.description}
                hashtags={shareInfo.hashtag.split(",")}
                windowWidth={750}
                windowHeight={600}
                className="Linkedin_share-button"
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <LinkedinIcon size={32} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.title}>Linkedin</Typography>
                  </Grid>
                </Grid>
              </LinkedinShareButton>
            </div>
            <div className={classes.share_item}>
              <PinterestShareButton
                url={shareInfo.url}
                media={shareInfo.image}
                description={shareInfo.description}
                windowWidth={1000}
                windowHeight={730}
                className="Pinterest_share-button"
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <PinterestIcon size={32} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.title}>Pinterest</Typography>
                  </Grid>
                </Grid>
              </PinterestShareButton>
            </div>
          </ImageListItem>
          <ImageListItem key="reddit-livejournal">
            <div className={classes.share_item}>
              <RedditShareButton
                url={shareInfo.url}
                title={shareInfo.title}
                windowWidth={660}
                windowHeight={460}
                className="Reddit_share-button"
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <RedditIcon size={32} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.title}>Reddit</Typography>
                  </Grid>
                </Grid>
              </RedditShareButton>
            </div>
            <div className={classes.share_item}>
              <LivejournalShareButton
                url={shareInfo.url}
                title={shareInfo.title}
                description={shareInfo.description}
                className="Livejournal_share-button"
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <LivejournalIcon size={32} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.title}>Live Journal</Typography>
                  </Grid>
                </Grid>
              </LivejournalShareButton>
            </div>
          </ImageListItem>
          <ImageListItem key="viber-instapaper">
            <div className={classes.share_item}>
              <ViberShareButton
                url={shareInfo.url}
                title={shareInfo.title}
                className="Viber_share-button"
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <ViberIcon size={32} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.title}>Viber</Typography>
                  </Grid>
                </Grid>
              </ViberShareButton>
            </div>
            <div className={classes.share_item}>
              <InstapaperShareButton
                url={shareInfo.url}
                title={shareInfo.title}
                className="Instapaper_share-button"
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <InstapaperIcon size={32} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.title}>Instapaper</Typography>
                  </Grid>
                </Grid>
              </InstapaperShareButton>
            </div>
          </ImageListItem>
          <ImageListItem key="workplace-line">
            <div className={classes.share_item}>
              <WorkplaceShareButton
                url={shareInfo.url}
                quote={shareInfo.title}
                hashtag={shareInfo.hashtag}
                className="Workplace_share-button"
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <WorkplaceIcon size={32} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.title}>Workplace</Typography>
                  </Grid>
                </Grid>
              </WorkplaceShareButton>
            </div>
            <div className={classes.share_item}>
              <LineShareButton
                url={shareInfo.url}
                title={shareInfo.title}
                className="Line_share-button"
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <LineIcon size={32} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.title}>Line</Typography>
                  </Grid>
                </Grid>
              </LineShareButton>
            </div>
          </ImageListItem>
          <ImageListItem key="weibo-pocket">
            <div className={classes.share_item}>
              <WeiboShareButton
                url={shareInfo.url}
                title={shareInfo.title}
                // image={`${String(window.location)}/${exampleImage}`}
                className="Weibo_share-button"
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item style={{height: '32px'}}>
                    <img 
                      className={classes.share_icon_image}
                      alt="weibo"
                      src={"/static/images/icons/weibo.png"} 
                    />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.title}>Weibo</Typography>
                  </Grid>
                </Grid>
              </WeiboShareButton>
            </div>
            <div className={classes.share_item}>
              <PocketShareButton
                url={shareInfo.url}
                title={shareInfo.title}
                className="Pocket_share-button"
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <PocketIcon size={32} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.title}>Pocket</Typography>
                  </Grid>
                </Grid>
              </PocketShareButton>
            </div>
          </ImageListItem>
          <ImageListItem key="telegram-snapchat">
            <div className={classes.share_item}>
              <TelegramShareButton
                url={shareInfo.url}
                title={shareInfo.title}
                className="Telegram_share-button"
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <TelegramIcon size={32} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.title}>Telegram</Typography>
                  </Grid>
                </Grid>
              </TelegramShareButton>
            </div>
            {isMobile && 
              <div className={classes.share_item}>
                <SnapShareButton 
                  dataShareUrl={shareInfo.url}
                >
                </SnapShareButton>
              </div>
            }
          </ImageListItem>
        </ImageList>
      </div>
    );
  }
}

ShareButtonList.propTypes = {
  classes: PropTypes.object,
  theme_mode: PropTypes.string,
  shareInfo: PropTypes.object,
};

export default withStyles(styles)(ShareButtonList);
