import './App.css';
import Landing from './Pages/Landing';
import Record from './Pages/Record/Record';
import Feedback from './Pages/Feedback';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/record' element={<Record />} />
                <Route path='/feedback' element={<Feedback />} />
            </Routes>
        </Router>
    );
}

export default App;
