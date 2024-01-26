
# Setup
Set up (https://docs.expo.dev/guides/local-app-development/)[Expo environment]

Run `npm install` and `bundle install`

## Geoapify
This project uses (Geoapify)[https://www.geoapify.com/] for Tiles, Geocoding and Autocompletion.

Get an API key and set it to EXPO_PUBLIC_GEOAPIFY_TOKEN in .env

## Firebase

Firebase is set to 10.6.0 because of https://github.com/firebase/firebase-js-sdk/issues/7849.

Firebase is used to provide user authentication.
Follow the [Expo instructions](https://docs.expo.dev/guides/using-firebase/#using-react-native-firebase) to configure firebase for this project.

Add `google-services.json` and
`GoogleService-Info.plist` to the project's root directory
and set the corresponding client ID to
EXPO_PUBLIC_FIREBASE_OAUTH_CLIENT_ID in the env.file.

# Development Flow
This is mostly a summary of the [Expo Workflow](https://docs.expo.dev/workflow/overview/) for local development. Go there for more details about setting up your environment.

1. Build the app locally with `npx expo run:[android|ios]` 
2. Launch the app with `npx expo start`
