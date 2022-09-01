// https://www.findmecity.com/
// https://www.nationsonline.org/oneworld/country_code_list.htm

import {
  AUS, AUT, BRA, CAN, CZE, DNK, EST, EGY, ETH,
  FIN, FRA, DEU, HKG, IND, IDN, IRL, ISR, ITA, JPN,
  MYS, MEX, NLD, NZL, NGA, NOR, PAK, PHL, POL, PRT,
  ROU, SGP, ZAF, ESP, SWE, CHE, TUR, GBR, USA,
} from "./country";

import {
  ARTICLE_BRANCH_YOUTUBE,
  ARTICLE_BRANCH_TWITTER,
  ARTICLE_BRANCH_INSTAGRAM,
  ARTICLE_BRANCH_REDDIT,
  ARTICLE_BRANCH_HACKERNEWS,
  // ARTICLE_BRANCH_SLASHDOT,
  // ARTICLE_BRANCH_PINTEREST,
  ARTICLE_BRANCH_TIKTOK,
} from "./branches";


export const TRENDING_BRANCHES = [
  {
    value: ARTICLE_BRANCH_YOUTUBE,
    name: "Youtube",
    image: "youtube.png",
    enableCountry: true,
  },
  {
    value: ARTICLE_BRANCH_TWITTER,
    name: "Twitter",
    image: "twitter.png",
    enableCountry: true,
  },
  {
    value: ARTICLE_BRANCH_INSTAGRAM,
    name: "Instagram",
    image: "instagram.png",
    enableCountry: true,
  },
  {
    value: ARTICLE_BRANCH_REDDIT,
    name: "Reddit",
    image: "reddit.png",
    enableCountry: true,
  },
  {
    value: ARTICLE_BRANCH_HACKERNEWS,
    name: "Hackernews",
    image: "hackernews.png",
    enableCountry: false,
  },
  {
    value: ARTICLE_BRANCH_TIKTOK,
    name: "Tiktok",
    image: "tiktok.png",
    enableCountry: false,
  },
  // {
  //   value: ARTICLE_BRANCH_SLASHDOT,
  //   name: "Slashdot",
  //   image: "slashdot.png",
  //   enableCountry: false,
  // },
  // {
  //   value: ARTICLE_BRANCH_PINTEREST,
  //   name: "Pinterest",
  //   image: "pinterest.png",
  //   enableCountry: false,
  // }
];

