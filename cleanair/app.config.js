module.exports = function () {
  return {"expo": {
    "name": "cleanair",
    "slug": "cleanair",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "cleanair",
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
      "supportsTablet": true,
      "bundleIdentifier": "com.ravenapp.cleanairmap",
      "runtimeVersion": {
        "policy": "appVersion"
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.ravenapp.cleanairmap",
      "runtimeVersion": "1.0.0"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      "@maplibre/maplibre-react-native",
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "PROJECT_ID"
      }
    },
    "owner": "",
    "updates": {
      "url": "https://u.expo.dev/PROJECT_ID",
      "requestHeaders": {
        "expo-channel-name": "main"
      }
    }
  }
  }
}
