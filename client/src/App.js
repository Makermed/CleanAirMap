import 'App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MapView from 'views/mapView';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter >
        <Routes>
            <Route path="/" element={<MapView />} />
        </Routes>
    </BrowserRouter>
);
}
export default App;