export const TRENDING_COUNTRIES = [
  {
    id: "trending_aus",
    code: "au",
    country: AUS,
    woeid: 23424748,
    name: "Australia",
    flag: "australia.png"
  },
  {
    id: "trending_aut",
    code: "at",
    country: AUT,
    woeid: 23424750,
    name: "Austria",
    flag: "austria.png"
  },
  {
    id: "trending_bra",
    code: "br",
    country: BRA,
    woeid: 23424768,
    name: "Brazil",
    flag: "brazil.png"
  },
  {
    id: "trending_can",
    code: "ca",
    country: CAN,
    woeid: 23424775,
    name: "Canada",
    flag: "canada.png"
  },
  {
    id: "trending_cze",
    code: "cz",
    country: CZE,
    woeid: 23424810,
    name: "Czechia",
    flag: "czech.png"
  },
  {
    id: "trending_dnk",
    code: "dk",
    country: DNK,
    woeid: 23424796,
    name: "Denmark",
    flag: "denmark.png"
  },
  {
    id: "trending_est",
    code: "ee",
    country: EST,
    woeid: 23424805,
    name: "Estonia",
    flag: "estonia.png"
  },
  {
    id: "trending_fin",
    code: "fi",
    country: FIN,
    woeid: 23424812,
    name: "Finland",
    flag: "finland.png"
  },
  {
    id: "trending_fra",
    code: "fr",
    country: FRA,
    woeid: 23424819,
    name: "France",
    flag: "france.png"
  },
  {
    id: "trending_deu",
    code: "de",
    country: DEU,
    woeid: 23424829,
    name: "Germany",
    flag: "germany.png"
  },
  {
    id: "trending_hkg",
    code: "hk",
    country: HKG,
    woeid: 24865698,
    name: "Hong Kong",
    flag: "hongkong.png"
  },
  {
    id: "trending_ind",
    code: "in",
    country: IND,
    woeid: 23424848,
    name: "India",
    flag: "india.png"
  },
  {
    id: "trending_idn",
    code: "id",
    country: IDN,
    woeid: 23424846,
    name: "Indonesia",
    flag: "indonesia.png"
  },
  {
    id: "trending_irl",
    code: "ie",
    country: IRL,
    woeid: 23424803,
    name: "Ireland",
    flag: "ireland.png"
  },
  {
    id: "trending_isr",
    code: "il",
    country: ISR,
    woeid: 23424852,
    name: "Israel",
    flag: "israel.png"
  },
  {
    id: "trending_ita",
    code: "it",
    country: ITA,
    woeid: 23424853,
    name: "Italy",
    flag: "italy.png"
  },
  {
    id: "trending_jpn",
    code: "jp",
    country: JPN,
    woeid: 23424856,
    name: "Japan",
    flag: "japan.png"
  },
  {
    id: "trending_mys",
    code: "my",
    country: MYS,
    woeid: 23424901,
    name: "Malaysia",
    flag: "malaysia.png"
  },
  {
    id: "trending_mex",
    code: "mx",
    country: MEX,
    woeid: 23424900,
    name: "Mexico",
    flag: "mexico.png"
  },
  {
    id: "trending_NLD",
    code: "nl",
    country: NLD,
    woeid: 23424909,
    name: "Netherlands",
    flag: "netherlands.png"
  },
  {
    id: "trending_nzl",
    code: "nz",
    country: NZL,
    woeid: 23424916,
    name: "New Zealand",
    flag: "newzealand.png"
  },
  {
    id: "trending_nor",
    code: "no",
    country: NOR,
    woeid: 23424910,
    name: "Norway",
    flag: "norway.png"
  },
  {
    id: "trending_pol",
    code: "pl",
    country: POL,
    woeid: 23424923,
    name: "Poland",
    flag: "poland.png"
  },
  {
    id: "trending_prt",
    code: "pt",
    country: PRT,
    woeid: 23424925,
    name: "Portugal",
    flag: "portugal.png"
  },
  {
    id: "trending_rou",
    code: "ro",
    country: ROU,
    woeid: 23424933,
    name: "Romania",
    flag: "romania.png"
  },
  {
    id: "trending_sgp",
    code: "sg",
    country: SGP,
    woeid: 23424948,
    name: "Singapore",
    flag: "singapore.png"
  },
  {
    id: "trending_zaf",
    code: "za",
    country: ZAF,
    woeid: 23424942,
    name: "South Africa",
    flag: "southafrica.png"
  },
  {
    id: "trending_esp",
    code: "es",
    country: ESP,
    woeid: 23424950,
    name: "Spain",
    flag: "spain.png"
  },
  {
    id: "trending_swe",
    code: "se",
    country: SWE,
    woeid: 23424954,
    name: "Sweden",
    flag: "sweden.png"
  },
  {
    id: "trending_che",
    code: "ch",
    country: CHE,
    woeid: 23424957,
    name: "Switzerland",
    flag: "switzerland.png"
  },
  {
    id: "trending_tur",
    code: "tr",
    country: TUR,
    woeid: 23424969,
    name: "Turkey",
    flag: "turkey.png"
  },
  {
    id: "trending_gbr",
    code: "uk",
    country: GBR,
    woeid: 23424975,
    name: "United Kingdom",
    flag: "uk.png"
  },
  {
    id: "trending_usa",
    code: "us",
    country: USA,
    woeid: 23424977,
    name: "United States",
    flag: "usa.png"
  },
  {
    id: "trending_egy",
    code: "eg",
    country: EGY,
    woeid: 23424802,
    name: "Egypt",
    flag: "egypt.png"
  },
  {
    id: "trending_eth",
    code: "et",
    country: ETH,
    woeid: 23424808,
    name: "Ethiopia",
    flag: "ethiopia.png"
  },
  {
    id: "trending_nga",
    code: "ng",
    country: NGA,
    woeid: 23424908,
    name: "Nigeria",
    flag: "nigeria.png"
  },
  {
    id: "trending_pak",
    code: "pk",
    country: PAK,
    woeid: 23424922,
    name: "Pakistan",
    flag: "pakistan.png"
  },
  {
    id: "trending_phl",
    code: "ph",
    country: PHL,
    woeid: 23424934,
    name: "Philippines",
    flag: "philippines.png"
  }
];


