import { Routes, Route } from 'react-router-dom'; 

import Home from './routes/Home';
import CreateBook from './routes/CreateBook';
import EditBook from './routes/EditBook';
import DeleteBook from './routes/DeleteBook';
import ShowBook from './routes/ShowBook';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
    </Routes>
  )
}
export default App