import { useEffect, useState } from "react";
import { 
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"
import Home from "./routes/Home"
import Detail from "./routes/Detail"

function ToDos() {
    const [toDo, setToDo] = useState("");
    const [toDos, setToDos] = useState([]);
    const onChange = (event) => setToDo(event.target.value)
    const onSubmit = (event) => {
        event.preventDefault();
        if (toDo === "") {
            return;
        }
        setToDos((currentArray) => [toDo, ...currentArray])
        setToDo("");
    };
    return ( 
        <div>
            <h1> My To Dos - ({ toDos.length }) </h1>  
            <form onSubmit={ onSubmit }>
            <input 
                type = "text"
                placeholder = "Write your to do...."
                value = { toDo }
                onChange = { onChange }
            /> 
            <button>Add To Do</button> 
            </form> 
            <hr /> 
            { toDos.map((item, index) => (
                <li key={index}>{ item }</li>
            )) }  
        </div>
    );
}

function Coins() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    useEffect(() => {
        const url = 'https://api.coinpaprika.com/v1/tickers';
        fetch(url)
            .then(response => response.json())
            .then((json) => {
                setCoins(json)
                setLoading(false)
            });
    }, []);
    return (
        <div>
            <h1>The Coins! { loading ? '' : `- (${coins.length})` }</h1>
            { loading 
                ? (
                    <strong>Loading...</strong>
                ) 
                : (
                    <select>
                        { coins.map((coin) => (
                            <option key={coin.id}>
                                {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}
                            </option>
                        )) }
                    </select>
                )
            }
        </div>
    );
}

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/hello">
                    <h1>hello</h1>
                </Route>
                <Route path="/movie/:id">
                    <Detail />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
