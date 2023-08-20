import { ApolloProvider } from '@apollo/client';
import { client } from 'storage/config';
import { CssBaseline, Sheet} from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import theme from 'style/theme'

const root = ReactDOM.createRoot(document.getElementById('root'));

// TODO: structure this and app.js so essential stuff is in app and
// stuff that can be swapped out is in here.
root.render(
    <ApolloProvider client={client}>
      <React.StrictMode>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
            <Sheet>
              <App />
            </Sheet>
        </CssVarsProvider>
      </React.StrictMode>
    </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
