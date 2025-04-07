import { Routes, Route } from 'react-router-dom';
{/*import { Link } from 'react-router-dom';*/}
import Admin from '../Routes/Admin/Admin.jsx';
import "./App.css";


function App() {
	return (
	<>
	{/*<h1>Development Routes:</h1>
  <Link to='/admin' >Admin</Link>*/}


	<Routes>
	  <Route path='/admin' element={<Admin />} />
	</Routes>
	</>
)};

export default App;
