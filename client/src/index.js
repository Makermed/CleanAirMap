import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import {client} from 'storage/config';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'style/theme';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
// TODO: structure this and app.js so essential stuff is in app and
// stuff that can be swapped out is in here.
root.render(
    <ApolloProvider client={client}>
      <CssBaseline enableColorScheme />
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