export const TRENDING_TAGS = [
  {
    branch: ARTICLE_BRANCH_YOUTUBE,
    name: "Main",
    tag: "now",
    source_id: "youtube-trending-feed-youtube-trending-now"
  },
  {
    branch: ARTICLE_BRANCH_YOUTUBE,
    name: "Gaming",
    tag: "gaming",
    source_id: "youtube-trending-feed-youtube-trending-gaming"
  },
  {
    branch: ARTICLE_BRANCH_YOUTUBE,
    name: "Music",
    tag: "music",
    source_id: "youtube-trending-feed-youtube-trending-music"
  },
  {
    branch: ARTICLE_BRANCH_YOUTUBE,
    name: "Films",
    tag: "films",
    source_id: "youtube-trending-feed-youtube-trending-films"
  },
  {
    branch: ARTICLE_BRANCH_HACKERNEWS,
    name: "Frontpage",
    tag: "frontpage",
    source_id: "hackernews-trending-feed-frontpage"
  },
  {
    branch: ARTICLE_BRANCH_HACKERNEWS,
    name: "Best Posts",
    tag: "best",
    source_id: "hackernews-trending-feed-best"
  },
  {
    branch: ARTICLE_BRANCH_HACKERNEWS,
    name: "Best Comments",
    tag: "bestcomments",
    source_id: "hackernews-trending-feed-bestcomments"
  },
  {
    branch: ARTICLE_BRANCH_HACKERNEWS,
    name: "Polls",
    tag: "polls",
    source_id: "hackernews-trending-feed-polls"
  },
  {
    branch: ARTICLE_BRANCH_HACKERNEWS,
    name: "Ask",
    tag: "ask",
    source_id: "hackernews-trending-feed-ask"
  },
  {
    branch: ARTICLE_BRANCH_HACKERNEWS,
    name: "Show",
    tag: "show",
    source_id: "hackernews-trending-feed-show"
  },
  {
    branch: ARTICLE_BRANCH_INSTAGRAM,
    name: "Instagood",
    tag: "instagood",
    source_id: "instagram-trending-feed-instagood"
  },
  {
    branch: ARTICLE_BRANCH_INSTAGRAM,
    name: "Love",
    tag: "love",
    source_id: "instagram-trending-feed-love"
  },
  {
    branch: ARTICLE_BRANCH_INSTAGRAM,
    name: "Fashion",
    tag: "fashion",
    source_id: "instagram-trending-feed-fashion"
  },
  {
    branch: ARTICLE_BRANCH_INSTAGRAM,
    name: "PhotoOftheDay",
    tag: "photooftheday",
    source_id: "instagram-trending-feed-photooftheday"
  },
  {
    branch: ARTICLE_BRANCH_INSTAGRAM,
    name: "Beautiful",
    tag: "beautiful",
    source_id: "instagram-trending-feed-beautiful"
  },
  {
    branch: ARTICLE_BRANCH_INSTAGRAM,
    name: "Art",
    tag: "art",
    source_id: "instagram-trending-feed-art"
  },
  {
    branch: ARTICLE_BRANCH_INSTAGRAM,
    name: "Photography",
    tag: "photography",
    source_id: "instagram-trending-feed-photography"
  },
  {
    branch: ARTICLE_BRANCH_INSTAGRAM,
    name: "Happy",
    tag: "happy",
    source_id: "instagram-trending-feed-happy"
  }
];