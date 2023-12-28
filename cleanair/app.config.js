import * as dotenv from "dotenv";
dotenv.config();

module.exports = function () {
  return {"expo": {
    "name": "cleanairmap",
    "slug": "cleanairmap",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "cleanairmap",
    "userInterfaceStyle": "automatic",
    "runtimeVersion": "1.0.0",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "googleServicesFile": process.env.GOOGLE_SERVICE_INFO || "./GoogleService-Info.plist",
      "supportsTablet": true,
      "bundleIdentifier": "org.ravenapp.cleanairmap",
      "runtimeVersion": {
        "policy": "appVersion"
      }
    },
    "android": {
      "googleServicesFile": process.env.GOOGLE_SERVICES_JSON || "./google-services.json",
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "org.ravenapp.cleanairmap",
      "runtimeVersion": "1.0.0"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      ["expo-build-properties",
      {
        "ios": {
          "useFrameworks": "static"
        }
      }],
      "@maplibre/maplibre-react-native",
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "ad02678c-2f10-4881-99a3-3bb7fbccf7c2",
      },
      "firebase": {
        "apiKey": process.env.FIREBASE_API_KEY,
        "authDomain": process.env.FIREBASE_AUTH_DOMAIN,
        "projectId": process.env.FIREBASE_PROJECT_ID,
        "storageBucket": process.env.FIREBASE_STORAGE_BUCKET,
        "messagingSenderId": process.env.FIREBASE_MESSAGING_SENDER_ID,
        "appId": process.env.FIREBASE_APP_ID,
        "measurementId": process.env.FIREBASE_MEASUREMENT_ID,
      }
    },
    "owner": "cleanairmap"
  }}
}
