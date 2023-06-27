import './App.css';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import User from './Components/User';

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/AboutUs" component={AboutUs} />
                    <Route path="/ContactUs" component={ContactUs} />
                    <Route path="/User/:username" component={User} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
