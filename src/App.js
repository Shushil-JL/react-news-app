import React from 'react'
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NotFound from './components/NotFound/NotFound';

const App = () => {
  const pageSize = 8
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<News key='general' category="general" country="in" pageSize={pageSize} />} />
          <Route exact path="/business" element={<News key='business' category="business" country="in" pageSize={pageSize} />} />
          <Route exact path="/entertainment" element={<News key='entertainment' category="entertainment" country="in" pageSize={pageSize} />} />
          <Route exact path="/health" element={<News key='health' category="health" country="in" pageSize={pageSize} />} />
          <Route exact path="/science" element={<News key='science' category="science" country="in" pageSize={pageSize} />} />
          <Route exact path="/sports" element={<News key='sports' category="sports" country="in" pageSize={pageSize} />} />
          <Route exact path="/technology" element={<News key='technology' category="technology" country="in" pageSize={pageSize} />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}
export default App
