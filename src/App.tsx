import { Routes, Route } from 'react-router'
import HomePage from './pages/Home';
import RedirectorPage from './pages/Redirector';
import RemovedPage from './pages/Removed';
import FolderPage from './pages/Folder';
import VidShortPage from './pages/VidShort';

function App() {
  // setup router
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="v/:videoId" element={<RedirectorPage />} />
      <Route path="f/:folderSlug" element={<FolderPage />} />
      <Route path="removed" element={<RemovedPage />} />
      <Route path="vidshort" element={<VidShortPage />} />
      <Route path="vidshort/:videoId" element={<VidShortPage />} />
    </Routes>
  );
}

export default App
